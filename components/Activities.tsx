'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useState } from 'react'
import {
  Stethoscope, GraduationCap, Droplets, HeartHandshake,
  CreditCard, Eye, ArrowRight, Leaf, X, ChevronRight,
} from 'lucide-react'

interface Activity {
  emoji: string
  title: string
  description: string
  frequency?: string
  color: string
  bgColor: string
  borderColor: string
  detail: {
    heading: string
    body: string[]
    images: string[]
    captions: string[]
  }
}

const activities: Activity[] = [
  {
    emoji: '🏥',
    title: 'Free Medical Camps',
    description: 'Regular free medical camps conducted twice every month, providing quality healthcare to underprivileged families in Farangipete and surrounding areas.',
    frequency: 'Twice a month',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-100',
    detail: {
      heading: 'Free Medical Camps – 344+ Camps & Counting',
      body: [
        'Sevanjali Prathishtana conducts free medical camps twice every month in collaboration with Rotary Club Bantwal, Justice K S Hegde Charitable Hospital Deralakatte, A B Shetty Institute of Dental Science Deralakatte, and D.K. Jilla Andhathva Nivarana Samsthe Mangalore.',
        'Each camp features specialist doctors including Eye Specialists, Dental Surgeons, Physicians, Paediatricians, Dermatologists, Gynaecologists, Surgeons, Orthopaedic Surgeons, and ENT Specialists.',
        'Patients found to need further treatment are issued a Green Card granting discounted care at the partner hospitals. Any required eye, dental, normal/caesarean delivery, harelip, or ear/nose/face correction surgeries are performed free of cost.',
        'Prescribed medicines are distributed free at the camp itself. Where unavailable on-site, patients receive a signed note from KK Punja that entitles them to free medicines at partner medical stores.',
        'People of all castes and religions are warmly welcomed. As of December 2014, the 344th camp was conducted — with thousands of beneficiaries across the decades.',
      ],
      images: [
        '/images/activities/medical-camp-1.jpg',
        '/images/activities/medical-camp-2.jpg',
        '/images/activities/medical-camp-3.jpg',
        '/images/activities/medical-camp-4.jpg',
        '/images/activities/medical-camp-5.jpg',
        '/images/activities/medical-camp-6.jpg',
      ],
      captions: [
        'Patients waiting for their turn',
        'Busy day for dental surgeons',
        'Dermatologist at work',
        'ENT Specialist consultation',
        'Free medicine distribution',
        'Busy view of the medical camp',
      ],
    },
  },
  {
    emoji: '🎓',
    title: 'Educational Scholarships',
    description: 'Merit and need-based scholarships provided to deserving students, helping them pursue engineering and higher education.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    detail: {
      heading: 'Educational Scholarships – Changing Lives Through Education',
      body: [
        'Sevanjali Prathishtana has been supporting deserving students from underprivileged backgrounds since its founding. In November 2014 alone, the trust organised an Rs 3.5 lakh Scholarship Distribution Programme in association with Rotary Club Bantwal and Justice K S Hegde Medical Academy, Deralakatte.',
        'KK Punja personally identifies students in need, assists with college admissions, helps secure education loans, coordinates with Bunts Society scholarships, and even donates engineering textbooks so students can focus on their studies without financial worry.',
        'The trust has helped dozens of students become engineers, doctors, teachers, and professionals — many of whom now give back to the community themselves.',
        'Read what our scholarship recipients have to say in the Testimonials section below.',
      ],
      images: ['/images/activities/volunteers-team.jpg'],
      captions: ['Sevanjali volunteers and scholarship coordination team'],
    },
  },
  {
    emoji: '🩸',
    title: 'Blood Donation Camps',
    description: 'Regularly organised blood donation drives that help replenish blood bank stocks and save countless lives across Dakshina Kannada.',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-100',
    detail: {
      heading: 'Blood Donation Camps – Saving Lives Together',
      body: [
        'Sevanjali Prathishtana regularly organises blood donation drives in Farangipete, working with local hospitals and partner organisations to replenish blood bank stocks across Dakshina Kannada.',
        'The camps are open to all eligible donors and are organised with full medical supervision. In January 2021, the trust conducted its 110th Blood Donation Camp — a milestone that reflects decades of dedicated effort.',
        'Each camp sees enthusiastic participation from community members, students, and volunteers who come forward to donate and help save lives.',
      ],
      images: [
        '/images/activities/blood-donation-camp.jpg',
        '/images/activities/blood-donation2.jpg',
        '/images/activities/blood-donation3.jpg',
      ],
      captions: [
        '110th Blood Donation Camp – January 2021',
        'Donors at a blood donation drive',
        'Community participation at blood camp',
      ],
    },
  },
  {
    emoji: '🤝',
    title: 'Patient Assistance',
    description: 'Providing financial assistance and emotional support to hospitalised patients and their families who cannot afford treatment costs.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-100',
    detail: {
      heading: 'Patient Assistance – No One Left Behind',
      body: [
        'Sevanjali Prathishtana directly assists hospitalised patients who cannot afford treatment. KK Punja personally signs medicine receipts ensuring patients receive free medicines from partner stores.',
        'The trust also provides financial support for surgical procedures, post-operative care, and emergency medical needs, ensuring that no one in the community is denied treatment due to lack of funds.',
        'Beyond finances, the team provides emotional support and follow-up care, truly embodying the spirit of Sevanjali — selfless service.',
      ],
      images: ['/images/activities/community-meeting.jpg'],
      captions: ['Community meeting discussing patient support programmes'],
    },
  },
  {
    emoji: '💳',
    title: 'Free Health Cards',
    description: 'Distributing free health cards (Green Cards) to underprivileged families, ensuring access to essential healthcare at partner hospitals.',
    color: 'text-saffron-500',
    bgColor: 'bg-saffron-50',
    borderColor: 'border-orange-100',
    detail: {
      heading: 'Free Health Cards – Healthcare for Every Family',
      body: [
        'The Free Health Card (Green Card) programme is one of Sevanjali\'s most impactful initiatives. Cards are distributed to underprivileged families, entitling holders to discounted and free treatments at partner hospitals.',
        'In November 2014, the trust distributed health cards through a special function organised in association with Rotary Club Bantwal and Justice K S Hegde Medical Academy, benefitting hundreds of families in one event alone.',
        'Card holders receive priority access at medical camps and can avail free surgeries, treatments, and medicines under the scheme.',
      ],
      images: ['/images/activities/inauguration.jpg'],
      captions: ['Health card distribution programme inauguration ceremony'],
    },
  },
  {
    emoji: '👁️',
    title: 'Eye, Dental & Surgical Care',
    description: 'Free eye checkups, dental treatments, and assistance for surgical procedures for those who cannot afford specialist care.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
    detail: {
      heading: 'Free Eye, Dental & Surgical Treatments',
      body: [
        'At every free medical camp, specialist care includes comprehensive eye examination and treatment, dental inspection and treatment, and general surgical consultations.',
        'Any required eye operations, dental procedures, normal or caesarean deliveries, harelip corrections, and deformity corrections of the ear, nose, or face are performed absolutely free of cost through the trust\'s partner hospitals.',
        'This programme has restored vision, improved oral health, and transformed the quality of life for hundreds of patients who would otherwise have no access to specialist care.',
      ],
      images: [
        '/images/gallery/medical-1.jpg',
        '/images/gallery/medical-4.jpg',
      ],
      captions: [
        'Eye inspection at a free medical camp',
        'Free healthcare services provided to patients',
      ],
    },
  },
]

