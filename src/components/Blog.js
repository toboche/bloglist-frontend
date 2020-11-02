import React, {useState} from 'react'
const Blog = ({ blog }) => {
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
      {blog.likes}<br/>
      {blog.user}
    </div>

  return (
    <div style={blogStyle}>
      {expanded && longForm()}
      {!expanded && shortForm()}
    </div>
  )
}

export default Blog
