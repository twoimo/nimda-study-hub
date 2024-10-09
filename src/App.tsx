import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Terminal, Shield, Zap, Users, MessageSquare, LogOut } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Forum from './components/Forum'
import Tools from './components/Tools'
import Profile from './components/Profile'
import HackingCategories from './components/HackingCategories'

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const username = (e.currentTarget as HTMLFormElement).username.value
    const password = (e.currentTarget as HTMLFormElement).password.value
    if (username === 'root' && password === 'root') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      setIsAuthenticated(false)
      setIsLoggingOut(false)
    }, 1000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg neon-border">
          <h2 className="text-2xl font-bold mb-4 text-center glitch-text">H4CK3R L0G1N</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500"
          />
          <button type="submit" className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600">
            Access System
          </button>
        </form>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-green-500 p-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold glitch-text">N1MDA HUB</h1>
          <nav className="flex items-center">
            <Link to="/" className="mr-4 hover:text-neon-blue transition-colors duration-300">Dashboard</Link>
            <Link to="/forum" className="mr-4 hover:text-neon-blue transition-colors duration-300">Forum</Link>
            <Link to="/tools" className="mr-4 hover:text-neon-blue transition-colors duration-300">Tools</Link>
            <Link to="/profile" className="mr-4 hover:text-neon-blue transition-colors duration-300">Profile</Link>
            <Link to="/categories" className="mr-4 hover:text-neon-blue transition-colors duration-300">Categories</Link>
            <button
              onClick={handleLogout}
              className={`flex items-center bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${
                isLoggingOut ? 'animate-pulse' : ''
              }`}
              aria-label="Logout"
            >
              <LogOut className="mr-2" size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<HackingCategories />} />
          </Routes>
        </main>

        <footer className="mt-8 text-center text-sm">
          <p>Disclaimer: This platform is for educational purposes only. Engage in ethical hacking and always obtain proper authorization.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App