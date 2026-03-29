"use client";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const galleryImages = [
  { src: "/images/gallery/aerial-ganesh-chariot-night.jpg", alt: "Ganeshotsava chariot procession — aerial night view" },
  { src: "/images/gallery/blood-donation-121-certificate.jpg", alt: "121st blood donation camp certificate presentation" },
  { src: "/images/gallery/ganesh-bhajan-ladies.jpg", alt: "Ladies bhajan group at Ganeshotsava" },
  { src: "/images/gallery/aerial-fireworks-night.jpg", alt: "Fireworks during Ganeshotsava celebrations" },
  { src: "/images/gallery/flood-relief-boat-donation.jpg", alt: "Flood relief — boat donation to rescue teams" },
  { src: "/images/gallery/ganesh-idol-puja-2020.jpg", alt: "Ganesh idol puja ceremony" },
  { src: "/images/gallery/aerial-building-day.jpg", alt: "Sevanjali Prathishtana building — aerial view" },
  { src: "/images/gallery/blood-donation-114-group.jpg", alt: "114th blood donation camp group photo" },
  { src: "/images/gallery/ganesh-rangoli-decoration.jpg", alt: "Rangoli decoration during festival" },
  { src: "/images/gallery/tb-patient-welfare-event.jpg", alt: "TB patient welfare support programme" },
  { src: "/images/gallery/ganesh-visarjan-outdoor.jpg", alt: "Ganesh visarjan procession" },
  { src: "/images/gallery/vintage-ganesh-procession.jpg", alt: "Historic Ganeshotsava procession" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="bg-earth py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <SectionLabel className="mb-4">Our Gallery</SectionLabel>
          <h2 data-cursor-grow className="font-display text-section italic text-cream mb-12">
            Moments of Impact
          </h2>
        </ScrollReveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {galleryImages.map((img, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="mb-4 break-inside-avoid overflow-hidden rounded-xl glass">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400 + (i % 3) * 100}
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
