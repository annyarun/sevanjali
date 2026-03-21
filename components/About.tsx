'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2, Leaf } from 'lucide-react'

const highlights = [
  'Founded in 1993 by Sri Krishna Kumar Punja and a team of dedicated community members',
  'Serving Farangipete, Bantwal Taluk, Dakshina Kannada and surrounding villages',
  'Over three decades of uninterrupted community service',
  'Uniting communities across caste and religion through the annual Ganeshotsava festival',
  'Running free medical camps twice every month for underprivileged families',
  'Providing educational scholarships to deserving students every year',
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-white to-orange-50/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-saffron-500 font-semibold text-sm tracking-wider uppercase mb-3">
            <Leaf size={16} />
            Our Story
          </span>
          <h2 className="section-title">About Sevanjali Prathishtana</h2>
          <p className="section-subtitle mx-auto text-center">
            Three decades of selfless service, compassion, and community building
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/gallery/medical-3.jpg"
                alt="Sevanjali Prathishtana community work"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 max-w-[200px]">
              <div className="text-3xl font-bold text-saffron-500 font-serif">30+</div>
              <div className="text-sm text-gray-600 font-medium mt-1">Years of dedicated service to the community</div>
            </div>

            {/* Second floating badge */}
            <div className="absolute -top-5 -left-5 bg-forest-500 text-white rounded-2xl shadow-xl p-4">
              <div className="text-2xl font-bold">344+</div>
              <div className="text-xs font-medium mt-0.5">Medical Camps</div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <span className="font-semibold text-saffron-600">Sevanjali Prathishtana</span> is an NGO 
              founded by Sri Krishna Kumar Punja and others in 1993. "Sevanjali" — as the name itself 
              depicts — was established to help the needy people in various ways, spreading its roots 
              deep in the heart of Farangipete, Bantwal Taluk, Dakshina Kannada.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <span className="font-semibold text-forest-600">Ganeshotsava</span> is a yearly festival 
              organised by Sevanjali and celebrated with great joy by the people of Farangipete and 
              surrounding villages. For over three decades, this celebration has united communities 
              across caste and religion, bringing thousands together every year.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Apart from religious activities, Sevanjali Prathishtana also organises several social and 
              charitable initiatives that benefit thousands of people every year — from free medical camps 
              to educational scholarships and much more.
            </p>

            {/* Highlights */}
            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="text-forest-500 mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
