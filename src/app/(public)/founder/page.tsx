"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, Award, Heart, Users, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CtaSection } from "@/components/sections/CtaSection";

const milestones = [
  {
    year: "1993",
    title: "Founded Sevanjali Prathishtana",
    description:
      "Established the NGO with a small group of community-minded individuals in Farangipete, with a mission to serve the needy irrespective of caste, religion, or background.",
  },
  {
    year: "1993",
    title: "First Ganeshotsava Organised",
    description:
      "Launched the annual Ganeshotsava festival, bringing the community together for the first time. Today it draws thousands from different backgrounds every year.",
  },
  {
    year: "2000s",
    title: "Free Medical Camps Launched",
    description:
      "Introduced regular free medical camps in partnership with Rotary Club Bantwal and Justice KS Hegde Charitable Hospital — now held twice every month.",
  },
  {
    year: "2010s",
    title: "Educational Scholarships",
    description:
      "Began awarding merit-cum-need scholarships to deserving students from underprivileged backgrounds, helping hundreds pursue engineering and higher education.",
  },
  {
    year: "2020",
    title: "COVID-19 Community Relief",
    description:
      "Led the organisation's relief efforts during the pandemic, distributing essential supplies, medicines, and food to families in need across Farangipete.",
  },
  {
    year: "Today",
    title: "30+ Years of Leadership",
    description:
      "Continues to lead the trust with the same passion and dedication as day one — personally overseeing medical camps, scholarship distributions, and welfare initiatives.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Compassion",
    desc: "Every decision is driven by genuine care for the community.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    desc: "Service without distinction of caste, religion, or background.",
  },
  {
    icon: Star,
    title: "Integrity",
    desc: "Transparent, accountable, and honest in all that we do.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Committed to the highest quality of community service.",
  },
];

const traits = [
  "Founder and Management Trustee of Sevanjali Prathishtana since 1993",
  "Visionary leader who transformed community welfare in Farangipete",
  "Champion of inclusivity — serving all communities irrespective of caste or religion",
  "Personally oversees the organisation's free medical camp programme",
  "Instrumental in running 344+ free medical camps over the years",
  "Respected throughout Dakshina Kannada for his selfless service",
];

