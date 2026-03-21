'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  category: string
}

const images: GalleryImage[] = [
  // Medical Camps
  { src: '/images/activities/medical-camp-1.jpg', alt: 'Free medical camp – doctors serving patients', category: 'Medical Camps' },
  { src: '/images/activities/medical-camp-2.jpg', alt: 'Medical camp – health check-up', category: 'Medical Camps' },
  { src: '/images/activities/medical-camp-3.jpg', alt: 'Medical camp – community health services', category: 'Medical Camps' },
  { src: '/images/activities/medical-camp-4.jpg', alt: 'Free healthcare for all', category: 'Medical Camps' },
  { src: '/images/activities/medical-camp-5.jpg', alt: 'Medical camp volunteers', category: 'Medical Camps' },
  { src: '/images/activities/medical-camp-6.jpg', alt: 'Specialist doctors at camp', category: 'Medical Camps' },
  { src: '/images/gallery/medical-1.jpg', alt: 'Sevanjali medical outreach', category: 'Medical Camps' },
  { src: '/images/gallery/medical-2.jpg', alt: 'Health checkup at camp', category: 'Medical Camps' },
  { src: '/images/gallery/medical-3.jpg', alt: 'Community health camp', category: 'Medical Camps' },
  { src: '/images/gallery/medical-4.jpg', alt: 'Free healthcare services', category: 'Medical Camps' },
  { src: '/images/gallery/medical-5.jpg', alt: 'Medical camp volunteers at work', category: 'Medical Camps' },
  // Blood Donation
  { src: '/images/activities/blood-donation-camp.jpg', alt: 'Blood donation drive – donors giving', category: 'Blood Donation' },
  { src: '/images/activities/blood-donation2.jpg', alt: 'Blood donation camp volunteers', category: 'Blood Donation' },
  { src: '/images/activities/blood-donation3.jpg', alt: 'Community blood donation camp', category: 'Blood Donation' },
  { src: '/images/gallery/camp-1.jpg', alt: 'Blood donation camp', category: 'Blood Donation' },
  { src: '/images/gallery/camp-2.jpg', alt: 'Blood donation volunteers', category: 'Blood Donation' },
  // Ganeshotsava
  { src: '/images/events/ganesh-idol.jpg', alt: 'Ganeshotsava – beautifully decorated idol', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-puja.jpg', alt: 'Ganeshotsava – puja ceremony', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-gathering.jpg', alt: 'Ganeshotsava – community gathering', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-bhajan.jpg', alt: 'Ganeshotsava – devotional bhajans', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-prep1.jpg', alt: 'Ganeshotsava – festival preparations', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-prep2.jpg', alt: 'Ganeshotsava – decoration in progress', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-aerial-night.jpg', alt: 'Ganeshotsava – aerial night view of celebrations', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-vintage1.jpg', alt: 'Ganeshotsava – historic celebration (archival)', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-vintage2.jpg', alt: 'Ganeshotsava – early years (archival)', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-1.jpg', alt: 'Ganeshotsava festival', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-2.jpg', alt: 'Ganeshotsava celebrations', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-3.jpg', alt: 'Ganeshotsava cultural programme', category: 'Ganeshotsava' },
  // Community & Events
  { src: '/images/events/community-prayer.jpg', alt: 'Community prayer gathering', category: 'Community' },
  { src: '/images/events/sevanjali-building.jpg', alt: 'Sevanjali Prathishtana premises', category: 'Community' },
  { src: '/images/activities/community-meeting.jpg', alt: 'Community meeting at Sevanjali', category: 'Community' },
  { src: '/images/activities/volunteers-team.jpg', alt: 'Sevanjali volunteers team', category: 'Community' },
  { src: '/images/activities/inauguration.jpg', alt: 'Programme inauguration ceremony', category: 'Community' },
  { src: '/images/gallery/community-1.jpg', alt: 'Community gathering', category: 'Community' },
  { src: '/images/gallery/community-2.jpg', alt: 'Community event', category: 'Community' },
  { src: '/images/gallery/community3.jpg', alt: 'Community programme', category: 'Community' },
  // Relief & Charity
  { src: '/images/activities/flood-relief-boat.jpg', alt: 'Flood relief – rescue boat operations', category: 'Relief & Charity' },
  { src: '/images/activities/food-distribution.jpg', alt: 'Food distribution to the needy', category: 'Relief & Charity' },
  { src: '/images/activities/charity-event.jpg', alt: 'Charity event organised by Sevanjali', category: 'Relief & Charity' },
  { src: '/images/activities/community-service.jpg', alt: 'Community service work', category: 'Relief & Charity' },
  { src: '/images/gallery/charity-1.jpg', alt: 'Community charity event', category: 'Relief & Charity' },
  { src: '/images/gallery/charity-2.jpg', alt: 'Sevanjali charity work', category: 'Relief & Charity' },
  { src: '/images/gallery/charity-3.jpg', alt: 'Community service', category: 'Relief & Charity' },
  // Aerial & Landmark
  { src: '/images/gallery/aerial1.jpg', alt: 'Aerial view – Farangipete community', category: 'Aerial' },
  { src: '/images/gallery/aerial2.jpg', alt: 'Aerial view – event grounds', category: 'Aerial' },
  { src: '/images/gallery/aerial3.jpg', alt: 'Aerial view – festival celebrations', category: 'Aerial' },
  { src: '/images/gallery/aerial4.jpg', alt: 'Aerial view – community gathering', category: 'Aerial' },
  // Vintage & Archive
  { src: '/images/gallery/vintage1.jpg', alt: 'Archival photo – early days of Sevanjali', category: 'Archive' },
  { src: '/images/gallery/vintage2.jpg', alt: 'Archival photo – founding years', category: 'Archive' },
  { src: '/images/gallery/event1.jpg', alt: 'Past event – Sevanjali programme', category: 'Archive' },
  { src: '/images/gallery/event2.jpg', alt: 'Past event – cultural programme', category: 'Archive' },
  { src: '/images/gallery/event3.jpg', alt: 'Past event – community gathering', category: 'Archive' },
  { src: '/images/gallery/event4.jpg', alt: 'Past event – celebration', category: 'Archive' },
]

const categories = ['All', 'Medical Camps', 'Blood Donation', 'Ganeshotsava', 'Community', 'Relief & Charity', 'Aerial', 'Archive']

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = active === 'All' ? images : images.filter(img => img.category === active)

  const openLightbox = (index: number) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)
  const prevImage = () => setLightbox(prev => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null)
  const nextImage = () => setLightbox(prev => prev !== null ? (prev + 1) % filtered.length : null)

  return (
    <>
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-saffron-500/20 text-saffron-400 text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
              Our Work in Pictures
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
              Gallery
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Glimpses of our journey — medical camps, flood relief, Ganeshotsava,
              and the smiles that make it all worthwhile.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === cat
                    ? 'bg-saffron-500 text-white shadow-lg shadow-saffron-200'
                    : 'bg-white text-gray-600 hover:bg-saffron-50 hover:text-saffron-600 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Photo count */}
          <p className="text-center text-gray-500 text-sm mb-8">
            Showing {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <motion.div
                key={`${img.src}-${active}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.6) }}
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover cursor-pointer group relative"
                onClick={() => openLightbox(i)}
              >
                <div className="relative w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/600x400/ff7a18/white?text=${encodeURIComponent(img.category)}`
                    }}
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.category}
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No images in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage() }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <motion.div
            key={lightbox}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-5xl max-h-[80vh] mx-16 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/1200x800/ff7a18/white?text=${encodeURIComponent(filtered[lightbox].category)}`
              }}
            />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-medium">{filtered[lightbox].alt}</p>
              <p className="text-saffron-400 text-sm">{filtered[lightbox].category}</p>
            </div>
          </motion.div>

          {/* Next */}
          <button
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage() }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox + 1} / {filtered.length}
          </div>
        </motion.div>
      )}
    </>
  )
}
