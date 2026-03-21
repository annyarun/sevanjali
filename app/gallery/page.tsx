'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  category: string
  span?: string
}

const images: GalleryImage[] = [
  // Medical camps
  { src: '/images/gallery/medical-1.jpg', alt: 'Free medical camp - doctors serving patients', category: 'Medical Camps', span: 'col-span-2 row-span-2' },
  { src: '/images/gallery/medical-2.jpg', alt: 'Medical camp - health checkup', category: 'Medical Camps' },
  { src: '/images/gallery/medical-3.jpg', alt: 'Medical camp - community health', category: 'Medical Camps' },
  { src: '/images/gallery/medical-4.jpg', alt: 'Free healthcare services', category: 'Medical Camps' },
  { src: '/images/gallery/medical-5.jpg', alt: 'Medical camp volunteers', category: 'Medical Camps' },
  // Blood donation
  { src: '/images/gallery/camp-1.jpg', alt: 'Blood donation drive', category: 'Blood Donation', span: 'row-span-2' },
  { src: '/images/gallery/camp-2.jpg', alt: 'Blood donation camp volunteers', category: 'Blood Donation' },
  // Charity & community
  { src: '/images/gallery/charity-1.jpg', alt: 'Community charity event', category: 'Charity', span: 'col-span-2' },
  { src: '/images/gallery/charity-2.jpg', alt: 'Sevanjali charity work', category: 'Charity' },
  { src: '/images/gallery/charity-3.jpg', alt: 'Community service', category: 'Charity' },
  { src: '/images/gallery/community-1.jpg', alt: 'Community gathering', category: 'Community' },
  { src: '/images/gallery/community-2.jpg', alt: 'Community event', category: 'Community' },
  // Ganeshotsava
  { src: '/images/events/ganesh-1.jpg', alt: 'Ganeshotsava festival', category: 'Ganeshotsava', span: 'col-span-2 row-span-2' },
  { src: '/images/events/ganesh-2.jpg', alt: 'Ganeshotsava celebrations', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-3.jpg', alt: 'Ganeshotsava - cultural programme', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-4.jpg', alt: 'Ganeshotsava - community gathering', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-5.jpg', alt: 'Ganeshotsava festival moments', category: 'Ganeshotsava' },
  { src: '/images/events/ganesh-6.jpg', alt: 'Ganeshotsava celebration', category: 'Ganeshotsava' },
  // COVID/other
  { src: '/images/gallery/covid-1.jpg', alt: 'Community assistance during COVID', category: 'Charity' },
  { src: '/images/gallery/covid-2.jpg', alt: 'Relief work', category: 'Charity' },
  { src: '/images/gallery/covid-3.jpg', alt: 'Essential supplies distribution', category: 'Charity' },
]

const categories = ['All', 'Medical Camps', 'Blood Donation', 'Ganeshotsava', 'Charity', 'Community']

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
              Glimpses of our journey — medical camps, community events, festivals, 
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

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <motion.div
                key={`${img.src}-${active}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
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
