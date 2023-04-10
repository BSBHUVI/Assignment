import axios from 'axios'
const instance =axios.create({
    baseURL:"https://localhost:7105"
})
export default instance