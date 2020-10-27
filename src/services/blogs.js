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

export default { getAll, setUser, postNew }