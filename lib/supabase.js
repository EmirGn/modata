import { AppState } from "react-native"
import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://wvuxfhzcoeiubrdciqbo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2dXhmaHpjb2VpdWJyZGNpcWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMDQ5NzUsImV4cCI6MjA1NjY4MDk3NX0.mYkxZ7Cn8cbn5UDRNvR--koEMMeaPqqP-klYzTcbSTY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

AppState.addEventListener("change", (state) => {
  if(state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})