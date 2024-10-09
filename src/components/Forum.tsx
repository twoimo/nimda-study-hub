import React, { useState, useEffect } from 'react'
import { MessageSquare, Plus, ThumbsUp, ThumbsDown, Flag, Search, Filter } from 'lucide-react'

interface Post {
  id: number
  title: string
  author: string
  content: string
  replies: Reply[]
  tags: string[]
  votes: number
  createdAt: Date
}

interface Reply {
  id: number
  author: string
  content: string
  votes: number
  createdAt: Date
}

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' })
  const [replyContent, setReplyContent] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    // Simulating fetching posts from an API
    const fetchedPosts: Post[] = [
      {
        id: 1,
        title: "New SQL Injection Technique",
        author: "CyberPh4nt0m",
        content: "I've discovered a new SQL injection technique that bypasses WAFs...",
        replies: [
          { id: 1, author: "Sh4d0wW4lk3r", content: "Interesting! Can you share more details?", votes: 5, createdAt: new Date(2023, 5, 15) },
          { id: 2, author: "N3onN1nj4", content: "Have you tested this on different database systems?", votes: 3, createdAt: new Date(2023, 5, 16) }
        ],
        tags: ["sql-injection", "waf-bypass"],
        votes: 15,
        createdAt: new Date(2023, 5, 14)
      },
      {
        id: 2,
        title: "Zero-Day Exploit Discovery",
        author: "Sh4d0wW4lk3r",
        content: "Just found a zero-day in a popular CMS. Here's how to responsibly disclose...",
        replies: [
          { id: 3, author: "CyberPh4nt0m", content: "Great find! Have you contacted the vendor yet?", votes: 7, createdAt: new Date(2023, 5, 18) }
        ],
        tags: ["zero-day", "responsible-disclosure"],
        votes: 22,
        createdAt: new Date(2023, 5, 17)
      },
      {
        id: 3,
        title: "Advanced Phishing Strategies",
        author: "N3onN1nj4",
        content: "Let's discuss some advanced phishing techniques and how to defend against them...",
        replies: [],
        tags: ["phishing", "social-engineering"],
        votes: 8,
        createdAt: new Date(2023, 5, 19)
      },
    ]
    setPosts(fetchedPosts)
  }, [])

  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.title && newPost.content) {
      const newPostObj: Post = {
        id: posts.length + 1,
        title: newPost.title,
        author: "CurrentUser",
        content: newPost.content,
        replies: [],
        tags: newPost.tags.split(',').map(tag => tag.trim()),
        votes: 0,
        createdAt: new Date()
      }
      setPosts([newPostObj, ...posts])
      setNewPost({ title: '', content: '', tags: '' })
    }
  }

  const handleNewReply = (postId: number) => {
    if (replyContent) {
      const newReply: Reply = {
        id: Math.max(...posts.flatMap(post => post.replies.map(reply => reply.id))) + 1,
        author: "CurrentUser",
        content: replyContent,
        votes: 0,
        createdAt: new Date()
      }
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, replies: [...post.replies, newReply] }
          : post
      ))
      setReplyContent('')
    }
  }

  const handleVote = (postId: number, value: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, votes: post.votes + value } : post
    ))
  }

  const handleReplyVote = (postId: number, replyId: number, value: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        replies: post.replies.map(reply =>
          reply.id === replyId ? { ...reply, votes: reply.votes + value } : reply
        )
      } : post
    ))
  }

  const filteredPosts = posts
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(post => selectedTag ? post.tags.includes(selectedTag) : true)

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'newest') return b.createdAt.getTime() - a.createdAt.getTime()
    if (sortBy === 'oldest') return a.createdAt.getTime() - b.createdAt.getTime()
    if (sortBy === 'mostVoted') return b.votes - a.votes
    return 0
  })

  return (
    <div className="cyberpunk-card p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <MessageSquare className="mr-2" /> Hacker Forum
      </h2>

      <div className="mb-4 flex items-center">
        <Search className="mr-2" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 bg-gray-800 text-green-500 border border-green-500 rounded"
        />
      </div>

      <div className="mb-4 flex items-center">
        <Filter className="mr-2" />
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="mr-4 p-2 bg-gray-800 text-green-500 border border-green-500 rounded"
        >
          <option value="">All Tags</option>
          {Array.from(new Set(posts.flatMap(post => post.tags))).map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 bg-gray-800 text-green-500 border border-green-500 rounded"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostVoted">Most Voted</option>
        </select>
      </div>

      <form onSubmit={handleNewPost} className="mb-8">
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full p-2 mb-2 bg-gray-800 text-green-500 border border-green-500 rounded"
        />
        <textarea
          placeholder="Post Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="w-full p-2 mb-2 bg-gray-800 text-green-500 border border-green-500 rounded"
          rows={4}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={newPost.tags}
          onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
          className="w-full p-2 mb-2 bg-gray-800 text-green-500 border border-green-500 rounded"
        />
        <button type="submit" className="flex items-center bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600">
          <Plus className="mr-2" size={18} />
          Create Post
        </button>
      </form>

      {sortedPosts.map(post => (
        <div key={post.id} className="mb-6 p-4 bg-gray-800 rounded">
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-sm mb-2">Posted by: {post.author} | {post.createdAt.toLocaleString()}</p>
          <p className="mb-4">{post.content}</p>
          <div className="flex flex-wrap mb-2">
            {post.tags.map(tag => (
              <span key={tag} className="mr-2 mb-2 px-2 py-1 bg-blue-600 text-white rounded-full text-sm">{tag}</span>
            ))}
          </div>
          <div className="flex items-center mb-4">
            <button onClick={() => handleVote(post.id, 1)} className="mr-2 text-green-500 hover:text-green-400">
              <ThumbsUp size={18} />
            </button>
            <span className="mr-2">{post.votes}</span>
            <button onClick={() => handleVote(post.id, -1)} className="mr-4 text-red-500 hover:text-red-400">
              <ThumbsDown size={18} />
            </button>
            <button className="text-yellow-500 hover:text-yellow-400">
              <Flag size={18} />
            </button>
          </div>
          
          <h4 className="font-bold mb-2">Replies:</h4>
          {post.replies.map((reply) => (
            <div key={reply.id} className="ml-4 mb-2 p-2 bg-gray-700 rounded">
              <p className="text-sm mb-1">Reply by: {reply.author} | {reply.createdAt.toLocaleString()}</p>
              <p className="mb-2">{reply.content}</p>
              <div className="flex items-center">
                <button onClick={() => handleReplyVote(post.id, reply.id, 1)} className="mr-2 text-green-500 hover:text-green-400">
                  <ThumbsUp size={14} />
                </button>
                <span className="mr-2">{reply.votes}</span>
                <button onClick={() => handleReplyVote(post.id, reply.id, -1)} className="mr-4 text-red-500 hover:text-red-400">
                  <ThumbsDown size={14} />
                </button>
                <button className="text-yellow-500 hover:text-yellow-400">
                  <Flag size={14} />
                </button>
              </div>
            </div>
          ))}
          
          <div className="mt-4">
            <input
              type="text"
              placeholder="Your reply"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full p-2 mb-2 bg-gray-700 text-green-500 border border-green-500 rounded"
            />
            <button onClick={() => handleNewReply(post.id)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Forum