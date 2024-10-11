import React, { useState, useEffect } from 'react'
import { MessageSquare, Plus, ThumbsUp, ThumbsDown, Flag, Search, Filter } from 'lucide-react'
import { sql } from '@vercel/postgres'

interface Post {
  id: number
  title: string
  author: string
  content: string
  replies: Reply[]
  tags: string[]
  votes: number
  created_at: Date
}

interface Reply {
  id: number
  author: string
  content: string
  votes: number
  created_at: Date
}

interface ForumProps {
  currentUser: { id: number; username: string } | null
}

const Forum: React.FC<ForumProps> = ({ currentUser }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' })
  const [replyContent, setReplyContent] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const result = await sql`
        SELECT p.id, p.title, p.content, p.author, p.created_at, p.votes,
               array_agg(DISTINCT t.tag) as tags,
               json_agg(json_build_object(
                 'id', r.id,
                 'author', r.author,
                 'content', r.content,
                 'votes', r.votes,
                 'created_at', r.created_at
               ) ORDER BY r.created_at DESC) as replies
        FROM posts p
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        LEFT JOIN replies r ON p.id = r.post_id
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `
      setPosts(result.rows)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return
    if (newPost.title && newPost.content) {
      try {
        const result = await sql`
          INSERT INTO posts (title, content, author)
          VALUES (${newPost.title}, ${newPost.content}, ${currentUser.username})
          RETURNING id, title, content, author, created_at, votes
        `
        const newPostId = result.rows[0].id
        const tags = newPost.tags.split(',').map(tag => tag.trim())
        for (const tag of tags) {
          await sql`
            WITH tag_insert AS (
              INSERT INTO tags (tag) VALUES (${tag})
              ON CONFLICT (tag) DO UPDATE SET tag = EXCLUDED.tag
              RETURNING id
            )
            INSERT INTO post_tags (post_id, tag_id)
            SELECT ${newPostId}, id FROM tag_insert
          `
        }
        await fetchPosts()
        setNewPost({ title: '', content: '', tags: '' })
      } catch (error) {
        console.error('Error creating new post:', error)
      }
    }
  }

  const handleNewReply = async (postId: number) => {
    if (!currentUser) return
    if (replyContent) {
      try {
        await sql`
          INSERT INTO replies (post_id, author, content)
          VALUES (${postId}, ${currentUser.username}, ${replyContent})
        `
        await fetchPosts()
        setReplyContent('')
      } catch (error) {
        console.error('Error creating new reply:', error)
      }
    }
  }

  const handleVote = async (postId: number, value: number) => {
    if (!currentUser) return
    try {
      await sql`
        UPDATE posts
        SET votes = votes + ${value}
        WHERE id = ${postId}
      `
      await fetchPosts()
    } catch (error) {
      console.error('Error updating post vote:', error)
    }
  }

  const handleReplyVote = async (replyId: number, value: number) => {
    if (!currentUser) return
    try {
      await sql`
        UPDATE replies
        SET votes = votes + ${value}
        WHERE id = ${replyId}
      `
      await fetchPosts()
    } catch (error) {
      console.error('Error updating reply vote:', error)
    }
  }

  const filteredPosts = posts
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(post => selectedTag ? post.tags.includes(selectedTag) : true)

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    if (sortBy === 'mostVoted') return b.votes - a.votes
    return 0
  })

  return (
    <div className="cyberpunk-card p-4 rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
        <MessageSquare className="mr-2" /> Hacker Forum
      </h2>

      <div className="mb-4 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-2 md:mb-0 md:mr-2 flex items-center">
          <Search className="mr-2" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-gray-800 text-green-500 border border-green-500 rounded"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center">
          <Filter className="mr-2" />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-1/2 mr-2 p-2 bg-gray-800 text-green-500 border border-green-500 rounded"
          >
            <option value="">All Tags</option>
            {Array.from(new Set(posts.flatMap(post => post.tags))).map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-1/2 p-2 bg-gray-800 text-green-500 border border-green-500 rounded"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="mostVoted">Most Voted</option>
          </select>
        </div>
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
          <h3 className="text-lg md:text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-xs md:text-sm mb-2">Posted by: {post.author} | {new Date(post.created_at).toLocaleString()}</p>
          <p className="mb-4 text-sm md:text-base">{post.content}</p>
          <div className="flex flex-wrap mb-2">
            {post.tags.map(tag => (
              <span key={tag} className="mr-2 mb-2 px-2 py-1 bg-blue-600 text-white rounded-full text-xs md:text-sm">{tag}</span>
            ))}
          </div>
          <div className="flex items-center mb-4">
            <button onClick={() => handleVote(post.id, 1)} className="mr-2 text-green-500 hover:text-green-400">
              <ThumbsUp size={16} />
            </button>
            <span className="mr-2 text-sm">{post.votes}</span>
            <button onClick={() => handleVote(post.id, -1)} className="mr-4 text-red-500 hover:text-red-400">
              <ThumbsDown size={16} />
            </button>
            <button className="text-yellow-500 hover:text-yellow-400">
              <Flag size={16} />
            </button>
          </div>
          
          <h4 className="font-bold mb-2 text-sm md:text-base">Replies:</h4>
          {post.replies.map((reply) => (
            <div key={reply.id} className="ml-4 mb-2 p-2 bg-gray-700 rounded">
              <p className="text-xs mb-1">Reply by: {reply.author} | {new Date(reply.created_at).toLocaleString()}</p>
              <p className="mb-2 text-sm">{reply.content}</p>
              <div className="flex items-center">
                <button onClick={() => handleReplyVote(reply.id, 1)} className="mr-2 text-green-500 hover:text-green-400">
                  <ThumbsUp size={12} />
                </button>
                <span className="mr-2 text-xs">{reply.votes}</span>
                <button onClick={() => handleReplyVote(reply.id, -1)} className="mr-4 text-red-500 hover:text-red-400">
                  <ThumbsDown size={12} />
                </button>
                <button className="text-yellow-500 hover:text-yellow-400">
                  <Flag size={12} />
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
            <button onClick={() => handleNewReply(post.id)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 text-sm">
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Forum