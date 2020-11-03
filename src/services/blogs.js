import axios from 'axios'
const baseUrl = '/api/blogs'
let user = null

const setUser = (newUser) =>{
  user = newUser
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNew = async (blog) => {
  const config = {
    headers: {'Authorization': `Bearer ${user.token}`}
  }
  const response = axios
    .post(baseUrl, blog, config)
  return response.data
}

const deleteOne = async (blog) => {
  const config = {
    headers: {'Authorization': `Bearer ${user.token}`}
  }
  const response = axios
    .delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const putExisting = async (blog) =>{
  const config = {
    headers: {'Authorization': `Bearer ${user.token}`}
  }
  const blogToSend = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  const response = await axios
    .put(`${baseUrl}/${blog.id}`, blogToSend, config)
  return response.data
}

export default { 
  getAll, 
  setUser, 
  postNew, 
  putExisting,
  deleteOne
}