"use client";

import { useState, useTransition } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { registerBloodDonor, submitBloodRequest } from "@/lib/actions/blood-bank";
import { Droplets, Heart, Phone, MapPin, AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const bloodGroupColors: Record<string, string> = {
  "A+": "bg-red-50 text-red-600 border-red-200",
  "A-": "bg-red-50 text-red-700 border-red-200",
  "B+": "bg-orange-50 text-orange-600 border-orange-200",
  "B-": "bg-orange-50 text-orange-700 border-orange-200",
  "O+": "bg-green-50 text-green-600 border-green-200",
  "O-": "bg-green-50 text-green-700 border-green-200",
  "AB+": "bg-purple-50 text-purple-600 border-purple-200",
  "AB-": "bg-purple-50 text-purple-700 border-purple-200",
};

function FormField({
  label, name, type = "text", required = false, placeholder, children,
}: {
  label: string; name: string; type?: string; required?: boolean;
  placeholder?: string; children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-sm font-medium text-cream/80">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children ?? (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className="bg-earth/60 border border-cream/10 rounded-sm px-4 py-2.5 font-body text-sm text-cream placeholder:text-ash/50 focus:outline-none focus:border-saffron/50 transition-colors"
        />
      )}
    </div>
  );
}

function BloodGroupSelect({ name, required }: { name: string; required?: boolean }) {
  return (
    <div className="relative">
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full appearance-none bg-earth/60 border border-cream/10 rounded-sm px-4 py-2.5 font-body text-sm text-cream focus:outline-none focus:border-saffron/50 transition-colors pr-10"
      >
        <option value="" disabled>Select blood group</option>
        {BLOOD_GROUPS.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ash pointer-events-none" />
    </div>
  );
}

function DonateBloodForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    startTransition(async () => {
      const result = await registerBloodDonor(formData);
      if (result.success) {
        setStatus("success");
        setMessage("Thank you for registering! We'll contact you when there's a need.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full Name" name="name" required placeholder="Your full name" />
        <FormField label="Blood Group" name="blood_group" required>
          <BloodGroupSelect name="blood_group" required />
        </FormField>
        <FormField label="Phone Number" name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" />
        <FormField label="Email" name="email" type="email" placeholder="Optional" />
        <FormField label="Your Location / Area" name="location" required placeholder="e.g. Farangipete, Bantwal" />
        <FormField label="Last Donated" name="last_donated_at" type="date" />
      </div>

      {status !== "idle" && (
        <div className={`flex items-start gap-3 p-4 rounded-sm text-sm font-body ${
          status === "success"
            ? "bg-green-700/20 border border-green-700/30 text-green-400"
            : "bg-red-700/20 border border-red-700/30 text-red-400"
        }`}>
          {status === "success"
            ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-sm font-body font-medium text-sm transition-colors flex items-center justify-center gap-2"
      >
        <Heart size={16} />
        {isPending ? "Registering…" : "Register as Blood Donor"}
      </button>
    </form>
  );
}

function NeedBloodForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    startTransition(async () => {
      const result = await submitBloodRequest(formData);
      if (result.success) {
        setStatus("success");
        setMessage("Your request has been submitted. Our team will reach out to help as soon as possible.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Patient Name" name="patient_name" required placeholder="Patient's full name" />
        <FormField label="Blood Group Required" name="blood_group" required>
          <BloodGroupSelect name="blood_group" required />
        </FormField>
        <FormField label="Units Needed" name="units_needed" type="number" required placeholder="e.g. 2">
          <input
            type="number" name="units_needed" required min={1} max={10} defaultValue={1}
            className="bg-earth/60 border border-cream/10 rounded-sm px-4 py-2.5 font-body text-sm text-cream focus:outline-none focus:border-saffron/50 transition-colors"
          />
        </FormField>
        <FormField label="Urgency" name="urgency" required>
          <div className="relative">
            <select
              name="urgency" required defaultValue="normal"
              className="w-full appearance-none bg-earth/60 border border-cream/10 rounded-sm px-4 py-2.5 font-body text-sm text-cream focus:outline-none focus:border-saffron/50 transition-colors pr-10"
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ash pointer-events-none" />
          </div>
        </FormField>
        <FormField label="Hospital Name" name="hospital" required placeholder="e.g. KMC Hospital, Mangalore" />
        <FormField label="Hospital Location" name="location" required placeholder="e.g. Mangalore, D.K." />
        <FormField label="Your Name (Contact)" name="contact_name" required placeholder="Your full name" />
        <FormField label="Your Phone (Contact)" name="contact_phone" type="tel" required placeholder="+91 XXXXX XXXXX" />
      </div>

      <FormField label="Additional Message" name="message" placeholder="Any additional details…">
        <textarea
          name="message" rows={3} placeholder="Any additional details…"
          className="bg-earth/60 border border-cream/10 rounded-sm px-4 py-2.5 font-body text-sm text-cream placeholder:text-ash/50 focus:outline-none focus:border-saffron/50 transition-colors resize-none"
        />
      </FormField>

      {status !== "idle" && (
        <div className={`flex items-start gap-3 p-4 rounded-sm text-sm font-body ${
          status === "success"
            ? "bg-green-700/20 border border-green-700/30 text-green-400"
            : "bg-red-700/20 border border-red-700/30 text-red-400"
        }`}>
          {status === "success"
            ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-saffron hover:bg-terracotta disabled:opacity-60 text-earth py-3 rounded-sm font-body font-medium text-sm transition-colors flex items-center justify-center gap-2"
      >
        <Droplets size={16} />
        {isPending ? "Submitting…" : "Submit Blood Request"}
      </button>
    </form>
  );
}

export default function BloodBankPage() {
  const [activeTab, setActiveTab] = useState<"donate" | "need">("donate");

  return (
    <main className="bg-earth min-h-screen">

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative bg-moss pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-600/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-saffron/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <SectionLabel className="mb-5 justify-center">Community Blood Bank</SectionLabel>
          <h1 className="font-display text-section italic text-cream mb-5">
            Give Blood. <span className="text-red-400">Save Lives.</span>
          </h1>
          <p className="font-body text-base text-cream/60 leading-relaxed max-w-xl mx-auto">
            Register as a voluntary blood donor or submit a request for blood — Sevanjali
            Prathishtana will connect donors with those in need.
          </p>
        </div>

        {/* Quick stats */}
        <div className="relative max-w-2xl mx-auto mt-10 grid grid-cols-3 gap-4">
          {[
            { val: "110+", label: "Blood Donation Camps" },
            { val: "5,000+", label: "Units Collected" },
            { val: "All Groups", label: "Supported" },
          ].map(({ val, label }) => (
            <div key={label} className="glass rounded-xl p-4 text-center">
              <p className="font-display text-2xl text-saffron">{val}</p>
              <p className="font-body text-xs text-ash mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Blood Group Reference ────────────────────────────── */}
      <section className="bg-earth py-10 px-6 border-b border-cream/5">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-body text-xs text-ash uppercase tracking-widest mb-4 text-center">All blood groups supported</p>
          <div className="flex flex-wrap justify-center gap-3">
            {BLOOD_GROUPS.map((g) => (
              <span
                key={g}
                className={`inline-block px-4 py-1.5 rounded-full border font-body text-sm font-semibold ${bloodGroupColors[g]}`}
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tabs + Forms ─────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[780px] mx-auto">
          <ScrollReveal>
            {/* Tab switcher */}
            <div className="flex rounded-sm overflow-hidden border border-cream/10 mb-10">
              <button
                onClick={() => setActiveTab("donate")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-body text-sm font-medium transition-colors ${
                  activeTab === "donate"
                    ? "bg-red-600 text-white"
                    : "bg-earth text-ash hover:text-cream"
                }`}
              >
                <Heart size={16} />
                Donate Blood
              </button>
              <button
                onClick={() => setActiveTab("need")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-body text-sm font-medium transition-colors ${
                  activeTab === "need"
                    ? "bg-saffron text-earth"
                    : "bg-earth text-ash hover:text-cream"
                }`}
              >
                <Droplets size={16} />
                Need Blood
              </button>
            </div>

            {/* Donate Blood form */}
            {activeTab === "donate" && (
              <div className="glass rounded-xl p-6 sm:p-10">
                <div className="mb-8">
                  <h2 className="font-display text-3xl italic text-cream mb-2">
                    Register as a Donor
                  </h2>
                  <p className="font-body text-sm text-ash leading-relaxed">
                    Add yourself to our voluntary donor list. We'll only contact you when
                    there's a genuine need matching your blood group in your area.
                  </p>
                </div>
                <DonateBloodForm />
              </div>
            )}

            {/* Need Blood form */}
            {activeTab === "need" && (
              <div className="glass rounded-xl p-6 sm:p-10">
                <div className="mb-8">
                  <h2 className="font-display text-3xl italic text-cream mb-2">
                    Request Blood
                  </h2>
                  <p className="font-body text-sm text-ash leading-relaxed">
                    Submit a blood requirement and our team will try to connect you with
                    a matching donor from our network as quickly as possible.
                  </p>
                </div>
                <NeedBloodForm />
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ── Info strip ───────────────────────────────────────── */}
      <section className="bg-lightbg py-16 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              title: "Safe & Voluntary",
              desc: "All donations are 100% voluntary. Donating blood is safe, takes less than 30 minutes, and saves up to 3 lives.",
            },
            {
              icon: Phone,
              title: "We'll Reach Out",
              desc: "Once you register, our team will contact you only when a patient in your area urgently needs your blood group.",
            },
            {
              icon: MapPin,
              title: "Local Network",
              desc: "We match donors and recipients within Bantwal Taluk and Dakshina Kannada district wherever possible.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 mb-4">
                <Icon size={22} className="text-red-500" />
              </div>
              <h4 className="font-display text-lg text-earth mb-2">{title}</h4>
              <p className="font-body text-sm text-earth/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
