import React, { useState, useEffect } from 'react'
import { User, Mail, Key, Briefcase, MapPin, Calendar, Twitter, Linkedin, Github, Edit2 } from 'lucide-react'

interface UserProfile {
  username: string
  email: string
  fullName: string
  bio: string
  avatar: string
  location: string
  occupation: string
  joinDate: string
  twitterHandle: string
  linkedinUrl: string
  githubUsername: string
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    username: 'CyberPh4nt0m',
    email: 'cyberph4nt0m@example.com',
    fullName: 'Alice Wonderland',
    bio: 'Ethical hacker and cybersecurity enthusiast. Always learning, always hacking (ethically, of course!).',
    avatar: 'https://i.pravatar.cc/300',
    location: 'Cyberspace',
    occupation: 'Security Researcher',
    joinDate: '2023-01-15',
    twitterHandle: 'cyberph4nt0m',
    linkedinUrl: 'alice-wonderland',
    githubUsername: 'cyberph4nt0m'
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile)
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 bg-gray-700 p-4">
          <div className="text-center">
            <img
              className="h-32 w-32 rounded-full mx-auto mb-4 border-4 border-green-500"
              src={profile.avatar}
              alt={profile.username}
            />
            <h2 className="text-2xl font-semibold text-white">{profile.fullName}</h2>
            <p className="text-green-500">@{profile.username}</p>
          </div>
          <div className="mt-4 text-gray-300">
            <p className="flex items-center mb-2"><MapPin size={18} className="mr-2" /> {profile.location}</p>
            <p className="flex items-center mb-2"><Briefcase size={18} className="mr-2" /> {profile.occupation}</p>
            <p className="flex items-center mb-2"><Calendar size={18} className="mr-2" /> Joined {new Date(profile.joinDate).toLocaleDateString()}</p>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <a href={`https://twitter.com/${profile.twitterHandle}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              <Twitter size={24} />
            </a>
            <a href={`https://linkedin.com/in/${profile.linkedinUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
              <Linkedin size={24} />
            </a>
            <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
              <Github size={24} />
            </a>
          </div>
        </div>
        <div className="md:w-2/3 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Profile Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <Edit2 size={18} className="mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bio" className="block text-gray-300 mb-2">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="occupation" className="block text-gray-300 mb-2">Occupation</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={profile.occupation}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-green-500"
                />
              </div>
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Save Changes
              </button>
            </form>
          ) : (
            <div>
              <p className="text-gray-300 mb-4">{profile.bio}</p>
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-white mb-2">Contact Information</h4>
                <p className="text-gray-300 flex items-center mb-2">
                  <Mail size={18} className="mr-2" /> {profile.email}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Skills</h4>
                <div className="flex flex-wrap">
                  {['Penetration Testing', 'Network Security', 'Cryptography', 'Malware Analysis'].map((skill, index) => (
                    <span key={index} className="bg-gray-700 text-green-400 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile