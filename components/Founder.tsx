'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { Quote, Award, Star } from 'lucide-react'

export default function Founder() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="founder" className="section-padding bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-saffron-500 font-semibold text-sm tracking-wider uppercase mb-3">
            <Star size={16} />
            Leadership
          </span>
          <h2 className="section-title">Our Founder</h2>
          <p className="section-subtitle mx-auto text-center">
            The visionary behind three decades of compassionate service
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-saffron-100 to-orange-50 rounded-3xl rotate-2" />
              <div className="absolute -inset-4 bg-gradient-to-tl from-forest-50 to-transparent rounded-3xl -rotate-1" />

              {/* Photo */}
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/images/founder.jpg"
                  alt="Sri Krishna Kumar Punja - Founder of Sevanjali Prathishtana"
                  fill
                  className="object-cover object-top"
                  onError={(e) => {
                    // fallback: show initials avatar
                    const parent = (e.target as HTMLImageElement).parentElement
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-saffron-500 to-saffron-600 flex flex-col items-center justify-center text-white">
                          <div class="text-6xl font-bold font-serif mb-2">KK</div>
                          <div class="text-sm opacity-80">Sri Krishna Kumar Punja</div>
                        </div>
                      `
                    }
                  }}
                />
              </div>

              {/* Floating credentials */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-saffron-50 flex items-center justify-center">
                  <Award size={20} className="text-saffron-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Management</div>
                  <div className="text-sm font-bold text-gray-900">Trustee</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Sri Krishna Kumar Punja
            </h3>
            <p className="text-saffron-500 font-semibold mb-6">
              KK Punja – Management Trustee, Sevanjali Prathishtana
            </p>

            {/* Quote block */}
            <div className="relative bg-gradient-to-br from-saffron-50 to-orange-50 rounded-2xl p-6 md:p-8 mb-8 border border-saffron-100">
              <Quote size={40} className="text-saffron-200 absolute top-4 left-4" />
              <p className="text-gray-700 text-lg leading-relaxed italic relative z-10 pl-4">
                Service to humanity is service to God. Every person we help, 
                every life we touch, is a step towards building the kind of 
                community we all want to live in.
              </p>
              <div className="mt-4 pl-4 text-sm font-semibold text-saffron-600">
                — Sri Krishna Kumar Punja
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-5">
              Sri Krishna Kumar Punja (KK Punja), Management Trustee of Sevanjali 
              Prathishtana, has been the driving force behind the organisation's 
              work for more than three decades. His dedication to social welfare 
              and service has earned the trust immense respect and goodwill from 
              the entire community.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Under his visionary leadership, Sevanjali has grown from a small 
              community initiative into a respected institution that touches 
              thousands of lives every year through healthcare, education, and 
              cultural programmes.
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '30+', label: 'Years Leading' },
                { value: '344+', label: 'Camps Organised' },
                { value: '10K+', label: 'Lives Impacted' },
                { value: '1993', label: 'Founded the Trust' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                  <div className="text-2xl font-bold text-saffron-500 font-serif">{item.value}</div>
                  <div className="text-xs text-gray-500 font-medium mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
