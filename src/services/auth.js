import { supabase } from './supabase'

export const authService = {
  // Iniciar sesión
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  // Cerrar sesión
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obtener usuario actual
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Crear usuario admin (solo la primera vez)
  async createAdmin(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) throw error
    return data
  }
}