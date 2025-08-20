import Login from "../components/Login"
import { supabase } from "../supabaseClient"
import React, {useState, useEffect} from 'react'

export default function Home() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data?.user?? null)
        })
    }, [])

    if (!user) return <Login/>
    return <h1>Welcome, {user.email}</h1>
}