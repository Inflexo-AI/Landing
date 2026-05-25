import { requireProfile } from '@/lib/auth/guards'
import { getPostLoginPath } from '@/lib/auth/properties-viewer'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { profile } = await requireProfile()
  redirect(getPostLoginPath(profile))
}
