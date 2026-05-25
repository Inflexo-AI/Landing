import { requireProfile } from '@/lib/auth/guards'
import { isPropertiesOnlyViewer, propertiesViewerPath } from '@/lib/auth/properties-viewer'
import { redirect } from 'next/navigation'
import PropertiesViewerShell from '@/components/layout/PropertiesViewerShell'

export default async function ViewPropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { profile } = await requireProfile()

  if (!isPropertiesOnlyViewer(profile)) {
    if (profile.role === 'master_admin') {
      redirect('/dashboard/admin')
    }
    redirect('/dashboard/org')
  }

  if (!profile.locked_project_id) {
    redirect('/auth/login')
  }

  return (
    <PropertiesViewerShell user={{ name: profile.full_name, email: profile.email }}>
      {children}
    </PropertiesViewerShell>
  )
}
