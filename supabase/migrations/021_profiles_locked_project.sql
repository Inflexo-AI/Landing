-- Usuario restringido: solo ve propiedades del scraper de un proyecto
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS locked_project_id UUID REFERENCES projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_profiles_locked_project_id ON profiles(locked_project_id);

COMMENT ON COLUMN profiles.locked_project_id IS 'Si está definido, el usuario solo accede a la vista de propiedades de este proyecto.';
