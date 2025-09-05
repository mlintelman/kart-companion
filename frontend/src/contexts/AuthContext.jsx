import React, { useEffect, useState, createContext } from 'react'
import { supabase } from '../supabaseClient'

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect (() => {
        async function loadAuth() {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                const { data: profile } = await supabase
                    .from("profile")
                    .select("*")
                    .eq("user_id", user.id)
                    .single()
                setProfile(profile)
            }
            setLoading(false)
        }
        loadAuth()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => listener.subscription.unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value = {{ user, profile, setProfile, loading}}>
            {children}
        </AuthContext.Provider>
    )
}