import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { OrganizationJsonLd } from "@/components/JsonLd";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="public-layout">
      <OrganizationJsonLd />
      <LoadingScreen />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
