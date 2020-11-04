import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {
    const [blogName, setBlogName] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const newBlog = {
        title: blogName,
        author: author,
        url: url
      }
    const handleClick = (event) => {
        event.preventDefault()
        setBlogName('')
        setAuthor('')
        setUrl('')
        createBlog(newBlog)
    }

    return (
        <form onSubmit={handleClick}>
            <div>
                blog name
                <input
                    type="text"
                    value={blogName}
                    name="BlogName"
                    onChange={({ target }) => setBlogName(target.value)}
                    id='blogname' />
            </div>
            <div>
                blog author
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                    id='author' />
            </div>
            <div>
                  blog url
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                    id='url' />
            </div>
            <button type="submit">save</button>
        </form>
    )
}

NewBlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default NewBlogForm