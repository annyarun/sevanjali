'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { CalendarDays, MapPin, Users, Star } from 'lucide-react'

const eventImages = [
  { src: '/images/events/ganesh-idol.jpg',       alt: 'Ganapathi idol at Ganeshotsava',         span: 'col-span-2 row-span-2' },
  { src: '/images/events/ganesh-bhajan.jpg',     alt: 'Bhajan group at Ganeshotsava stage' },
  { src: '/images/events/ganesh-gathering.jpg',  alt: 'Large community gathering 2021' },
  { src: '/images/events/ganesh-puja.jpg',       alt: 'Priest performing Ganesh puja' },
  { src: '/images/events/community-prayer.jpg',  alt: 'Community prayer circle' },
  { src: '/images/events/ganesh-prep1.jpg',      alt: 'Community preparing decorations' },
  { src: '/images/events/ganesh-prep2.jpg',      alt: 'Volunteers preparing for Ganeshotsava' },
  { src: '/images/events/ganesh-aerial-night.jpg', alt: 'Sevanjali hall during Ganeshotsava (aerial night view)', span: 'col-span-2' },
]

const historicImages = [
  { src: '/images/events/ganesh-vintage1.jpg', alt: 'Early Ganeshotsava procession (archival)' },
  { src: '/images/events/ganesh-vintage2.jpg', alt: 'Karadi Kunitha folk performance (archival)' },
  { src: '/images/events/sevanjali-building.jpg', alt: 'Sevanjali Prathishtana premises (aerial view)' },
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
            Our beloved annual festival uniting communities across caste and religion in joy and celebration
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="bg-white rounded-3xl shadow-card p-8 mb-6 border border-orange-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">🐘</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-serif">Ganeshotsava Festival</h3>
                  <p className="text-saffron-500 font-medium">Annual Celebration — Since 1993</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ganeshotsava is a yearly festival organised by Sevanjali Prathishtana and celebrated with immense joy and devotion by the people of Farangipete and surrounding villages. For over three decades, this celebration has united communities across caste and religion.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                The festival features bhajan programmes, religious ceremonies, Karadi Kunitha and other folk performances, community feasts, and charitable activities — culminating in a grand procession with fireworks. Thousands gather every year to witness and participate.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: CalendarDays, label: 'Frequency', value: 'Every Year' },
                  { icon: MapPin,       label: 'Location',  value: 'Farangipete' },
                  { icon: Users,        label: 'Attendance', value: 'Thousands' },
                  { icon: Star,         label: 'Since',     value: '1993' },
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

            {/* Historic photos */}
            <div className="bg-gray-900 rounded-3xl p-6">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">Archival Moments</p>
              <div className="flex gap-3">
                {historicImages.map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    className="relative flex-1 h-36 rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/300x144/374151/9ca3af?text=Archival`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs leading-tight line-clamp-2">{img.alt}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-3 text-center italic">Historical photos from early Ganeshotsava celebrations</p>
            </div>
          </motion.div>

          {/* Photo grid */}
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
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group ${
                  img.span === 'col-span-2 row-span-2'
                    ? 'col-span-2 row-span-2 aspect-square'
                    : img.span === 'col-span-2'
                    ? 'col-span-2 aspect-video'
                    : 'aspect-square'
                }`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Other events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl p-8 text-white"
        >
          <h4 className="text-xl font-bold mb-5">Other Community Events Throughout the Year</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Blood Donation Drives',
              'Health Awareness Camps',
              'Educational Felicitation Ceremonies',
              'Food & Ration Distribution',
              'Flood Relief & Boat Donation',
              'Senior Citizen Support Events',
            ].map(event => (
              <div key={event} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-saffron-300 shrink-0" />
                {event}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
