import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getPublishedUpdates } from "@/lib/actions/activity-updates";
import { ActivityTimeline } from "@/components/sections/ActivityTimeline";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Activities",
  description:
    "Explore the healthcare, education, community and religious activities of Sevanjali Prathishtana — free medical camps, scholarships, blood donation drives in Farangipete since 1993.",
  alternates: {
    canonical: "/activities",
  },
  openGraph: {
    title: "Activities — Sevanjali Prathishtana",
    description:
      "Free medical camps, educational scholarships, blood donation drives, and community welfare programmes in Farangipete, Karnataka.",
  },
};

export default async function ActivitiesPage() {
  const updates = await getPublishedUpdates();

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-earth pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-saffron/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <SectionLabel className="mb-6">What We Do</SectionLabel>
            <h1 data-cursor-grow className="font-display text-hero font-light">
              <span className="italic">Our</span>{" "}
              <span className="font-bold">Activities</span>
            </h1>
            <p className="font-body text-lg text-ash max-w-[560px] font-light leading-relaxed mt-8">
              From free medical camps to educational scholarships, blood donation
              drives to community celebrations — follow our latest activities and
              events on the ground.
            </p>

            <div className="flex gap-3 flex-wrap mt-8">
              {["Healthcare", "Education", "Community", "Religious"].map((s) => (
                <span
                  key={s}
                  className="bg-saffron/10 text-saffron border border-saffron/20 px-4 py-1.5 rounded-full font-body text-sm backdrop-blur-md"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Category Panels + Activity Feed (In Detail) */}
      <ActivityTimeline updates={updates} />

      {/* CTA */}
      <section className="bg-saffron py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="font-accent text-label text-earth/50 uppercase">
              Be a part of the change
            </p>
            <h2
              data-cursor-grow
              className="font-display text-section font-bold text-earth mt-4 max-w-[700px] mx-auto leading-[1.05]"
            >
              Support our activities
            </h2>
            <p className="font-body text-base text-earth/70 mt-6 max-w-[480px] mx-auto font-light">
              Your donations directly fund these programmes. Every contribution
              helps us reach more people in need.
            </p>
            <div className="mt-10">
              <MagneticButton variant="dark" href="/donate">
                <span className="flex items-center gap-2">
                  Donate Now <ArrowRight size={16} />
                </span>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
