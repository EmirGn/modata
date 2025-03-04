import { useState, useEffect } from "react"
import "react-native-url-polyfill/auto"
import { supabase } from "./lib/supabase"
import Login from "./components/Login"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { Session } from "@supabase/supabase-js"

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {!session ? (
          <Login />
        ) : (
          <View style={styles.profileContainer}>
            <Text style={styles.text}>Logged in as:</Text>
            <Text style={styles.userId}>{session.user.id}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  userId: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});