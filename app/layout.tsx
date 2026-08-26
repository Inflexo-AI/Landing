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
  title: 'Inflexo AI | Automatización end-to-end para PyMEs',
  description:
    'Automatizamos procesos repetitivos e integramos IA en tus sistemas actuales con software a medida. Para PyMEs en Latinoamérica.',
  keywords: [
    'automatización con IA',
    'software a medida',
    'transformación digital',
    'automatización para PyMEs',
    'integración ERP',
    'integración CRM',
    'agentes de IA',
    'automatización de procesos',
    'Latinoamérica',
  ],
  authors: [{ name: 'Inflexo AI' }],
  icons: {
    icon: '/icon.svg?v=2',
    shortcut: '/icon.svg?v=2',
    apple: '/icon.svg?v=2',
  },
  openGraph: {
    title: 'Inflexo AI | Automatización end-to-end para PyMEs',
    description:
      'Automatizamos procesos repetitivos e integramos IA en tus sistemas actuales con software a medida.',
    type: 'website',
    locale: 'es_LA',
    siteName: 'Inflexo AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inflexo AI | Automatización end-to-end para PyMEs',
    description:
      'Automatizamos procesos repetitivos e integramos IA en tus sistemas actuales con software a medida.',
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
    <html lang="es-419" className={poppins.variable} suppressHydrationWarning>
      <body className={poppins.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

