'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Stethoscope, Users, Sparkles } from 'lucide-react'

interface StatItem {
  value: number
  suffix: string
  label: string
  sublabel: string
  icon: React.ElementType
  color: string
  bgColor: string
}

const stats: StatItem[] = [
  {
    value: 30,
    suffix: '+',
    label: 'Years of Service',
    sublabel: 'Continuous community dedication since 1993',
    icon: Calendar,
    color: 'text-saffron-500',
    bgColor: 'bg-saffron-50',
  },
  {
    value: 344,
    suffix: '+',
    label: 'Free Medical Camps',
    sublabel: 'Held twice every month across the region',
    icon: Stethoscope,
    color: 'text-forest-500',
    bgColor: 'bg-forest-50',
  },
  {
    value: 10000,
    suffix: '+',
    label: 'Beneficiaries',
    sublabel: 'Lives touched through our initiatives',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Social Initiatives',
    sublabel: 'Programmes improving lives every year',
    icon: Sparkles,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
]

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (inView && !animatedRef.current) {
      animatedRef.current = true
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [inView, value])

  return (
    <span>
      {count >= 1000 ? `${(count / 1000).toFixed(0)}K` : count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron-500 via-saffron-600 to-orange-700" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-saffron-100 text-lg max-w-2xl mx-auto">
            Three decades of consistent action — measured in lives touched, 
            communities served, and hope restored.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 text-center hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-serif mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
                </div>
                <div className="text-white font-semibold text-sm md:text-base mb-1">
                  {stat.label}
                </div>
                <div className="text-saffron-100 text-xs md:text-sm leading-snug">
                  {stat.sublabel}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
