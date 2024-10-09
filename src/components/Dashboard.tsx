import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Shield, Zap, Users, MessageSquare, BarChart2, PieChart, TrendingUp, AlertTriangle } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

interface HackEvent {
  id: string
  action: string
  target: string
  location: string
  timestamp: number
}

const Dashboard: React.FC = () => {
  const [liveFeed, setLiveFeed] = useState<HackEvent[]>([])
  const [userCount, setUserCount] = useState(0)
  const [discussionCount, setDiscussionCount] = useState(0)
  const [hackSuccessRate, setHackSuccessRate] = useState(0)

  const generateRandomHack = useCallback((): HackEvent => {
    const actions = ['Breached', 'Exploited', 'Hacked', 'Compromised']
    const targets = ['Database', 'Firewall', 'Server', 'Network']
    const locations = ['US', 'EU', 'Asia', 'Unknown']
    return {
      id: Math.random().toString(36).substr(2, 9),
      action: actions[Math.floor(Math.random() * actions.length)],
      target: targets[Math.floor(Math.random() * targets.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: Date.now()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const newHack = generateRandomHack()
      setLiveFeed(prev => [newHack, ...prev.slice(0, 9)])
    }, 3000)

    return () => clearInterval(interval)
  }, [generateRandomHack])

  useEffect(() => {
    // Simulating API calls to fetch data
    setUserCount(Math.floor(Math.random() * 1000) + 500)
    setDiscussionCount(Math.floor(Math.random() * 100) + 50)
    setHackSuccessRate(Math.floor(Math.random() * 40) + 60)
  }, [])

  const pieChartData = useMemo(() => ({
    labels: ['Successful', 'Failed'],
    datasets: [
      {
        data: [hackSuccessRate, 100 - hackSuccessRate],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['#43A047', '#E53935'],
        borderWidth: 1,
      },
    ],
  }), [hackSuccessRate])

  const barChartData = useMemo(() => ({
    labels: ['Network', 'Web', 'Crypto', 'Reverse Eng'],
    datasets: [
      {
        label: 'Hack Attempts',
        data: [65, 59, 80, 81],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }), [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <section className="cyberpunk-card p-4 rounded-lg col-span-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Shield className="mr-2" /> Hacker Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-600 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total Users</p>
              <p className="text-white text-2xl font-bold">{userCount}</p>
            </div>
            <Users size={32} className="text-white" />
          </div>
          <div className="bg-green-600 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Discussions</p>
              <p className="text-white text-2xl font-bold">{discussionCount}</p>
            </div>
            <MessageSquare size={32} className="text-white" />
          </div>
          <div className="bg-yellow-600 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Success Rate</p>
              <p className="text-white text-2xl font-bold">{hackSuccessRate}%</p>
            </div>
            <TrendingUp size={32} className="text-white" />
          </div>
          <div className="bg-red-600 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Active Threats</p>
              <p className="text-white text-2xl font-bold">{Math.floor(Math.random() * 10) + 1}</p>
            </div>
            <AlertTriangle size={32} className="text-white" />
          </div>
        </div>
      </section>

      <section className="cyberpunk-card p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Zap className="mr-2" /> Live Hack Feed
        </h2>
        <div className="live-feed p-2 h-64 overflow-y-auto">
          {liveFeed.map((hack) => (
            <p key={hack.id} className="mb-1 terminal-text">
              [{new Date(hack.timestamp).toLocaleTimeString()}] {hack.action} {hack.target} in {hack.location}
            </p>
          ))}
        </div>
      </section>

      <section className="cyberpunk-card p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <PieChart className="mr-2" /> Hack Success Rate
        </h2>
        <div className="h-64">
          <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </section>

      <section className="cyberpunk-card p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <BarChart2 className="mr-2" /> Hack Attempts by Category
        </h2>
        <div className="h-64">
          <Bar 
            data={barChartData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }} 
          />
        </div>
      </section>

      <section className="cyberpunk-card p-4 rounded-lg col-span-full">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Shield className="mr-2" /> Hacking Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
            <p className="text-lg font-semibold">Network Security</p>
            <p className="text-sm text-gray-400">Explore network vulnerabilities</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
            <p className="text-lg font-semibold">Web Exploitation</p>
            <p className="text-sm text-gray-400">Discover web app weaknesses</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
            <p className="text-lg font-semibold">Cryptography</p>
            <p className="text-sm text-gray-400">Break and make secure systems</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
            <p className="text-lg font-semibold">Reverse Engineering</p>
            <p className="text-sm text-gray-400">Analyze and modify binaries</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard