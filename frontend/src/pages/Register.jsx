import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Create supabase auth user
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Registration succeeded
    setLoading(false)
    navigate("/confirm-email") // Redirect to email confirmation page after signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500">
      <div className="max-w-sm w-full p-4 bg-gray-50 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <hr className="mb-4 mt-4 w-full" />
        <div className="flex items-center justify-center">
          <span>
            Already have an account? <a href="/login" className="underline text-blue-600 hover:text-blue-800">Login</a>
          </span>
        </div>
      </div>
    </div>
  );
}
