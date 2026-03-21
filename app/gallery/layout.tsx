import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photo gallery of Sevanjali Prathishtana showing medical camps, Ganeshotsava celebrations, blood donation drives, and community events.',
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
