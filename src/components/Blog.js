import React, {useState} from 'react'

const Blog = ({ blog, handleLikeClicked, deleteClicked}) => {
  const [expanded, setExpanded] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const shortForm = () => (
    <div>
      {blog.title} {blog.author}
      <button onClick={(event) => setExpanded(true)}>view</button>
    </div>
  )

  const longForm = () =>
    <div>
      {blog.title}
      <button onClick={(event) => setExpanded(false)}>hide</button>
      <br/>
      {blog.url}<br/>
      {blog.likes}
      <button onClick={(event) => handleLikeClicked(blog)}>like</button>
      <br/>
      {blog.user.name} <br/>
      <button onClick={(event) => deleteClicked(blog)}>delete</button>
    </div>

  return (
    <div style={blogStyle}>
      {expanded && longForm()}
      {!expanded && shortForm()}
    </div>
  )
}

export default Blog
