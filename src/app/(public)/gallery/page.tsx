"use client";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const galleryCategories = [
  {
    title: "Healthcare & Blood Donation",
    images: [
      { src: "/images/gallery/blood-donation-121-certificate.jpg", alt: "121st blood donation camp — certificate presentation" },
      { src: "/images/gallery/blood-donation-121-donor.jpg", alt: "121st blood donation camp — donor" },
      { src: "/images/gallery/blood-donation-114-group.jpg", alt: "114th blood donation camp group photo" },
      { src: "/images/gallery/blood-donation-110-speech.jpg", alt: "110th blood donation camp — inauguration speech" },
      { src: "/images/gallery/blood-donation-110-donor.jpg", alt: "110th blood donation camp — donor" },
      { src: "/images/gallery/blood-donation-vintage-camp.jpg", alt: "Early blood donation camp" },
      { src: "/images/gallery/heart-cancer-camp.jpg", alt: "Free heart & cancer screening camp" },
      { src: "/images/gallery/medical-1.jpg", alt: "Free medical camp consultation" },
      { src: "/images/gallery/medical-2.jpg", alt: "Medical camp in progress" },
      { src: "/images/gallery/medical-4.jpg", alt: "Healthcare outreach programme" },
      { src: "/images/gallery/medical-5.jpg", alt: "Free health camp" },
    ],
  },
  {
    title: "Ganeshotsava Celebrations",
    images: [
      { src: "/images/gallery/ganesh-bhajan-ladies.jpg", alt: "Ladies bhajan group at Ganeshotsava" },
      { src: "/images/gallery/ganesh-rangoli-decoration.jpg", alt: "Rangoli decoration during Ganeshotsava" },
      { src: "/images/gallery/ganesh-leaf-prep-2023.jpg", alt: "Ganeshotsava preparations — flower & leaf arrangements" },
      { src: "/images/gallery/ganesh-leaf-prep-2019.jpg", alt: "Ganeshotsava preparations — 2019" },
      { src: "/images/gallery/ganesh-idol-puja-2020.jpg", alt: "Ganesh idol puja ceremony" },
      { src: "/images/gallery/ganesh-puja-priest-2020.jpg", alt: "Priest performing puja" },
      { src: "/images/gallery/ganesh-visarjan-outdoor.jpg", alt: "Ganesh visarjan procession" },
      { src: "/images/gallery/ganesh-evening-aarti.jpg", alt: "Evening aarti ceremony" },
      { src: "/images/gallery/ganesh-celebrations-crowd.jpg", alt: "Ganeshotsava — large community gathering" },
      { src: "/images/gallery/ganesh-idol.jpg", alt: "Ganeshotsava idol" },
      { src: "/images/gallery/ganesh-puja.jpg", alt: "Puja ceremony" },
      { src: "/images/gallery/ganesh-bhajan.jpg", alt: "Bhajan programme" },
      { src: "/images/gallery/ganesh-gathering.jpg", alt: "Community gathering" },
      { src: "/images/gallery/ganesh-prep1.jpg", alt: "Festival preparation" },
      { src: "/images/gallery/ganesh-prep2.jpg", alt: "Festival preparation" },
    ],
  },
  {
    title: "Aerial Views",
    images: [
      { src: "/images/gallery/aerial-ganesh-chariot-night.jpg", alt: "Ganeshotsava chariot procession — aerial night view" },
      { src: "/images/gallery/aerial-crowd-night.jpg", alt: "Ganeshotsava celebrations — aerial crowd view" },
      { src: "/images/gallery/aerial-ganesh-float-lit.jpg", alt: "Illuminated Ganesh float — aerial view" },
      { src: "/images/gallery/aerial-ganesh-procession-lit.jpg", alt: "Ganesh procession with lights — aerial" },
      { src: "/images/gallery/aerial-fireworks-night.jpg", alt: "Fireworks over Farangipete during celebrations" },
      { src: "/images/gallery/aerial-building-day.jpg", alt: "Sevanjali Prathishtana building — aerial view" },
      { src: "/images/gallery/aerial1.jpg", alt: "Aerial view 1" },
      { src: "/images/gallery/aerial2.jpg", alt: "Aerial view 2" },
      { src: "/images/gallery/aerial3.jpg", alt: "Aerial view 3" },
      { src: "/images/gallery/aerial4.jpg", alt: "Aerial view 4" },
    ],
  },
  {
    title: "Community & Social Welfare",
    images: [
      { src: "/images/gallery/flood-relief-boat-donation.jpg", alt: "Flood relief — boat donation to rescue teams" },
      { src: "/images/gallery/flood-relief-lifejackets.jpg", alt: "Flood relief — life jacket distribution" },
      { src: "/images/gallery/tb-patient-welfare-event.jpg", alt: "TB patient welfare support distribution" },
      { src: "/images/gallery/tb-patient-welfare-meeting.jpg", alt: "TB patient welfare programme meeting" },
      { src: "/images/gallery/tb-food-distribution.jpg", alt: "Food & essentials distribution for TB patients" },
      { src: "/images/gallery/community-meeting-2020.jpg", alt: "Community awareness meeting" },
      { src: "/images/gallery/committee-meeting.jpg", alt: "Sevanjali committee meeting" },
      { src: "/images/gallery/sevanjali-team-group.jpg", alt: "Sevanjali Prathishtana volunteers team" },
      { src: "/images/gallery/health-awareness-event.jpg", alt: "Health awareness programme" },
      { src: "/images/gallery/community-2.jpg", alt: "Community event" },
      { src: "/images/gallery/charity-1.jpg", alt: "Charity programme" },
      { src: "/images/gallery/charity-2.jpg", alt: "Charity event" },
      { src: "/images/gallery/charity-3.jpg", alt: "Community welfare" },
    ],
  },
  {
    title: "Vintage & History",
    images: [
      { src: "/images/gallery/vintage-ganesh-procession.jpg", alt: "Historic Ganeshotsava procession" },
      { src: "/images/gallery/vintage-yakshagana-dance.jpg", alt: "Traditional Yakshagana performance" },
      { src: "/images/gallery/vintage-ganesh-gathering.jpg", alt: "Early Ganeshotsava gathering" },
      { src: "/images/gallery/vintage-religious-stage.jpg", alt: "Vintage religious stage programme" },
      { src: "/images/gallery/vintage-event-gateway.jpg", alt: "Vintage festival gateway" },
      { src: "/images/gallery/kannada-sahitya-sammelana.jpg", alt: "Kannada Sahitya Sammelana" },
      { src: "/images/gallery/vintage1.jpg", alt: "Vintage photograph 1" },
      { src: "/images/gallery/vintage2.jpg", alt: "Vintage photograph 2" },
    ],
  },
];

