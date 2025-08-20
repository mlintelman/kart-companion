import React, { useState } from "react"
import { supabase } from "../supabaseClient"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleLogin(e) {
        e.preventDefault()
        setError("")
        setLoading(true)
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email, 
            password
        })

        if (error) {
            setError(error.message)
        } else if (data.session) {
            console.log("User session:", data.session)
            window.location.href = "/"
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="border rounded px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                <input
                    type="password"
                    placeholder="Password"
                    className="border rounded px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}