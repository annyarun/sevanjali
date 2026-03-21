import type { Metadata } from 'next'
import Activities from '@/components/Activities'
import CallToAction from '@/components/CallToAction'

export const metadata: Metadata = {
  title: 'Our Activities',
  description: 'Explore the comprehensive social and charitable activities of Sevanjali Prathishtana including free medical camps, educational scholarships, blood donation drives, and more.',
}

export default function ActivitiesPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-5">Our Activities</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Comprehensive programmes serving thousands of people every year
        </p>
      </div>
      <Activities />
      <CallToAction />
    </div>
  )
}
