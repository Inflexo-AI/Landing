import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Inflexo AI | AI Automation & Digital Transformation Studio',
  description: 'We build automation systems that run your operations. We integrate AI into business processes, automate repetitive workflows, and build functional systems.',
  keywords: ['AI automation', 'digital transformation', 'workflow automation', 'ERP integration', 'CRM integration', 'business automation'],
    authors: [{ name: 'Inflexo AI' }],
  icons: {
    icon: '/icon.svg?v=2',
    shortcut: '/icon.svg?v=2',
    apple: '/icon.svg?v=2',
  },
  openGraph: {
    title: 'Inflexo AI | AI Automation & Digital Transformation',
    description: 'We build automation systems that run your operations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inflexo AI | AI Automation & Digital Transformation',
    description: 'We build automation systems that run your operations.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.variable} suppressHydrationWarning>
      <body className={poppins.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

