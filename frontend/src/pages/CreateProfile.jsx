import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
import { AuthContext } from "../contexts/AuthContext"

export default function CreateProfile() {
    const { user, setProfile } = useContext(AuthContext)
    const navigate = useNavigate()

    const [displayName, setDisplayName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleCreateProfile = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const { data, error } = await supabase
                .from("profile")
                .upsert({
                    user_id: user.id,
                    display_name: displayName,
                    first_name: firstName,
                    last_name: lastName
                })
                .select()
                .single()
            
            if (error) throw error
            setProfile(data)
            navigate("/")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-500">
            <div className="max-w-sm w-full p-4 bg-gray-50 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4"> Kart Companion Profile Setup</h2>
                <form onSubmit={handleCreateProfile} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Display Name"
                        className="border rounded px-3 py-2"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        className="border rounded px-3 py-2"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="border rounded px-3 py-2"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
        {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>
        </div>
    )
}