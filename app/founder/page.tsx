'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Quote, Award, Heart, Users, Calendar, Star, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const milestones = [
  { year: '1993', title: 'Founded Sevanjali Prathishtana', description: 'Established the NGO with a small group of community-minded individuals in Farangipete.' },
  { year: '1993', title: 'First Ganeshotsava Organised', description: 'Launched the annual Ganeshotsava festival, bringing the community together for the first time.' },
  { year: '2000s', title: 'Free Medical Camps Launched', description: 'Introduced regular free medical camps, now held twice every month.' },
  { year: '2010s', title: 'Educational Scholarships', description: 'Began awarding merit-cum-need scholarships to deserving students from underprivileged backgrounds.' },
  { year: '2020', title: 'COVID-19 Community Relief', description: 'Led the organisation\'s relief efforts during the pandemic, distributing essential supplies to families in need.' },
  { year: 'Today', title: '30+ Years of Leadership', description: 'Continues to lead the trust with the same passion and dedication as day one.' },
]

const values = [
  { icon: Heart, title: 'Compassion', desc: 'Every decision is driven by genuine care for the community.' },
  { icon: Users, title: 'Inclusivity', desc: 'Service without distinction of caste, religion, or background.' },
  { icon: Star, title: 'Integrity', desc: 'Transparent, accountable, and honest leadership.' },
  { icon: Award, title: 'Excellence', desc: 'Committed to the highest quality of community service.' },
]

