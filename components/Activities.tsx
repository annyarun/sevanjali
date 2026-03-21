'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Stethoscope,
  GraduationCap,
  Droplets,
  HeartHandshake,
  CreditCard,
  Eye,
  ArrowRight,
  Leaf,
} from 'lucide-react'

interface Activity {
  icon: React.ElementType
  emoji: string
  title: string
  description: string
  frequency?: string
  color: string
  bgColor: string
  borderColor: string
}

const activities: Activity[] = [
  {
    icon: Stethoscope,
    emoji: '🏥',
    title: 'Free Medical Camps',
    description:
      'Regular free medical camps conducted twice every month, providing quality healthcare to underprivileged families in Farangipete and surrounding areas.',
    frequency: 'Twice a month',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-100',
  },
  {
    icon: GraduationCap,
    emoji: '🎓',
    title: 'Educational Scholarships',
    description:
      'Merit-based and need-based scholarships provided to deserving students to support their education and help them achieve their dreams.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
  {
    icon: Droplets,
    emoji: '🩸',
    title: 'Blood Donation Camps',
    description:
      'Regularly organised blood donation drives that help replenish blood bank stocks and save countless lives across Dakshina Kannada.',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-100',
  },
  {
    icon: HeartHandshake,
    emoji: '🏥',
    title: 'Patient Assistance',
    description:
      'Providing financial assistance and emotional support to hospitalised patients and their families who cannot afford treatment costs.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-100',
  },
  {
    icon: CreditCard,
    emoji: '💳',
    title: 'Free Health Cards',
    description:
      'Distributing free health cards to underprivileged families, ensuring they have access to essential healthcare services without financial burden.',
    color: 'text-saffron-500',
    bgColor: 'bg-saffron-50',
    borderColor: 'border-orange-100',
  },
  {
    icon: Eye,
    emoji: '👁️',
    title: 'Eye, Dental & Surgical Care',
    description:
      'Free eye checkups, dental treatments, and assistance with surgical procedures for those who cannot afford specialist medical care.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
  },
]

export default function Activities() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="activities" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-forest-500 font-semibold text-sm tracking-wider uppercase mb-3">
            <Leaf size={16} />
            What We Do
          </span>
          <h2 className="section-title">Our Activities & Services</h2>
          <p className="section-subtitle mx-auto text-center">
            Comprehensive community programmes designed to uplift and empower
            every member of the society
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, i) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className={`group card border ${activity.borderColor} p-7 hover:-translate-y-2 cursor-default`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${activity.bgColor} mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl">{activity.emoji}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-saffron-600 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {activity.description}
                </p>

                {/* Frequency badge */}
                {activity.frequency && (
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${activity.bgColor} ${activity.color}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {activity.frequency}
                  </span>
                )}

                {/* Hover arrow */}
                <div className={`mt-4 flex items-center gap-1 text-sm font-semibold ${activity.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  Learn more <ArrowRight size={14} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-14"
        >
          <p className="text-gray-500 mb-5">
            Interested in participating or volunteering?
          </p>
          <a href="/contact" className="btn-primary">
            Get Involved
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
