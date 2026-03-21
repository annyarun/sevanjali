'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { CalendarDays, MapPin, Users, Star } from 'lucide-react'

const eventImages = [
  { src: '/images/events/ganesh-1.jpg', alt: 'Ganeshotsava celebrations', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/events/ganesh-2.jpg', alt: 'Community gathering' },
  { src: '/images/events/ganesh-3.jpg', alt: 'Festival activities' },
  { src: '/images/events/ganesh-4.jpg', alt: 'Cultural programmes' },
  { src: '/images/events/ganesh-5.jpg', alt: 'Community events' },
  { src: '/images/events/ganesh-6.jpg', alt: 'Celebrations' },
]

export default function Events() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="events" className="section-padding bg-gradient-to-b from-amber-50/40 to-white" ref={ref}>
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
            Annual Celebration
          </span>
          <h2 className="section-title">Ganeshotsava</h2>
          <p className="section-subtitle mx-auto text-center">
            Our beloved annual festival that unites communities across 
            caste and religion in joy and celebration
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Main event card */}
            <div className="bg-white rounded-3xl shadow-card p-8 mb-6 border border-orange-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">🐘</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-serif">
                    Ganeshotsava Festival
                  </h3>
                  <p className="text-saffron-500 font-medium">Annual Celebration — Since 1993</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Ganeshotsava is a yearly festival organised by Sevanjali Prathishtana 
                and celebrated with immense joy and devotion by the people of Farangipete 
                and surrounding villages. For over three decades, this celebration has 
                united communities across caste and religion, becoming one of the most 
                loved events in the region.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                The festival features cultural programmes, religious ceremonies, 
                community feasts, and charitable activities, making it a truly 
                inclusive celebration that embodies the spirit of unity and service.
              </p>

              {/* Event highlights */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: CalendarDays, label: 'Annually', value: 'Every Year' },
                  { icon: MapPin, label: 'Location', value: 'Farangipete' },
                  { icon: Users, label: 'Attendance', value: 'Thousands' },
                  { icon: Star, label: 'Since', value: '1993' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 bg-orange-50 rounded-xl p-3">
                    <Icon size={18} className="text-saffron-500 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">{label}</div>
                      <div className="text-sm font-bold text-gray-900">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other events */}
            <div className="bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">Other Community Events</h4>
              <ul className="space-y-3">
                {[
                  'Blood Donation Drives',
                  'Health Awareness Camps',
                  'Educational Felicitation Ceremonies',
                  'Patient Assistance Programmes',
                  'Senior Citizen Support Events',
                  'Youth Engagement Activities',
                ].map((event) => (
                  <li key={event} className="flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 rounded-full bg-saffron-300 shrink-0" />
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="grid grid-cols-3 gap-3"
          >
            {eventImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group ${
                  i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