export default function FounderPage() {
  const { ref: timelineRef, inView: timelineInView } = useInView({ threshold: 0.05, triggerOnce: true })
  const { ref: valRef, inView: valInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero banner */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-4 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-saffron-500/10 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-forest-500/10 translate-y-1/2 -translate-x-1/4" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-400 text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5">
            <Star size={14} />
            Leadership &amp; Vision
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
            Our Founder
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            The visionary who turned a dream of community service into three 
            decades of meaningful impact
          </p>
        </motion.div>
      </div>

      {/* Main profile section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Photo + Quick facts — sticky sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-2 lg:sticky lg:top-28"
          >
            {/* Photo card */}
            <div className="relative bg-gradient-to-br from-saffron-50 to-orange-50 rounded-3xl p-6 shadow-card text-center mb-6">
              {/* Decorative ring */}
              <div className="absolute -inset-1 bg-gradient-to-br from-saffron-400/20 to-forest-400/20 rounded-3xl -z-10" />

              <div className="relative w-52 h-60 mx-auto mb-5 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/images/founder.jpg"
                  alt="Sri Krishna Kumar Punja – Founder, Sevanjali Prathishtana"
                  fill
                  className="object-cover object-top"
                  onError={(e) => {
                    const parent = (e.target as HTMLImageElement).parentElement
                    if (parent) {
                      parent.innerHTML = `
                        <div style="width:100%;height:100%;background:linear-gradient(135deg,#ff7a18,#ea6500);display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;">
                          <div style="font-size:4rem;font-weight:700;font-family:serif;">KK</div>
                          <div style="font-size:0.75rem;opacity:0.85;margin-top:4px;">KK Punja</div>
                        </div>
                      `
                    }
                  }}
                />
              </div>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">
                Sri Krishna Kumar Punja
              </h2>
              <p className="text-saffron-500 font-semibold text-sm mb-1">KK Punja</p>
              <p className="text-gray-500 text-sm mb-5">Management Trustee, Sevanjali Prathishtana</p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: '30+', lbl: 'Years Leading' },
                  { val: '1993', lbl: 'Founded' },
                  { val: '344+', lbl: 'Camps' },
                  { val: '10K+', lbl: 'Lives Helped' },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="text-xl font-bold text-saffron-500 font-serif">{val}</div>
                    <div className="text-xs text-gray-500 font-medium">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <div className="bg-gradient-to-br from-forest-500 to-forest-700 rounded-2xl p-6 text-white relative overflow-hidden">
              <Quote size={48} className="absolute top-3 right-3 text-white/10" />
              <p className="italic text-sm leading-relaxed relative z-10 mb-4">
                "Service to humanity is service to God. Every person we help, 
                every life we touch, is a step towards building the kind of 
                community we all want to live in."
              </p>
              <div className="text-forest-200 text-xs font-semibold">— Sri Krishna Kumar Punja</div>
            </div>
          </motion.div>

          {/* Biography + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-3"
          >
            {/* Biography */}
            <div className="mb-12">
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-6">Biography</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Sri Krishna Kumar Punja — affectionately known as <strong className="text-saffron-600">KK Punja</strong> — 
                  is the Management Trustee of Sevanjali Prathishtana and the driving force 
                  behind the organisation's extraordinary three-decade journey of community 
                  service in Farangipete, Bantwal Taluk, Dakshina Kannada.
                </p>
                <p>
                  Born with a deep sense of social responsibility, KK Punja founded 
                  Sevanjali Prathishtana in 1993 alongside a group of like-minded community 
                  members who shared his vision: to build an organisation that genuinely 
                  served the needy, irrespective of their caste, religion, or background.
                </p>
                <p>
                  Under his leadership, Sevanjali has grown from a grassroots community 
                  initiative into a respected and trusted institution. His steadfast 
                  dedication and hands-on approach to social welfare have earned him 
                  immense respect and goodwill not just in Farangipete, but across 
                  the entire Dakshina Kannada region.
                </p>
                <p>
                  One of his most enduring contributions is the annual <strong className="text-forest-600">Ganeshotsava</strong> festival, 
                  which he helped establish in 1993. Today, this celebration draws thousands 
                  of people from different communities and has become a symbol of unity, 
                  inclusivity, and shared joy.
                </p>
                <p>
                  His vision for a healthier community led to the establishment of free 
                  medical camps — held twice every month — that have collectively served 
                  hundreds of thousands of patients over the decades. He has also championed 
                  education, blood donation, patient assistance, and free health card 
                  programmes for families who cannot afford healthcare.
                </p>
              </div>

              {/* Traits */}
              <div className="mt-8 space-y-3">
                {[
                  'Founder and Management Trustee of Sevanjali Prathishtana since 1993',
                  'Visionary leader who transformed community welfare in Farangipete',
                  'Champion of inclusivity — serving all communities irrespective of caste or religion',
                  'Personally oversees the organisation\'s free medical camp programme',
                  'Instrumental in running 344+ free medical camps over the years',
                  'Respected throughout Dakshina Kannada for his selfless service',
                ].map((trait, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-forest-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div ref={timelineRef}>
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-8">Journey & Milestones</h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron-300 via-forest-300 to-saffron-200" />

                <div className="space-y-8">
                  {milestones.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      className="flex gap-6 pl-14 relative"
                    >
                      {/* Dot */}
                      <div className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 border-saffron-500 bg-white shadow-sm" />

                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-block bg-saffron-50 text-saffron-600 text-xs font-bold px-3 py-1 rounded-full">
                            {m.year}
                          </span>
                          <h4 className="font-bold text-gray-900">{m.title}</h4>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{m.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8" ref={valRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h3 className="font-serif text-3xl font-bold text-gray-900 mb-3">
              The Values He Stands For
            </h3>
            <p className="text-gray-500 max-w-xl mx-auto">
              Principles that have guided the organisation for over three decades
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={valInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-saffron-50 mb-4">
                  <Icon size={26} className="text-saffron-500" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                <p className="text-gray-500 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">
            Inspired by His Vision?
          </h3>
          <p className="text-gray-500 mb-8">
            Join us in continuing KK Punja's legacy of compassion and service.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get Involved <ArrowRight size={18} />
            </Link>
            <Link href="/#activities" className="btn-outline">
              Our Activities
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
