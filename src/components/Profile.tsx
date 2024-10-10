import React, { useState } from 'react'
import { User, Mail, Briefcase, MapPin, Calendar, Twitter, Linkedin, Github, Edit2, Printer, Eye, EyeOff, Book, Award } from 'lucide-react'

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
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
}

interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  institution: string
  degree: string
  field: string
  graduationYear: string
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
    githubUsername: 'cyberph4nt0m',
    workExperience: [
      {
        company: 'CyberGuard Solutions',
        position: 'Senior Security Analyst',
        startDate: '2021-03',
        endDate: 'Present',
        description: 'Lead penetration testing team, conduct security audits, and develop security policies.'
      },
      {
        company: 'SecureNet Inc.',
        position: 'Network Security Specialist',
        startDate: '2018-06',
        endDate: '2021-02',
        description: 'Implemented and maintained firewall systems, conducted vulnerability assessments, and responded to security incidents.'
      }
    ],
    education: [
      {
        institution: 'Cyber University',
        degree: 'Master of Science',
        field: 'Cybersecurity',
        graduationYear: '2018'
      },
      {
        institution: 'Tech Institute',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationYear: '2016'
      }
    ],
    skills: ['Penetration Testing', 'Network Security', 'Cryptography', 'Malware Analysis', 'Incident Response', 'Python', 'C++', 'Wireshark', 'Metasploit']
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isResumeView, setIsResumeView] = useState(false)

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

  const printResume = () => {
    window.print()
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden print:shadow-none print:bg-white print:text-black">
      <div className="md:flex">
        <div className="md:w-1/3 bg-gray-700 p-4 print:bg-white print:text-black">
          <div className="text-center">
            <img
              className="h-24 w-24 md:h-32 md:w-32 rounded-full mx-auto mb-4 border-4 border-green-500 print:border-gray-300"
              src={profile.avatar}
              alt={profile.username}
            />
            <h2 className="text-xl md:text-2xl font-semibold text-white print:text-black">{profile.fullName}</h2>
            <p className="text-green-500 text-sm md:text-base print:text-gray-600">@{profile.username}</p>
          </div>
          <div className="mt-4 text-gray-300 text-sm md:text-base print:text-gray-700">
            <p className="flex items-center mb-2"><MapPin size={16} className="mr-2" /> {profile.location}</p>
            <p className="flex items-center mb-2"><Briefcase size={16} className="mr-2" /> {profile.occupation}</p>
            <p className="flex items-center mb-2"><Calendar size={16} className="mr-2" /> Joined {new Date(profile.joinDate).toLocaleDateString()}</p>
          </div>
          <div className="mt-4 flex justify-center space-x-4 print:hidden">
            <a href={`https://twitter.com/${profile.twitterHandle}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              <Twitter size={20} />
            </a>
            <a href={`https://linkedin.com/in/${profile.linkedinUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
              <Linkedin size={20} />
            </a>
            <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
              <Github size={20} />
            </a>
          </div>
        </div>
        <div className="md:w-2/3 p-4">
          <div className="flex justify-between items-center mb-4 print:hidden">
            <h3 className="text-lg md:text-xl font-semibold text-white">{isResumeView ? 'Professional Resume' : 'Profile Information'}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsResumeView(!isResumeView)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded flex items-center text-sm"
                aria-label={isResumeView ? "View Profile" : "View Resume"}
              >
                {isResumeView ? <Eye size={16} className="mr-1 md:mr-2" /> : <EyeOff size={16} className="mr-1 md:mr-2" />}
                {isResumeView ? 'Profile' : 'Resume'}
              </button>
              {isResumeView && (
                <button onClick={printResume} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded flex items-center text-sm">
                  <Printer size={16} className="mr-1 md:mr-2" /> Print
                </button>
              )}
              {!isResumeView && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded flex items-center text-sm"
                >
                  <Edit2 size={16} className="mr-1 md:mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              )}
            </div>
          </div>
          <div id="resume-content">
            {isResumeView ? (
              <div className="space-y-6">
                <section>
                  <h4 className="text-lg font-semibold text-white mb-2 print:text-black">Professional Summary</h4>
                  <p className="text-gray-300 text-sm md:text-base print:text-gray-700">{profile.bio}</p>
                </section>
                <section>
                  <h4 className="text-lg font-semibold text-white mb-2 print:text-black flex items-center">
                    <Briefcase size={20} className="mr-2" /> Work Experience
                  </h4>
                  {profile.workExperience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h5 className="text-green-400 font-semibold print:text-green-700">{exp.position}</h5>
                      <p className="text-gray-400 print:text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                      <p className="text-gray-300 text-sm print:text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </section>
                <section>
                  <h4 className="text-lg font-semibold text-white mb-2 print:text-black flex items-center">
                    <Book size={20} className="mr-2" /> Education
                  </h4>
                  {profile.education.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <h5 className="text-green-400 font-semibold print:text-green-700">{edu.degree} in {edu.field}</h5>
                      <p className="text-gray-400 print:text-gray-600">{edu.institution} | Graduated: {edu.graduationYear}</p>
                    </div>
                  ))}
                </section>
                <section>
                  <h4 className="text-lg font-semibold text-white mb-2 print:text-black flex items-center">
                    <Award size={20} className="mr-2" /> Skills
                  </h4>
                  <div className="flex flex-wrap">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-700 text-green-400 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 print:bg-gray-200 print:text-green-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            ) : isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-gray-300 mb-1 text-sm">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-1 text-sm">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-gray-300 mb-1 text-sm">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="location" className="block text-gray-300 mb-1 text-sm">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="occupation" className="block text-gray-300 mb-1 text-sm">Occupation</label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={profile.occupation}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-sm">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-300 text-sm md:text-base">{profile.bio}</p>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2">Contact Information</h4>
                  <p className="text-gray-300 flex items-center mb-2 text-sm md:text-base">
                    <Mail size={16} className="mr-2" /> {profile.email}
                  </p>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2">Skills</h4>
                  <div className="flex flex-wrap">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-700 text-green-400 rounded-full px-2 py-1 text-xs md:text-sm font-semibold mr-2 mb-2">
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
    </div>
  )
}

export default Profile