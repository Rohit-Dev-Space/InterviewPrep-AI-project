import axios from 'axios'

const axiosinstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 80000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },

})

axiosinstance.interceptors.request.use((config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}), (error) => {
    return Promise.reject(error)
})

axiosinstance.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        console.log('Unauthorized! Redirecting to login...')
        window.location.href = '/login'
    } else if (error.response && error.response.status === 500) {
        console.log('Server Error! Please try again later.')
    } else if (error.code === 'ECONNABORTED') {
        console.log('Request timed out! Please try again.')
    }
    return Promise.reject(error)
})

export default axiosinstance