'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#activities', label: 'Activities' },
  { href: '/#events', label: 'Events' },
  { href: '/founder', label: 'Founder' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Only the home page has a full-screen dark hero sitting directly behind the navbar.
  // All other pages have a pt-20 container so the body background shows behind the navbar.
  const isHome = pathname === '/'

  // On inner pages always treat as "scrolled" (solid white bar) unless the user has
  // actually scrolled past the hero — on home we keep the transparent/white-text look.
  const solidBar = !isHome || scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    // Reset on route change
    setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBar
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-saffron-500 shadow-md group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.png"
                alt="Sevanjali Prathishtana Logo"
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              {/* Fallback avatar — always rendered behind the img */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-saffron-500 to-saffron-600 text-white text-lg font-bold -z-10">
                SP
              </div>
            </div>
            <div className="hidden sm:block">
              <p
                className={`font-serif font-bold text-lg leading-tight transition-colors duration-300 ${
                  solidBar ? 'text-gray-900' : 'text-white'
                }`}
              >
                Sevanjali
              </p>
              <p
                className={`text-xs font-medium transition-colors duration-300 ${
                  solidBar ? 'text-saffron-500' : 'text-saffron-300'
                }`}
              >
                Prathishtana
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-saffron-500/10 hover:text-saffron-600 ${
                  solidBar ? 'text-gray-700' : 'text-white hover:text-white'
                } ${
                  pathname === link.href && link.href !== '/'
                    ? 'text-saffron-600 bg-saffron-50'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919448502319"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                solidBar
                  ? 'text-gray-600 hover:text-saffron-500'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <Phone size={16} />
              +91 94485 02319
            </a>
            <a
              href="https://wa.me/919448502319"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm !px-5 !py-2"
            >
              Donate Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              solidBar
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden mt-2 overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-xl p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium hover:bg-saffron-50 hover:text-saffron-600 transition-colors ${
                      pathname === link.href && link.href !== '/'
                        ? 'bg-saffron-50 text-saffron-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <a
                    href="tel:+919448502319"
                    className="flex items-center gap-2 px-4 py-3 text-gray-600 font-medium"
                  >
                    <Phone size={16} />
                    +91 94485 02319
                  </a>
                  <a
                    href="https://wa.me/919448502319"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center btn-primary !py-2.5"
                  >
                    Donate Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
