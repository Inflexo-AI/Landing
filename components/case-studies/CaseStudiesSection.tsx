'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Stethoscope,
  UserSearch,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'

interface Sector {
  id: string
  title: string
  subtitle: string
  description: string
  bullets: string[]
  href: string
  cta: string
  external: boolean
  icon: LucideIcon
}

const SECTORS: Sector[] = [
  {
    id: 'rrhh',
    title: 'RRHH',
    subtitle: 'SmartHire OS',
    description:
      'Un súper ATS con IA integrada: screening, sourcing y entrevistas a candidatos por WhatsApp y voz. Del CV a la entrevista, sin fricción.',
    bullets: [
      'Screening automático de CVs',
      'Sourcing inteligente',
      'Entrevistas por WhatsApp y voz',
    ],
    href: 'https://smart-hire-code.vercel.app/',
    cta: 'Ver SmartHire OS',
    external: true,
    icon: UserSearch,
  },
  {
    id: 'inmobiliario',
    title: 'Sector inmobiliario',
    subtitle: 'Proyectos a medida',
    description:
      'Cada operación es distinta. Diseñamos proyectos individuales: scrapers de portales, paneles de inventario, matching de propiedades y automatización comercial.',
    bullets: [
      'Scraping de portales',
      'Dashboards de inventario',
      'Automatización comercial',
    ],
    href: '#contact',
    cta: 'Hablemos de tu proyecto',
    external: false,
    icon: Building2,
  },
  {
    id: 'restaurantes',
    title: 'Restaurantes',
    subtitle: 'Recepción y reservas con IA',
    description:
      'Un recepcionista digital que confirma mesas, responde consultas y hace follow-up por WhatsApp y voz, sincronizado con tu sistema.',
    bullets: [
      'Reservas por WhatsApp y voz',
      'Atención 24/7',
      'Sincronización con tu sistema',
    ],
    href: '#contact',
    cta: 'Automatizar mi local',
    external: false,
    icon: UtensilsCrossed,
  },
  {
    id: 'medicina',
    title: 'Medicina',
    subtitle: 'Operación clínica con IA',
    description:
      'Automatizamos recepción de pacientes, calificación de consultas y flujos administrativos para clínicas, laboratorios y equipos de salud.',
    bullets: [
      'Recepción y agenda de pacientes',
      'Calificación de consultas',
      'Flujos administrativos',
    ],
    href: '#contact',
    cta: 'Conversemos tu caso',
    external: false,
    icon: Stethoscope,
  },
]

export default function CaseStudiesSection() {
  return (
    <section
      id="work"
      className="bg-[#000000] px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="sectors-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-lg border border-white/20 bg-black px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white">
            Industrias
          </span>
          <h2
            id="sectors-heading"
            className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Sectores de éxito
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400">
            Reclutamiento, inmobiliario, gastronomía y salud: IA aplicada a
            cada operación, no una solución genérica.
          </p>
        </motion.header>

        <div className="grid gap-6 sm:grid-cols-2">
          {SECTORS.map((sector, i) => (
            <SectorCard key={sector.id} sector={sector} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SectorCard({ sector, index }: { sector: Sector; index: number }) {
  const Icon = sector.icon
  const linkProps = sector.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur transition-all duration-300 hover:scale-[1.01] hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] sm:p-7"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300">
          <Icon size={22} />
        </div>
        {sector.external && (
          <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-purple-300">
            Producto live
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-white sm:text-2xl">{sector.title}</h3>
      <p className="mt-1 text-sm font-medium text-purple-300">{sector.subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-gray-400">
        {sector.description}
      </p>

      <ul className="mt-5 space-y-2">
        {sector.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-400" />
            {bullet}
          </li>
        ))}
      </ul>

      <a
        href={sector.href}
        {...linkProps}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/50 bg-purple-500/10 py-2.5 text-sm font-semibold text-purple-300 transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/20 hover:text-white"
      >
        {sector.cta}
        {sector.external ? (
          <ExternalLink size={16} />
        ) : (
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </a>
    </motion.article>
  )
}
