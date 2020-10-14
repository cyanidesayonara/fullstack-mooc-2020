import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LoginInfo from './components/LoginInfo'
import Togglable from './components/Togglable'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const showMessage = (message, error) => {
    setNotification(message)
    setError(error)

    setTimeout(() => {
      setNotification(null)
      setError(null)
    }, 5000)
  }

  const login = credentials => {
    loginService
      .login(credentials)
      .then(loggedInUser => {
        window.localStorage.setItem(
          'loggedInUser', JSON.stringify(loggedInUser)
        )
        blogService.setToken(loggedInUser.token)
        setUser(loggedInUser)
        showMessage('logged in')
      })
      .catch(() => showMessage('wrong username or password', true))
  }

  const createBlog = async blog => {
    blogFormRef.current.toggleVisibility()
    await blogService
      .create(blog)
      .then(createdBlog => setBlogs(blogs.concat(createdBlog)))
    showMessage('a new blog '.concat(blog.title).concat(' by ').concat(blog.author).concat(' added'))
  }

  const removeBlog = blog => {
    window.confirm('Remove blog '.concat(blog.title).concat(' by ').concat(blog.author))
    blogService
      .remove(blog.id)
      .then(() => setBlogs(blogs.filter(b => b.id !== blog.id)))
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    showMessage('logged out')
  }

  const likeBlog = (id, blog) => {
    blogService
      .update(id, blog)
      .then(updatedBlog => setBlogs(blogs.map(blog => {return blog.id === id ? updatedBlog : blog})))
  }

  const sortedBlogs = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} error={error} />
      {user === null
        ? <LoginForm login={login} />
        : <>
          <LoginInfo user={user} logout={logout} />
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <Blogs blogs={sortedBlogs} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
        </>
      }
    </div>
  )
}

export default App
