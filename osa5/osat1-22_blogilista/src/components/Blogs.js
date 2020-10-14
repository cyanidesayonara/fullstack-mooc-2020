import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, likeBlog, removeBlog, user }) => {
  return (
    blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />)
  )
}

export default Blogs
