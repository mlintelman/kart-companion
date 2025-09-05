import { supabase } from "../supabaseClient"
import { AuthContext } from "../contexts/AuthContext"
import React, { useContext} from 'react'

export default function Home() {
    const { user, profile, loading } = useContext(AuthContext)

    //return <h1>Welcome, {user ? user.email: ""}</h1>
    async function signOutUser() {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error('Error signing out:', error.message)
        } else {
            console.log('User signed out successfully.')
            window.location.href = '/login'
        }
    }

    return(
        <div>
            <h1>Welcome, {user ? user.email: ""}</h1>
            <button className="text-xl bg-blue-500 text-white cursor-pointer rounded-md pl-2 pr-2 pt-1 pb-1" onClick={() => signOutUser()}>Logout</button>
        </div>
    )
}