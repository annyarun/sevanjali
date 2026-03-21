'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { Heart, HandHeart, ArrowRight } from 'lucide-react'

export default function CallToAction() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative bg-gradient-to-br from-saffron-500 to-orange-600 rounded-3xl p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-6">
              <Heart size={30} className="text-white fill-white" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
              Join Us in Serving Humanity
            </h2>
            <p className="text-saffron-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you want to volunteer, donate, or simply spread the word — 
              every act of kindness makes a difference. Together, we can reach 
              more lives and build a stronger community.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-saffron-600 hover:bg-saffron-50 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <HandHeart size={20} />
                Volunteer With Us
              </Link>
              <a
                href="https://wa.me/919448502319"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-saffron-600 font-bold px-8 py-4 rounded-full transition-all duration-300"
              >
                Make a Donation
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
