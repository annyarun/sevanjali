'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import {
  Heart, Copy, CheckCircle, Building2,
  Stethoscope, GraduationCap, Droplets, HandHeart,
  ArrowRight, MessageCircle, Phone, Smartphone,
} from 'lucide-react'
import { useState } from 'react'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-saffron-500"
      title="Copy"
    >
      {copied ? <CheckCircle size={15} className="text-green-500" /> : <Copy size={15} />}
    </button>
  )
}

const bankDetails = [
  { label: 'Account Name',   value: 'Sevanjali Prathishtana, Farangipete' },
  { label: 'Account Number', value: '70710100005545' },
  { label: 'Bank Name',      value: 'Bank of Baroda' },
  { label: 'Branch',         value: 'Arkula Branch, Farangipete' },
  { label: 'IFS Code',       value: 'BARB0VARJKU' },
]

const impactItems = [
  { icon: Stethoscope, title: 'Free Medical Camps',         desc: 'Funds specialist doctors, medicines & equipment for camps held twice every month.', color: 'text-red-500',    bg: 'bg-red-50' },
  { icon: GraduationCap, title: 'Education Scholarships',  desc: 'Supports students from underprivileged families to pursue engineering & higher studies.', color: 'text-blue-500',  bg: 'bg-blue-50' },
  { icon: Droplets,     title: 'Blood Donation Drives',    desc: 'Organises regular camps to replenish blood banks across Dakshina Kannada.', color: 'text-rose-500',  bg: 'bg-rose-50' },
  { icon: HandHeart,    title: 'Patient Assistance',       desc: 'Covers treatment costs and medicines for hospitalised patients who cannot afford care.', color: 'text-green-500', bg: 'bg-green-50' },
]

export default function DonatePage() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-saffron-600 via-saffron-500 to-orange-500 py-24 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-6">
            <Heart size={30} className="text-white fill-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
            Donate & Make a Difference
          </h1>
          <p className="text-saffron-100 text-lg leading-relaxed">
            Your contribution directly funds free medical camps, educational
            scholarships, and community welfare programmes that have touched
            thousands of lives since 1993.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Bank Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white rounded-3xl shadow-card overflow-hidden">
              {/* Card header */}
              <div className="bg-gradient-to-r from-saffron-500 to-orange-500 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 size={24} />
                  <h2 className="text-xl font-bold">Bank Transfer Details</h2>
                </div>
                <p className="text-saffron-100 text-sm">
                  Transfer directly to our registered bank account
                </p>
              </div>

              {/* Bank detail rows */}
              <div className="p-6 space-y-3">
                {bankDetails.map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between bg-gray-50 rounded-xl px-4 py-3 gap-3">
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{label}</p>
                      <p className="text-gray-900 font-semibold text-sm">{value}</p>
                    </div>
                    <CopyButton text={value} />
                  </div>
                ))}
              </div>

              {/* 80G Tax Exemption + Note */}
              <div className="px-6 pb-6 space-y-3">
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <strong>Tax Exemption under Section 80G</strong> — Donations to Sevanjali Prathishtana are eligible for tax deduction under Section 80G of the Income Tax Act. We will provide an official receipt with our 80G registration details upon request.
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
                  <strong>Note:</strong> Please WhatsApp or email us after transferring so we can
                  acknowledge your donation and send a receipt.
                </div>
              </div>
            </div>

            {/* UPI / QR Card */}
            <div className="mt-5 bg-white rounded-3xl shadow-card overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-1">
                  <Smartphone size={22} />
                  <h2 className="text-xl font-bold">Pay via UPI / QR Code</h2>
                </div>
                <p className="text-indigo-100 text-sm">Scan with any UPI app — PhonePe, PayTM, GPay, BHIM & more</p>
              </div>

              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  {/* QR Code image */}
                  <div className="shrink-0 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-md bg-white p-3">
                    <Image
                      src="/images/donate/qr-code.png"
                      alt="Sevanjali Prathishtana UPI QR Code – BHIM Baroda Pay"
                      width={180}
                      height={180}
                      className="object-contain"
                    />
                    <p className="text-center text-xs text-gray-400 mt-2 font-medium">Scan to Pay</p>
                  </div>

                  {/* UPI details */}
                  <div className="flex-1 w-full space-y-3">
                    {/* Merchant name */}
                    <div className="bg-gray-50 rounded-xl px-4 py-3">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Merchant Name</p>
                      <p className="text-gray-900 font-semibold text-sm">Sevanjali Prathistana Trust</p>
                    </div>

                    {/* UPI ID with copy */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide mb-0.5">UPI ID (VPA)</p>
                        <p className="text-indigo-900 font-bold text-sm font-mono">sevan94485545@barodampay</p>
                      </div>
                      <CopyButton text="sevan94485545@barodampay" />
                    </div>

                    {/* Supported apps */}
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Accepted on</p>
                      <div className="flex flex-wrap gap-2">
                        {['PhonePe', 'PayTM', 'GPay', 'BHIM', 'BharatPay', 'Baroda Pay'].map(app => (
                          <span key={app} className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* How to pay */}
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Open any UPI app → Scan QR <strong>or</strong> send to UPI ID → Enter amount → Pay
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Your impact */}
            <div className="bg-white rounded-3xl shadow-card p-7">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                Your Donation Goes Towards…
              </h2>
              <div className="space-y-4">
                {impactItems.map(({ icon: Icon, title, desc, color, bg }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className={color} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: '344+', lbl: 'Medical Camps', color: 'text-saffron-500' },
                { val: '10K+', lbl: 'People Helped', color: 'text-forest-500' },
                { val: '30+',  lbl: 'Years of Trust', color: 'text-blue-500' },
              ].map(({ val, lbl, color }) => (
                <div key={lbl} className="bg-white rounded-2xl shadow-card p-4 text-center">
                  <div className={`text-2xl font-bold font-serif ${color}`}>{val}</div>
                  <div className="text-xs text-gray-500 mt-1">{lbl}</div>
                </div>
              ))}
            </div>

            {/* Contact after donation */}
            <div className="bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl p-7 text-white">
              <h3 className="font-bold text-lg mb-3">After Donating</h3>
              <p className="text-forest-100 text-sm leading-relaxed mb-5">
                Please reach out after your transfer — we'll send you an acknowledgement
                and keep you updated on how your contribution is being used.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/919448502319?text=Hi%2C%20I%20have%20donated%20to%20Sevanjali%20Prathishtana."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors"
                >
                  <MessageCircle size={18} className="shrink-0" />
                  <span className="text-sm font-medium">Message us on WhatsApp</span>
                </a>
                <a
                  href="mailto:sevanjali.farangipete@gmail.com?subject=Donation%20Confirmation"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors"
                >
                  <Phone size={18} className="shrink-0" />
                  <span className="text-sm font-medium">sevanjali.farangipete@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Other ways to help */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-bold text-gray-900 mb-4">Other Ways to Help</h3>
              <div className="space-y-3">
                {[
                  { label: 'Volunteer at our medical camps', href: '/contact' },
                  { label: 'Donate medicines or medical equipment', href: '/contact' },
                  { label: 'Sponsor a student\'s education', href: '/activities' },
                  { label: 'Participate in blood donation drives', href: '/activities' },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-saffron-50 group transition-colors"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-saffron-600">{label}</span>
                    <ArrowRight size={14} className="text-gray-400 group-hover:text-saffron-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
