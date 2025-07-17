import { useState, useEffect } from 'react'
import { blink } from './blink/client'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setIsLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return (
      <div>
        <h1>Discord Bot Platform</h1>
        <button onClick={() => blink.auth.login()}>Login</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Discord Bot Platform - Logged in as {user.email}</h1>
      <button onClick={() => blink.auth.logout()}>Logout</button>
      <p>All UI removed as requested.</p>
      <p>Note: This platform does NOT run 24/7 without the web interface open.</p>
      <p>For 24/7 operation, you need to deploy to a real server (VPS, cloud server, etc.)</p>
    </div>
  )
}

export default App