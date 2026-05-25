import { requireProfile } from '@/lib/auth/guards'
import { isPropertiesOnlyViewer } from '@/lib/auth/properties-viewer'
import { redirect } from 'next/navigation'
import PropertiesView from '@/components/projects/views/PropertiesView'
import { verifyProjectAccessForViewer } from '@/app/actions/project-actions'

export default async function ViewPropertiesPage({
  params,
}: {
  params: { projectId: string }
}) {
  const { profile } = await requireProfile()

  if (!isPropertiesOnlyViewer(profile)) {
    redirect('/dashboard/org/projects?focusProject=' + params.projectId + '&tab=properties')
  }

  if (profile.locked_project_id !== params.projectId) {
    redirect(`/dashboard/view-properties/${profile.locked_project_id}`)
  }

  const access = await verifyProjectAccessForViewer(params.projectId)
  if (!access.hasAccess) {
    return (
      <div className="p-8 text-center text-red-500">
        No tienes acceso a las propiedades de este proyecto.
      </div>
    )
  }

  return (
    <div className="min-w-0 max-w-full">
      <PropertiesView projectId={params.projectId} />
    </div>
  )
}
