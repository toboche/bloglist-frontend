import React, {useState} from 'react'

const NewBlogForm = ({createBlog}) => {
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
                    onChange={({ target }) => setBlogName(target.value)} />
            </div>
            <div>
                blog author
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
                  blog url
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type="submit">save</button>
        </form>
    )
}

export default NewBlogForm