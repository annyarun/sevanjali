import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Activities from '@/components/Activities'
import Scholarships from '@/components/Scholarships'
import Founder from '@/components/Founder'
import Events from '@/components/Events'
import CallToAction from '@/components/CallToAction'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Sevanjali Prathishtana – A community-driven NGO serving Farangipete since 1993. Free medical camps, educational scholarships, blood donation drives, and more.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Activities />
      <Scholarships />
      <Founder />
      <Events />
      <CallToAction />
    </>
  )
}
