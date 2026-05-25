import { requireProfile } from '@/lib/auth/guards'
import { isPropertiesOnlyViewer, propertiesViewerPath } from '@/lib/auth/properties-viewer'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { getClientStats, getProjects } from '@/app/actions/client'
import { redirect } from 'next/navigation'

export default async function OrgLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { profile } = await requireProfile()

  if (isPropertiesOnlyViewer(profile) && profile.locked_project_id) {
    redirect(propertiesViewerPath(profile.locked_project_id))
  }

  // Obtener stats para badges
  const stats = await getClientStats()
  const projects = await getProjects()
  const activeProjects = projects.filter((p) => p.status === 'active').length

  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard/org',
      icon: 'LayoutDashboard',
    },
    {
      label: 'Proyectos',
      href: '/dashboard/org/projects',
      icon: 'Briefcase',
      badge: activeProjects,
    },
    {
      label: 'Equipo',
      href: '/dashboard/org/team',
      icon: 'Users',
      badge: stats.totalUsers,
    },
    {
      label: 'Configuración',
      href: '/dashboard/org/settings',
      icon: 'Settings',
    },
  ]

  return (
    <DashboardLayout
      navItems={navItems}
      user={{
        name: profile.full_name,
        email: profile.email,
        role: profile.role,
      }}
    >
      {children}
    </DashboardLayout>
  )
}
