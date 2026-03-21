'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Quote, GraduationCap, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Divya Shanker',
    profession: 'Graduated Engineer',
    quote: 'Firstly, I want to thank Sevanjali Trust and its trustee Mr. Krishna Kumar Poonja for supporting me financially to complete my education. Because of his help I am able to fulfill my dream. After seeing his helping nature even I thought of helping others who are in need. Poonja Sir is an excellent person whom I saw in my life — a great person with extraordinary helping nature and strong vision. Finally I thank all the people who helped me directly and indirectly. Thank you.',
    year: '2014',
  },
  {
    name: 'Harinakshi Shetty',
    profession: 'Engineer',
    quote: '"There is no exercise better for the heart than reaching down and lifting the people up." Sevanjali Prathishtana does the same work. I never dreamt of becoming an engineer because I belong to a middle class family. After I completed SSLC I was confused whether I should continue my education or not. At that same time I met Krishnakumar Poonja, and he encouraged me to complete my education. He helped me in getting admission and guided me throughout. Today I am an engineer — and the credit goes to Sevanjali and KK Punja.',
    year: '2014',
  },
  {
    name: 'Pavithra Lakshmi',
    profession: 'Engineering Student',
    quote: 'Sevanjali is a support to continue my studies. After my PUC I had a financial problem to continue. At that time one of my neighbours requested K.K. Poonja. So now Sevanjali is helping me financially to continue my studies. I thank K.K. Poonja and all other people who helped me through Sevanjali. K.K. Poonja has been my role model because of his helping nature. I wish Sevanjali may reach a higher stage and may provide still better service to the society.',
    year: '2014',
  },
  {
    name: 'Navya Shetty',
    profession: 'Engineer – Fortune 500 Company',
    quote: 'I want to thank Krishna Kumar Poonja for his great help. I had a goal of becoming an Engineer but I had a financial problem. He helped me get an education loan as well as a loan from Bunts Society. He also helped me get most of the engineering textbooks when they were unavailable from the library. It helped me a lot to study for exams. Now I am an Engineer in one of the top companies and the credit goes to Poonja and also to my parents. Without their support I would not have done that.',
    year: '2014',
  },
  {
    name: 'Vidhyashree',
    profession: 'Engineer',
    quote: 'I thank Sevanjali Trust and Krishna Kumar Poonja sir for helping me in my education by which I am fulfilling my dream of becoming an Engineer. Sevanjali Trust helps many students to fulfill their dream. I thank all the members of the trust who helped me directly and indirectly. And I wish this trust grows bigger and helps more students.',
    year: '2014',
  },
  {
    name: 'Akshatha',
    profession: 'Assistant Professor',
    quote: 'I would like to show my gratitude towards Mr Krishnakumar Poonja and Sevanjali Prathistana for providing me with an opportunity to do engineering. I didn\'t have a goal of becoming an engineer because of financial problems. But he helped me in getting a free seat in one of the reputed colleges and also assisted with providing engineering textbooks. Today I am working as an Assistant Professor in one of the reputed colleges. I owe my success to Mr. Krishnakumar Poonja, who has aided me in all possible ways.',
    year: '2014',
  },
  {
    name: 'Mamatha',
    profession: 'Primary School Teacher',
    quote: 'I would like to thank Sevanjali Trust and K K Punja sir who helped me for my education. I had a dream of becoming a teacher in my childhood days but it was difficult to continue my education after PUC because of financial problems. At that time Punja sir helped me to get an education loan as well as helped by giving the scholarship of Sevanjali Trust. Now I am very happy working as a teacher in a primary school. I am very thankful to Sevanjali always.',
    year: '2014',
  },
  {
    name: 'Reshma Gatty',
    profession: 'Engineer',
    quote: 'I would like to express my wholehearted gratefulness to Mr. K.K. Poonja and Sevanjali Prathishtana for helping me to achieve success in life. Due to a moderate family background I had joined B.Sc and completed the 1st semester when one fine day they contacted me and provided a life-changing opportunity of joining engineering college. Both financially and emotionally Mr. K.K. Poonja has supported me a lot. They have always considered me as a daughter and helped me in all senses to achieve a good life.',
    year: '2014',
  },
  {
    name: 'Pranam Kumar',
    profession: 'Higher Studies Graduate',
    quote: 'I am here to share some of my experiences with Sevanjali, the way it helped me to grow higher and brighter. When I made a decision to drop my diploma plan and join engineering (when all colleges had already started), KK Poonja supported me in all possible ways in joining SIT. Later, after I completed my B.E., when I told him about my plan for higher studies, there he was again to help. With all the motivation and encouragement from KK Poonja, I am where I am today.',
    year: '2014',
  },
  {
    name: 'Ramanath Amin',
    profession: 'MBA Graduate – Fortune 500 Company',
    quote: 'Like every primary school kid, I used to say I want to become a Doctor. But in reality I could not even afford school fees. Today I don\'t regret being an MBA graduate working in one of the Fortune 500 companies. In my success there are few people and Krishnakumar Punja of Sevanjali Prathishtana is one of them. It was during my PUC days that one of my neighbours suggested me to contact Krishnakumar Punja — and that conversation changed my life.',
    year: '2014',
  },
]

