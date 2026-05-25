export function resolveLockedProjectId(
  profile: { locked_project_id?: string | null },
  authMetadata?: Record<string, unknown> | null
): string | null {
  const fromProfile = profile.locked_project_id
  if (fromProfile) return fromProfile
  const fromMeta = authMetadata?.locked_project_id
  return typeof fromMeta === 'string' ? fromMeta : null
}

/** Perfil restringido: solo tabla de propiedades del scraper de un proyecto. */
export function isPropertiesOnlyViewer(
  profile: { locked_project_id?: string | null },
  authMetadata?: Record<string, unknown> | null
): boolean {
  return Boolean(resolveLockedProjectId(profile, authMetadata))
}

export function propertiesViewerPath(projectId: string): string {
  return `/dashboard/view-properties/${projectId}`
}

export function getPostLoginPath(
  profile: { role: string; locked_project_id?: string | null },
  authMetadata?: Record<string, unknown> | null
): string {
  const lockedId = resolveLockedProjectId(profile, authMetadata)
  if (lockedId) {
    return propertiesViewerPath(lockedId)
  }
  if (profile.role === 'master_admin') {
    return '/dashboard/admin'
  }
  return '/dashboard/org'
}
