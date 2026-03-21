import type { Metadata } from 'next'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Founder from '@/components/Founder'
import CallToAction from '@/components/CallToAction'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Sevanjali Prathishtana, founded in 1993 by Sri Krishna Kumar Punja, and our mission to serve the community of Farangipete and Bantwal Taluk.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-5">About Us</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Three decades of dedicated service, compassion, and community building
        </p>
      </div>
      <About />
      <Stats />
      <Founder />
      <CallToAction />
    </div>
  )
}
