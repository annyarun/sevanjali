import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Sevanjali Prathishtana – Serving Humanity Since 1993',
    template: '%s | Sevanjali Prathishtana',
  },
  description:
    'Sevanjali Prathishtana is a community-driven NGO in Farangipete, Bantwal Taluk, Dakshina Kannada, providing free medical camps, educational scholarships, blood donation drives, and more since 1993.',
  keywords: [
    'Sevanjali Prathishtana',
    'NGO Farangipete',
    'Bantwal Taluk',
    'Dakshina Kannada',
    'free medical camps',
    'Ganeshotsava',
    'social welfare Karnataka',
    'charitable trust Mangalore',
  ],
  authors: [{ name: 'Sevanjali Prathishtana' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sevanjaliprathishtana.com',
    siteName: 'Sevanjali Prathishtana',
    title: 'Sevanjali Prathishtana – Serving Humanity Since 1993',
    description:
      'A community-driven NGO serving Farangipete and surrounding communities with free medical camps, scholarships, and social initiatives.',
    images: [
      {
        url: '/images/hero/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Sevanjali Prathishtana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sevanjali Prathishtana – Serving Humanity Since 1993',
    description:
      'A community-driven NGO serving Farangipete and surrounding communities.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://sevanjaliprathishtana.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
