import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zvxxnvifqlzhjuiioxwy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eHhudmlmcWx6aGp1aWlveHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MTI5MTIsImV4cCI6MjA4MjI4ODkxMn0.ikjlQJDoqhAFSfA9S4Ia3sIMlfYAxolOU7xjwhvWx00'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)