export default function Scholarships() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [current, setCurrent] = useState(0)
  const total = testimonials.length

  const prev = () => setCurrent(c => (c - 1 + total) % total)
  const next = () => setCurrent(c => (c + 1) % total)

  const visible = [
    testimonials[(current) % total],
    testimonials[(current + 1) % total],
    testimonials[(current + 2) % total],
  ]

  return (
    <section id="scholarships" className="section-padding bg-gradient-to-b from-blue-50/40 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-blue-500 font-semibold text-sm tracking-wider uppercase mb-3">
            <GraduationCap size={16} />
            Student Stories
          </span>
          <h2 className="section-title">Educational Scholarships</h2>
          <p className="section-subtitle mx-auto text-center">
            Real stories from students whose lives were transformed through
            Sevanjali's educational support programme
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-14"
        >
          {[
            { val: '₹3.5L+', lbl: 'Scholarships Distributed' },
            { val: '30+',    lbl: 'Years of Support' },
            { val: '100s',   lbl: 'Students Helped' },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="bg-white rounded-2xl shadow-card p-4 text-center">
              <div className="text-xl font-bold text-blue-500 font-serif">{val}</div>
              <div className="text-xs text-gray-500 mt-1">{lbl}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards — desktop 3-up, mobile 1-up */}
        <div className="relative">
          {/* Desktop: 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {visible.map((t, i) => (
              <motion.div
                key={`${t.name}-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`bg-white rounded-2xl shadow-card p-6 flex flex-col ${i === 1 ? 'ring-2 ring-saffron-200' : ''}`}
              >
                <Quote size={28} className="text-saffron-200 mb-3 shrink-0" />
                <p className="text-gray-600 text-sm leading-relaxed flex-1 italic">
                  "{t.quote.length > 320 ? t.quote.slice(0, 320) + '…' : t.quote}"
                </p>
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-blue-500">{t.profession}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={11} className="text-saffron-400 fill-saffron-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: single card */}
          <div className="md:hidden">
            <motion.div
              key={`mobile-${current}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-card p-6"
            >
              <Quote size={28} className="text-saffron-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed italic mb-5">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center text-white font-bold">
                  {testimonials[current].name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonials[current].name}</p>
                  <p className="text-xs text-blue-500">{testimonials[current].profession}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white shadow-card hover:bg-saffron-50 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === current ? 'w-6 h-2.5 bg-saffron-500' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-saffron-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white shadow-card hover:bg-saffron-50 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>

          <p className="text-center text-gray-400 text-xs mt-3">
            {current + 1} of {total} testimonials
          </p>
        </div>
      </div>
    </section>
  )
}
