'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Heart, Users, Shield } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-banner.jpg"
          alt="Sevanjali Prathishtana Community Service"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-saffron-500/10 to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 bg-saffron-500/20 border border-saffron-500/40 backdrop-blur-sm text-saffron-300 text-sm font-medium px-4 py-2 rounded-full mb-6"
          >
            <Heart size={14} className="fill-saffron-400 text-saffron-400" />
            Est. 1993 — Farangipete, Karnataka
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
          >
            Serving Humanity{' '}
            <span className="text-saffron-400">with Compassion</span>
            <br />
            Since 1993
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl"
          >
            Sevanjali Prathishtana – A community-driven NGO serving Farangipete 
            and surrounding communities through healthcare, education, and social 
            welfare initiatives.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="flex flex-wrap gap-4"
          >
            <Link href="/#about" className="btn-primary text-base !px-8 !py-3.5">
              Learn More
            </Link>
            <Link href="/contact" className="btn-secondary text-base !px-8 !py-3.5">
              Contact Us
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/20"
          >
            {[
              { icon: Shield, text: '30+ Years Serving' },
              { icon: Users, text: '344+ Medical Camps' },
              { icon: Heart, text: 'Thousands Helped' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/80">
                <Icon size={18} className="text-saffron-400" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} className="text-saffron-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
