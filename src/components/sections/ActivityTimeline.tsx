"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ActivityUpdate, ActivityTag } from "@/lib/activity-update-constants";
import {
  Heart,
  Users,
  Flame,
  BookOpen,
  ArrowRight,
  Calendar,
} from "lucide-react";

/* ── Category config ─────────────────────────────────────────── */

const CATEGORIES: {
  tag: ActivityTag | "all";
  label: string;
  description: string;
  Icon: React.ElementType;
  dot: string;
  badgeBg: string;
  badgeText: string;
}[] = [
  {
    tag: "healthcare",
    label: "Healthcare",
    description:
      "Free medical camps, blood donation drives, and health awareness programmes serving the community.",
    Icon: Heart,
    dot: "bg-red-400",
    badgeBg: "bg-red-500/10",
    badgeText: "text-red-400",
  },
  {
    tag: "community",
    label: "Community",
    description:
      "Social welfare programmes, community development, and support for the underprivileged.",
    Icon: Users,
    dot: "bg-blue-400",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
  },
  {
    tag: "religious",
    label: "Religious",
    description:
      "Cultural and spiritual celebrations that foster harmony and bring the community together.",
    Icon: Flame,
    dot: "bg-amber-400",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400",
  },
  {
    tag: "education",
    label: "Education",
    description:
      "Scholarships, awareness drives, and educational support empowering deserving students.",
    Icon: BookOpen,
    dot: "bg-green-400",
    badgeBg: "bg-green-500/10",
    badgeText: "text-green-400",
  },
];

const TAG_BADGE: Record<ActivityTag, { bg: string; text: string; dot: string; Icon: React.ElementType }> = {
  healthcare: { bg: "bg-red-500/10",   text: "text-red-400",   dot: "bg-red-400",   Icon: Heart    },
  community:  { bg: "bg-blue-500/10",  text: "text-blue-400",  dot: "bg-blue-400",  Icon: Users    },
  religious:  { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400", Icon: Flame    },
  education:  { bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-400", Icon: BookOpen },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ── Component ──────────────────────────────────────────────── */

export function ActivityTimeline({ updates }: { updates: ActivityUpdate[] }) {
  const [activeTag, setActiveTag] = useState<ActivityTag | "all">("all");

  const filtered =
    activeTag === "all"
      ? updates
      : updates.filter((u) => u.tag === activeTag);

  const handlePanel = (tag: ActivityTag | "all") => {
    setActiveTag((prev) => (prev === tag ? "all" : tag));
    // Smooth scroll to the In Detail section
    setTimeout(() => {
      document.getElementById("activity-feed")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <>
      {/* ── Category Panels ─────────────────────────────────── */}
      <section className="bg-earth pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, index) => {
              const isActive = activeTag === cat.tag;
              return (
                <ScrollReveal key={cat.tag} delay={index * 80}>
                  <button
                    onClick={() => handlePanel(cat.tag)}
                    className={`w-full text-left block rounded-xl p-8 transition-all duration-300 group
                      ${isActive
                        ? "bg-saffron/10 border border-saffron/30"
                        : "glass hover:bg-saffron/10 border border-transparent"
                      }`}
                  >
                    <cat.Icon
                      className={`w-8 h-8 mb-4 transition-colors ${
                        isActive ? "text-saffron" : "text-saffron"
                      }`}
                    />
                    <h3 className="font-display text-xl font-bold text-cream">
                      {cat.label}
                    </h3>
                    <p className="font-body text-sm text-ash mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                    <span
                      className={`flex items-center gap-2 text-saffron mt-4 font-body text-sm font-medium transition-all ${
                        isActive ? "gap-4" : "group-hover:gap-4"
                      }`}
                    >
                      {isActive ? "Showing updates" : "View updates"}{" "}
                      <ArrowRight size={16} />
                    </span>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── In Detail / News Feed ────────────────────────────── */}
      <section id="activity-feed" className="bg-lightbg py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionLabel className="text-saffron mb-4">In Detail</SectionLabel>
            <h2
              data-cursor-grow
              className="font-display text-section font-bold italic text-earth leading-[1.05] mb-6"
            >
              {activeTag === "all"
                ? "Recent Activity Updates"
                : `${CATEGORIES.find((c) => c.tag === activeTag)?.label} Updates`}
            </h2>
            {activeTag !== "all" && (
              <button
                onClick={() => setActiveTag("all")}
                className="font-body text-sm text-earth/50 hover:text-earth transition-colors mb-12 flex items-center gap-1.5"
              >
                ← Back to all updates
              </button>
            )}
            {activeTag === "all" && <div className="mb-12" />}
          </ScrollReveal>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-earth/40">No updates yet for this category.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Vertical centre line — desktop only */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-saffron/20 via-earth/10 to-saffron/5 -translate-x-1/2" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTag}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-16 lg:space-y-24"
                >
                  {filtered.map((update, i) => {
                    const badge = TAG_BADGE[update.tag];
                    const isEven = i % 2 === 0;

                    return (
                      <div key={update.id} className="relative">
                        {/* Centre dot */}
                        <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-saffron bg-lightbg z-10 items-center justify-center">
                          <div className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        </div>

                        <div
                          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                            isEven ? "" : "lg:[direction:rtl]"
                          }`}
                        >
                          {/* Photo */}
                          <div className={`lg:[direction:ltr] ${!update.photo_url ? "hidden lg:block" : ""}`}>
                            {update.photo_url ? (
                              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                                <Image
                                  src={update.photo_url}
                                  alt={update.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                              </div>
                            ) : (
                              <div className="aspect-[4/3] rounded-xl bg-earth/5 border border-earth/10 flex items-center justify-center">
                                <p className="font-body text-earth/30 text-sm">No photo</p>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="lg:[direction:ltr]">
                            {/* Badge + Date */}
                            <div className="flex items-center gap-3 flex-wrap mb-4">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-body ${badge.bg} ${badge.text}`}
                              >
                                <badge.Icon size={11} />
                                {update.tag.charAt(0).toUpperCase() + update.tag.slice(1)}
                              </span>
                              <span className="inline-flex items-center gap-1.5 font-body text-xs text-earth/50">
                                <Calendar size={11} />
                                {formatDate(update.activity_date)}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-2xl sm:text-[32px] font-bold italic text-earth leading-tight mb-4">
                              {update.title}
                            </h3>

                            {/* Body */}
                            <div className="font-body text-sm text-earth/70 leading-relaxed space-y-3">
                              {update.body
                                .split("\n")
                                .filter(Boolean)
                                .map((para, j) => (
                                  <p key={j}>{para}</p>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
