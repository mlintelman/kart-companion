import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

export default function ProtectedRoute({ children }) {
    const { user, profile, loading } = useContext(AuthContext)

    if (loading) {
        return <p>Loading...</p> // or a spinner
    }

    // If not logged in, redirect
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // If logged in but profile doesn't exist, take to create profile
    if (!profile) {
        return <Navigate to ="/create-profile" replace />
    }

    // If logged in and profile exists return children
    return children
}