import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = event => {
    event.preventDefault()
    blog.likes = blog.likes + 1
    likeBlog(blog.id, blog)
  }

  const remove = event => {
    event.preventDefault()
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} &nbsp;
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </p>
      { visible === true &&
      <div>
        <p>{blog.url}</p>
        <p>likes {blog.likes} &nbsp;
          <button onClick={like}>like</button>
        </p>
        { user.id === blog.user &&
          <>
            <p>{user.name}</p>
            <button onClick={remove}>remove</button>
          </>
        }
      </div>
      }
    </div>
  )
}

export default Blog