export default function FounderPage() {
  return (
    <main className="bg-earth min-h-screen">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative bg-moss pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-saffron/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cream/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <SectionLabel className="mb-5 justify-center">Leadership &amp; Vision</SectionLabel>
          <h1 className="font-display text-section italic text-cream mb-5">
            Our Founder
          </h1>
          <p className="font-body text-base text-cream/60 leading-relaxed max-w-xl mx-auto">
            The visionary who turned a dream of community service into three
            decades of meaningful impact
          </p>
        </motion.div>
      </section>

      {/* ── Profile + Bio ────────────────────────────────────── */}
      <section className="max-w-[1300px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Sticky sidebar — photo + stats + quote */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-2 lg:sticky lg:top-28 space-y-6"
          >
            {/* Photo card */}
            <div className="glass rounded-2xl p-6 text-center">
              <div className="relative w-52 h-64 mx-auto mb-5 rounded-xl overflow-hidden">
                <Image
                  src="/images/founder.png"
                  alt="Sri Krishna Kumar Punja – Founder, Sevanjali Prathishtana"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <h2 className="font-display text-2xl font-bold text-cream mb-1">
                Sri Krishna Kumar Punja
              </h2>
              <p className="font-body text-sm text-saffron font-medium mb-1">KK Punja</p>
              <p className="font-body text-sm text-ash mb-6">
                Management Trustee, Sevanjali Prathishtana
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "30+", lbl: "Years Leading" },
                  { val: "1993", lbl: "Founded" },
                  { val: "344+", lbl: "Camps" },
                  { val: "10K+", lbl: "Lives Helped" },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className="bg-earth/60 rounded-xl p-3">
                    <div className="font-display text-xl text-saffron">{val}</div>
                    <div className="font-body text-xs text-ash mt-0.5">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <div className="bg-moss rounded-2xl p-6 relative overflow-hidden">
              <Quote
                size={48}
                className="absolute top-3 right-3 text-cream/5"
              />
              <p className="font-display text-lg italic text-cream/80 leading-relaxed relative z-10 mb-4">
                &ldquo;Service to humanity is service to God. Every person we
                help, every life we touch, is a step towards building the kind
                of community we all want to live in.&rdquo;
              </p>
              <div className="font-body text-xs text-ash">
                — Sri Krishna Kumar Punja
              </div>
            </div>
          </motion.div>

          {/* Main content — bio + traits + timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-3 space-y-14"
          >
            {/* Biography */}
            <div>
              <ScrollReveal>
                <h3 className="font-display text-3xl italic text-cream mb-6">
                  Biography
                </h3>
                <div className="space-y-4 font-body text-base text-cream/70 leading-relaxed">
                  <p>
                    Sri Krishna Kumar Punja — affectionately known as{" "}
                    <strong className="text-saffron font-medium">KK Punja</strong>{" "}
                    — is the Management Trustee of Sevanjali Prathishtana and
                    the driving force behind the organisation's extraordinary
                    three-decade journey of community service in Farangipete,
                    Bantwal Taluk, Dakshina Kannada.
                  </p>
                  <p>
                    Born with a deep sense of social responsibility, KK Punja
                    founded Sevanjali Prathishtana in 1993 alongside a group of
                    like-minded community members who shared his vision: to
                    build an organisation that genuinely served the needy,
                    irrespective of their caste, religion, or background.
                  </p>
                  <p>
                    Under his leadership, Sevanjali has grown from a grassroots
                    community initiative into a respected and trusted
                    institution. His steadfast dedication and hands-on approach
                    to social welfare have earned him immense respect across the
                    entire Dakshina Kannada region.
                  </p>
                  <p>
                    One of his most enduring contributions is the annual{" "}
                    <strong className="text-turmeric font-medium">
                      Ganeshotsava
                    </strong>{" "}
                    festival, which he helped establish in 1993. Today, this
                    celebration draws thousands of people from different
                    communities and has become a symbol of unity, inclusivity,
                    and shared joy.
                  </p>
                  <p>
                    His vision for a healthier community led to the
                    establishment of free medical camps — held twice every month
                    — that have collectively served thousands of patients over
                    the decades. He has also championed education, blood
                    donation, patient assistance, and free health card
                    programmes for families who cannot afford healthcare.
                  </p>
                </div>
              </ScrollReveal>

              {/* Traits */}
              <ScrollReveal delay={0.1}>
                <div className="mt-8 space-y-3">
                  {traits.map((trait, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-saffron mt-0.5 shrink-0"
                      />
                      <span className="font-body text-sm text-cream/70">
                        {trait}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Timeline */}
            <div>
              <ScrollReveal>
                <h3 className="font-display text-3xl italic text-cream mb-8">
                  Journey &amp; Milestones
                </h3>
              </ScrollReveal>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-saffron/40 via-moss to-saffron/20" />

                <div className="space-y-6">
                  {milestones.map((m, i) => (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <div className="flex gap-6 pl-14 relative">
                        {/* Dot */}
                        <div className="absolute left-[18px] top-2 w-3 h-3 rounded-full border-2 border-saffron bg-earth" />

                        <div className="glass rounded-xl p-5 flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="font-accent text-xs font-semibold text-saffron bg-saffron/10 px-3 py-1 rounded-full">
                              {m.year}
                            </span>
                            <h4 className="font-display text-lg text-cream">
                              {m.title}
                            </h4>
                          </div>
                          <p className="font-body text-sm text-ash leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Values Section ───────────────────────────────────── */}
      <section className="bg-lightbg py-20 px-6">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <SectionLabel className="justify-center mb-4">Principles</SectionLabel>
              <h3 className="font-display text-section italic text-earth">
                The Values He Stands For
              </h3>
              <p className="font-body text-base text-earth/60 max-w-xl mx-auto mt-4">
                Principles that have guided the organisation for over three decades
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:-translate-y-1 transition-transform duration-300">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-saffron/10 mb-4">
                    <Icon size={26} className="text-saffron" />
                  </div>
                  <h4 className="font-display text-xl text-earth mb-2">{title}</h4>
                  <p className="font-body text-sm text-earth/60">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 px-6 text-center bg-earth">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h3 className="font-display text-section italic text-cream mb-4">
              Inspired by His Vision?
            </h3>
            <p className="font-body text-base text-ash mb-8">
              Join us in continuing KK Punja's legacy of compassion and service.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-saffron text-earth px-8 py-3 rounded-sm font-body font-medium text-sm hover:bg-terracotta transition-colors"
              >
                Get Involved <ArrowRight size={16} />
              </Link>
              <Link
                href="/activities"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream px-8 py-3 rounded-sm font-body font-medium text-sm hover:border-saffron hover:text-saffron transition-colors"
              >
                Our Activities
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
