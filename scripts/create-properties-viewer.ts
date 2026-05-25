/**
 * Crear usuario que solo ve Propiedades del scraper de un proyecto.
 * Uso: npx tsx scripts/create-properties-viewer.ts <email> <password> <projectId> [fullName]
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

function loadEnvLocal() {
  const envPath = resolve(__dirname, '../.env.local')
  const content = readFileSync(envPath, 'utf8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
}

async function main() {
  const email = process.argv[2]
  const password = process.argv[3]
  const projectId = process.argv[4]
  const fullName = process.argv[5] || 'Visor propiedades'

  if (!email || !password || !projectId) {
    console.error(
      'Uso: npx tsx scripts/create-properties-viewer.ts <email> <password> <projectId> [fullName]'
    )
    process.exit(1)
  }

  loadEnvLocal()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    console.error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
    process.exit(1)
  }

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: project, error: projectError } = await admin
    .from('projects')
    .select('id, name, organization_id')
    .eq('id', projectId)
    .single()

  if (projectError || !project?.organization_id) {
    console.error('Proyecto no encontrado o sin organización:', projectError?.message)
    process.exit(1)
  }

  console.log('Proyecto:', project.name, project.id)

  let userId: string | undefined
  const { data: listData } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const existing = listData?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase())

  if (existing) {
    userId = existing.id
    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    })
    if (updateError) {
      console.error('Error actualizando usuario:', updateError.message)
      process.exit(1)
    }
    console.log('Usuario auth existente actualizado:', userId)
  } else {
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    })
    if (createError || !created?.user) {
      console.error('Error creando usuario:', createError?.message)
      process.exit(1)
    }
    userId = created.user.id
    console.log('Usuario auth creado:', userId)
  }

  const profilePayload = {
    id: userId,
    organization_id: project.organization_id,
    email,
    full_name: fullName,
    role: 'org_member' as const,
    locked_project_id: projectId,
  }

  let { error: profileError } = await admin.from('profiles').upsert(profilePayload, { onConflict: 'id' })

  if (profileError?.message?.includes('locked_project_id')) {
    const { locked_project_id: _removed, ...withoutLocked } = profilePayload
    const retry = await admin.from('profiles').upsert(withoutLocked, { onConflict: 'id' })
    profileError = retry.error
    if (!profileError) {
      await admin.auth.admin.updateUserById(userId, {
        user_metadata: { full_name: fullName, locked_project_id: projectId, view_mode: 'properties_only' },
      })
      console.log('locked_project_id guardado en user_metadata (migración 021 pendiente en DB)')
    }
  }

  if (profileError) {
    console.error('Error en perfil:', profileError.message)
    process.exit(1)
  }

  await admin.auth.admin.updateUserById(userId, {
    user_metadata: { full_name: fullName, locked_project_id: projectId, view_mode: 'properties_only' },
  })

  const { error: memberError } = await admin.from('organization_members').upsert(
    {
      organization_id: project.organization_id,
      user_id: userId,
      role: 'member',
    },
    { onConflict: 'organization_id,user_id' }
  )

  if (memberError) {
    console.error('Error en organization_members:', memberError.message)
    process.exit(1)
  }

  const loginUrl = `https://somosinflexo.com/dashboard/view-properties/${projectId}`
  console.log('\nListo.')
  console.log('Rol: solo Propiedades (scraper)')
  console.log('URL directa:', loginUrl)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
