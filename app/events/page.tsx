import type { Metadata } from 'next'
import Events from '@/components/Events'
import CallToAction from '@/components/CallToAction'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Discover Ganeshotsava and other community events organised by Sevanjali Prathishtana that unite people from all walks of life.',
}

export default function EventsPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-5">Events</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Celebrating community, culture, and unity through our annual events
        </p>
      </div>
      <Events />
      <CallToAction />
    </div>
  )
}