export default function GalleryPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-earth pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <SectionLabel className="mb-6">Photo Gallery</SectionLabel>
            <h1 data-cursor-grow className="font-display text-hero font-light">
              <span className="italic">Moments</span> of{" "}
              <span className="font-bold">Impact</span>
            </h1>
            <p className="font-body text-lg text-ash max-w-[560px] font-light leading-relaxed mt-8">
              A visual journey through three decades of community service,
              celebrations, and the lives we have touched together.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Categories */}
      {galleryCategories.map((category, catIndex) => (
        <section
          key={category.title}
          className={`py-24 lg:py-32 ${
            catIndex % 2 === 0 ? "bg-lightbg" : "bg-earth"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <SectionLabel
                className={catIndex % 2 === 0 ? "text-saffron mb-4" : "mb-4"}
              >
                {category.title}
              </SectionLabel>
              <h2
                data-cursor-grow
                className={`font-display text-section italic mb-12 ${
                  catIndex % 2 === 0 ? "text-earth" : "text-cream"
                }`}
              >
                {category.title}
              </h2>
            </ScrollReveal>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {category.images.map((img, i) => (
                <ScrollReveal key={`${category.title}-${i}`} delay={i * 60}>
                  <div
                    className={`mb-4 break-inside-avoid overflow-hidden rounded-xl ${
                      catIndex % 2 === 0 ? "glass-light" : "glass"
                    }`}
                  >
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
      ))}

      {/* CTA */}
      <section className="bg-saffron py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="font-accent text-label text-earth/50 uppercase">
              Be part of the story
            </p>
            <h2 data-cursor-grow className="font-display text-section font-bold text-earth mt-4 max-w-[700px] mx-auto leading-[1.05]">
              Help us create more moments of impact
            </h2>
            <p className="font-body text-base text-earth/70 mt-6 max-w-[480px] mx-auto font-light">
              Every photograph tells a story of hope, healing, and community.
              Your support helps us write more of these stories.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