function ActivityModal({ activity, onClose }: { activity: Activity; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 ${activity.bgColor} rounded-t-3xl px-7 py-5 flex items-start justify-between border-b ${activity.borderColor} z-10`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activity.emoji}</span>
            <div>
              <h2 className={`font-serif text-xl font-bold text-gray-900`}>{activity.title}</h2>
              {activity.frequency && (
                <span className={`text-xs font-semibold ${activity.color}`}>{activity.frequency}</span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-xl transition-colors">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-7">
          <h3 className="font-bold text-gray-900 text-lg mb-5">{activity.detail.heading}</h3>

          {/* Content */}
          <div className="space-y-3 mb-7">
            {activity.detail.body.map((para, i) => (
              <p key={i} className="text-gray-700 text-sm leading-relaxed">{para}</p>
            ))}
          </div>

          {/* Images */}
          {activity.detail.images.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 text-sm mb-3">Photo Gallery</h4>
              <div className={`grid gap-3 ${activity.detail.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {activity.detail.images.map((src, i) => (
                  <div key={src} className="relative rounded-2xl overflow-hidden aspect-video bg-gray-100">
                    <Image
                      src={src}
                      alt={activity.detail.captions[i] || activity.title}
                      fill
                      className="object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                    {activity.detail.captions[i] && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-xs">{activity.detail.captions[i]}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Activities() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const [selected, setSelected] = useState<Activity | null>(null)

  return (
    <>
      <section id="activities" className="section-padding bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-forest-500 font-semibold text-sm tracking-wider uppercase mb-3">
              <Leaf size={16} />What We Do
            </span>
            <h2 className="section-title">Our Activities & Services</h2>
            <p className="section-subtitle mx-auto text-center">
              Comprehensive community programmes designed to uplift every member of the society.
              Click any card to learn more.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group card border ${activity.borderColor} p-7 hover:-translate-y-2 cursor-pointer`}
                onClick={() => setSelected(activity)}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${activity.bgColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{activity.emoji}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-saffron-600 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{activity.description}</p>
                {activity.frequency && (
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${activity.bgColor} ${activity.color}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {activity.frequency}
                  </span>
                )}
                <div className={`mt-4 flex items-center gap-1 text-sm font-semibold ${activity.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  Learn more <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-14"
          >
            <p className="text-gray-500 mb-5">Interested in participating or volunteering?</p>
            <a href="/contact" className="btn-primary">
              Get Involved <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ActivityModal activity={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
