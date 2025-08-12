import React, { useEffect, useState } from 'react'

export default function TestApi() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    fetch(`${apiUrl}/users`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>Users from Backend:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  )
}