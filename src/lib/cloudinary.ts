export async function uploadToCloudinary(file: File): Promise<string> {
  // Client-side resize/compress before uploading to save storage and bandwidth
  const compressed = await compressImage(file, {
    maxWidthPx: 1200,   // max width in pixels
    quality: 0.78,      // JPEG quality 0–1  (≈78 %)
  });

  const formData = new FormData();
  formData.append("file", compressed);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}

/**
 * Resizes + compresses an image using the browser's Canvas API.
 * Falls back to the original file if the browser can't process it (e.g. GIF).
 */
async function compressImage(
  file: File,
  options: { maxWidthPx: number; quality: number }
): Promise<File> {
  return new Promise((resolve) => {
    // Only process common raster formats; leave others as-is
    const supportedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!supportedTypes.includes(file.type)) {
      resolve(file);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const { maxWidthPx, quality } = options;
      let { width, height } = img;

      // Scale down proportionally if wider than maxWidthPx
      if (width > maxWidthPx) {
        height = Math.round((height * maxWidthPx) / width);
        width = maxWidthPx;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Use JPEG output for best compression; PNG-only sources stay readable
      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          // Only use the compressed version if it's actually smaller
          if (blob.size < file.size) {
            resolve(new File([blob], file.name, { type: outputType }));
          } else {
            resolve(file);
          }
        },
        outputType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file); // fallback to original
    };

    img.src = url;
  });
}
