'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission (connect to your backend/email service)
    await new Promise(res => setTimeout(res, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-block bg-saffron-500/20 text-saffron-400 text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Reach out to volunteer, donate, seek assistance, or just say hello. 
            We'd love to hear from you.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1 space-y-5"
          >
            {/* Address card */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-saffron-50 flex items-center justify-center mb-4">
                <MapPin size={22} className="text-saffron-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Our Address</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sevanjali Prathishtana<br />
                Farangipet Post, Bantwal Taluk - 574143<br />
                D.K., Karnataka, India
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                <Phone size={22} className="text-green-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <a href="tel:+919448502319" className="text-saffron-500 hover:text-saffron-600 font-semibold">
                +91 94485 02319
              </a>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <Mail size={22} className="text-blue-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <a href="mailto:sevanjali.farangipete@gmail.com" className="text-saffron-500 hover:text-saffron-600 text-sm font-semibold break-all">
                sevanjali.farangipete@gmail.com
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                <Clock size={22} className="text-amber-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Office Hours</h3>
              <p className="text-gray-600 text-sm">
                Monday – Saturday<br />
                9:00 AM – 6:00 PM IST
              </p>
            </div>

            {/* WhatsApp Chat */}
            <a
              href="https://wa.me/919448502319"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-sm">Chat on WhatsApp</div>
                <div className="text-xs opacity-80">Usually replies in minutes</div>
              </div>
            </a>

            <a
              href="https://chat.whatsapp.com/55N5NCCpZZ6BztKHaTqCg0?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:scale-110 transition-transform">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <div>
                <div className="text-sm">Join Our WhatsApp Channel</div>
                <div className="text-xs opacity-80">Get updates &amp; announcements</div>
              </div>
            </a>
          </motion.div>

          {/* Form + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500 transition-all text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500 transition-all text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500 transition-all text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500 transition-all text-gray-900 bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="volunteer">Volunteer Enquiry</option>
                        <option value="donation">Donation / Support</option>
                        <option value="medical">Medical Camp Enquiry</option>
                        <option value="scholarship">Scholarship Information</option>
                        <option value="general">General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you or how you'd like to help us..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500 transition-all text-gray-900 placeholder-gray-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary justify-center !py-4 !rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <MapPin size={18} className="text-saffron-500" />
                <h3 className="font-bold text-gray-900">Find Us</h3>
              </div>
              <div className="relative w-full h-72">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3894.5!2d75.0!3d12.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4c8c12b5e1a1b%3A0x1b2b3c4d5e6f7a8b!2sFarangipete%2C%20Karnataka%20574143!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sevanjali Prathishtana Location - Farangipete, Bantwal"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-gray-50 text-sm text-gray-500 flex items-center gap-2">
                <MapPin size={14} />
                Farangipet Post, Bantwal Taluk - 574143, D.K., Karnataka
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
