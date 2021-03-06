import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  var [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()
  blogs = blogs.sort((a,b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if(storedUser){
      const user = JSON.parse(storedUser)
      setUser(user)
      blogService.setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      setUser(user)
      setPassword('')
      setUsername('')
      blogService.setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (exception){
      console.log(exception)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return <div>
            <h2>login to application</h2>
            <form onSubmit={handleLogin}>
              <div>
                username
                  <input
                  id="username"
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                password
                  <input
                  id="password"
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button id="signin" type="submit">login</button>
            </form>
          </div>
  }

  const handleLikeClicked = async (blog) => {
    const updatedBlog = await blogService.putExisting(blog)
    const updatedBlogs = blogs.map(b => {
      return b.id === updatedBlog.id
      ? updatedBlog
      : b
    }
    )
    setBlogs(
      updatedBlogs
    )
  }

  const deleteClicked = async (blog) => {
    console.log(blog)
    if(!window.confirm(`do you want to delete ${blog.title}?`)){
      return
    }
    await blogService.deleteOne(blog)
    setBlogs(
      blogs.filter(it => it.id !== blog.id)
    )
  }

  const blogsList = () => {
    return <div id="blogitems">
              <h2>blogs</h2>
              {blogs.map(blog =>
                <Blog
                  id="blog"
                  key={blog.id}
                  blog={blog}
                  handleLikeClicked={() => handleLikeClicked(blog)}
                  deleteClicked={() => deleteClicked(blog)}
                />
              )}
            </div>
  }

  const handleNewBlog = async (blog) => {
    try{
      await blogService.postNew(blog)
      await new Promise(r => setTimeout(r, 1000))
      const newBlogs = await blogService.getAll()
      setBlogs( newBlogs )
      setErrorMessage('succes adding a new note')
      blogFormRef.current.toggleVisibility()
      await new Promise(r => setTimeout(r, 4000))
      setErrorMessage(null)
    } catch (xception){
      setErrorMessage('some error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const newBlog = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <NewBlogForm createBlog={handleNewBlog} />
    </Togglable>
  )

  return (
    <div>
      {!user && loginForm()}
      {errorMessage && <div>{errorMessage}</div>}
      {user && <div>{`${user.username} is logged in`}</div>}
      {user && blogsList()}
      {user && <button onClick={() => {
        window.localStorage.removeItem('user')
        setUser(null)
        blogService.setUser(null)
        }}>sign outt</button>}
      {user && newBlog()}
    </div>
  )
}

export default App