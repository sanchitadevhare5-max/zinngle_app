import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState } from 'react-native'

const SUPABASE_URL = 'https://qrfltrduilqxjyvphacr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZmx0cmR1aWxxeGp5dnBoYWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5Njk2NDYsImV4cCI6MjA4MTU0NTY0Nn0.RRC9h1CF_uUbaWPllkJxZPfXVGeNu-hZtr_lgABw8uE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})
