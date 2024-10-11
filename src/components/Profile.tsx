import React, { useState, useEffect } from 'react'
import { User, Mail, Briefcase, MapPin, Calendar, Twitter, Linkedin, Github, Edit2, Printer, Eye, EyeOff, Book, Award, Plus, Trash2 } from 'lucide-react'
import { sql } from '@vercel/postgres'

interface UserProfile {
  id: number
  username: string
  email: string
  full_name: string
  bio: string
  avatar: string
  location: string
  occupation: string
  join_date: string
  twitter_handle: string
  linkedin_url: string
  github_username: string
  work_experience: WorkExperience[]
  education: Education[]
  skills: string[]
}

interface WorkExperience {
  id: string
  company: string
  position: string
  start_date: string
  end_date: string
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduation_year: string
}

interface ProfileProps {
  currentUser: { id: number; username: string } | null
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isResumeView, setIsResumeView] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [userPosts, setUserPosts] = useState<{ id: number; title: string; created_at: string }[]>([])

  useEffect(() => {
    if (currentUser) {
      fetchProfile()
      fetchUserPosts()
    }
  }, [currentUser])

  const fetchProfile = async () => {
    if (!currentUser) return
    try {
      const result = await sql`
        SELECT * FROM user_profiles WHERE id = ${currentUser.id}
      `
      if (result.rows.length > 0) {
        const userProfile = result.rows[0]
        setProfile({
          ...userProfile,
          work_experience: JSON.parse(userProfile.work_experience || '[]'),
          education: JSON.parse(userProfile.education || '[]'),
          skills: JSON.parse(userProfile.skills || '[]')
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const fetchUserPosts = async () => {
    if (!currentUser) return
    try {
      const result = await sql`
        SELECT id, title, created_at
        FROM posts
        WHERE author = ${currentUser.username}
        ORDER BY created_at DESC
        LIMIT 5
      `
      setUserPosts(result.rows)
    } catch (error) {
      console.error('Error fetching user posts:', error)
    }
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (!profile) return
    const updatedProfile = { ...profile, [name]: value }
    setProfile(updatedProfile)
    try {
      await sql`
        UPDATE user_profiles
        SET ${sql(name)} = ${value}
        WHERE id = ${currentUser?.id}
      `
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    setEditingSection(null)
    if (!profile || !currentUser) return
    try {
      await sql`
        UPDATE user_profiles
        SET
          full_name = ${profile.full_name},
          bio = ${profile.bio},
          location = ${profile.location},
          occupation = ${profile.occupation},
          twitter_handle = ${profile.twitter_handle},
          linkedin_url = ${profile.linkedin_url},
          github_username = ${profile.github_username},
          work_experience = ${JSON.stringify(profile.work_experience)},
          education = ${JSON.stringify(profile.education)},
          skills = ${JSON.stringify(profile.skills)}
        WHERE id = ${currentUser.id}
      `
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const printResume = () => {
    window.print()
  }

  const handleWorkExperienceChange = (id: string, field: keyof WorkExperience, value: string) => {
    if (!profile) return
    const updatedWorkExperience = profile.work_experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    )
    setProfile({ ...profile, work_experience: updatedWorkExperience })
  }

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    if (!profile) return
    const updatedEducation = profile.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    )
    setProfile({ ...profile, education: updatedEducation })
  }

  const handleSkillChange = (index: number, value: string) => {
    if (!profile) return
    const updatedSkills = [...profile.skills]
    updatedSkills[index] = value
    setProfile({ ...profile, skills: updatedSkills })
  }

  const addWorkExperience = () => {
    if (!profile) return
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      description: ''
    }
    setProfile({ ...profile, work_experience: [...profile.work_experience, newExp] })
  }

  const addEducation = () => {
    if (!profile) return
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduation_year: ''
    }
    setProfile({ ...profile, education: [...profile.education, newEdu] })
  }

  const addSkill = () => {
    if (!profile) return
    setProfile({ ...profile, skills: [...profile.skills, ''] })
  }

  const removeWorkExperience = (id: string) => {
    if (!profile) return
    setProfile({ ...profile, work_experience: profile.work_experience.filter(exp => exp.id !== id) })
  }

  const removeEducation = (id: string) => {
    if (!profile) return
    setProfile({ ...profile, education: profile.education.filter(edu => edu.id !== id) })
  }

  const removeSkill = (index: number) => {
    if (!profile) return
    setProfile({ ...profile, skills: profile.skills.filter((_, i) => i !== index) })
  }

  if (!profile) return <div>Loading...</div>

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
            <h2 className="text-xl md:text-2xl font-semibold text-white print:text-black">{profile.full_name}</h2>
            <p className="text-green-500 text-sm md:text-base print:text-gray-600">@{profile.username}</p>
          </div>
          <div className="mt-4 text-gray-300 text-sm md:text-base print:text-gray-700">
            <p className="flex items-center mb-2"><MapPin size={16} className="mr-2" /> {profile.location}</p>
            <p className="flex items-center mb-2"><Briefcase size={16} className="mr-2" /> {profile.occupation}</p>
            <p className="flex items-center mb-2"><Calendar size={16} className="mr-2" /> Joined {new Date(profile.join_date).toLocaleDateString()}</p>
          </div>
          <div className="mt-4 flex justify-center space-x-4 print:hidden">
            <a href={`https://twitter.com/${profile.twitter_handle}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              <Twitter size={20} />
            </a>
            <a href={`https://linkedin.com/in/${profile.linkedin_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
              <Linkedin size={20} />
            </a>
            <a href={`https://github.com/${profile.github_username}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
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
              <button
                onClick={() => {
                  setIsEditing(!isEditing)
                  setEditingSection(null)
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded flex items-center text-sm"
              >
                <Edit2 size={16} className="mr-1 md:mr-2" />
                {isEditing ? 'Save Changes' : 'Edit Resume'}
              </button>
            </div>
          </div>
          <div id="resume-content">
            {isResumeView ? (
              <div className="space-y-6">
                <section>
                  <h4 className="text-lg font-semibold text-white mb-2 print:text-black">Professional Summary</h4>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 text-sm focus:outline-none focus:border-green-500"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-300 text-sm md:text-base print:text-gray-700">{profile.bio}</p>
                  )}
                </section>
                <section>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold text-white print:text-black flex items-center">
                      <Briefcase size={20} className="mr-2" /> Work Experience
                    </h4>
                    {isEditing && (
                      <button
                        onClick={addWorkExperience}
                        className="text-green-500 hover:text-green-400"
                      >
                        <Plus size={20} />
                      </button>
                    )}
                  </div>
                  {profile.work_experience.map((exp) => (
                    <div key={exp.id} className="mb-4">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => handleWorkExperienceChange(exp.id, 'position', e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Position"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleWorkExperienceChange(exp.id, 'company', e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Company"
                          />
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={exp.start_date}
                              onChange={(e) => handleWorkExperienceChange(exp.id, 'start_date', e.target.value)}
                              className="w-1/2 bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                              placeholder="Start Date"
                            />
                            <input
                              type="text"
                              value={exp.end_date}
                              onChange={(e) => handleWorkExperienceChange(exp.id, 'end_date', e.target.value)}
                              className="w-1/2 bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                              placeholder="End Date"
                            />
                          </div>
                          <textarea
                            value={exp.description}
                            onChange={(e) => handleWorkExperienceChange(exp.id, 'description', e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                            rows={3}
                            placeholder="Description"
                          />
                          <button
                            onClick={() => removeWorkExperience(exp.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <h5 className="text-green-400 font-semibold print:text-green-700">{exp.position}</h5>
                          <p className="text-gray-400 print:text-gray-600">{exp.company} | {exp.start_date} - {exp.end_date}</p>
                          <p className="text-gray-300 text-sm print:text-gray-700">{exp.description}</p>
                        </>
                      )}
                    </div>
                  ))}
                </section>
                <section>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold text-white print:text-black flex items-center">
                      <Book size={20} className="mr-2" /> Education
                    </h4>
                    {isEditing && (
                      <button
                        onClick={addEducation}
                        className="text-green-500 hover:text-green-400"
                      >
                        <Plus size={20} />
                      </button>
                    )}
                  </div>
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Degree"
                          />
                          <input
                            type="text"
                            value={edu.field}
                            onChange={(e) => handleEducationChange(edu.id, 'field', e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Field of Study"
                          />
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Institution"
                          />
                          <input
                            type="text"
                            value={edu.graduation_year}
                            onChange={(e) => handleEducationChange(edu.id, 'graduation_year', e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Graduation Year"
                          />
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <h5 className="text-green-400 font-semibold print:text-green-700">{edu.degree} in {edu.field}</h5>
                          <p className="text-gray-400 print:text-gray-600">{edu.institution} | Graduated: {edu.graduation_year}</p>
                        </>
                      )}
                    </div>
                  ))}
                </section>
                <section>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold text-white print:text-black flex items-center">
                      <Award size={20} className="mr-2" /> Skills
                    </h4>
                    {isEditing && (
                      <button
                        onClick={addSkill}
                        className="text-green-500 hover:text-green-400"
                      >
                        <Plus size={20} />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap">
                    {profile.skills.map((skill, index) => (
                      <div key={index} className="mr-2 mb-2">
                        {isEditing ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) => handleSkillChange(index, e.target.value)}
                              className="bg-gray-700 text-green-400 rounded-l px-2 py-1 text-sm font-semibold focus:outline-none focus:border-green-500"
                            />
                            <button
                              onClick={() => removeSkill(index)}
                              className="bg-red-600 text-white rounded-r px-2 py-1 text-sm font-semibold"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ) : (
                          <span className="bg-gray-700 text-green-400 rounded-full px-3 py-1 text-sm font-semibold print:bg-gray-200 print:text-green-700">
                            {skill}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
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
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2">Recent Posts</h4>
                  <ul className="list-disc list-inside text-gray-300 text-sm md:text-base">
                    {userPosts.map(post => (
                      <li key={post.id}>
                        {post.title} - {new Date(post.created_at).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
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