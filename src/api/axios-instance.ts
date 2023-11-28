import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.warn(error)
        throw error
    }
)

export default instance