import axios from 'axios'
import store from '../redux/store'
import { TOKEN_REFRESH_SUCCESS } from '../redux/actionTypes'
import { history } from './history'

const refreshTokenAction = (error) => {
    const originalRequest = error.config
    const { dispatch } = store

    if (error.response.status === 401 && originalRequest.url ===
        'http://localhost:4000/authentication/refresh') {
        history.push('/login')
        return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = localStorage.getItem('refreshToken')

        return axios
            .post('/authentication/refresh', { refreshToken })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    const newAccessToken = res.data.data
                    dispatch({
                        type: TOKEN_REFRESH_SUCCESS,
                        payload: newAccessToken
                    })

                    // Update the original request with the new token and execute it again
                    originalRequest.headers['authorization'] = newAccessToken
                    return axios(originalRequest)
                }
            })
    }
    return Promise.reject(error)
}

const instance = axios.create({})

instance.interceptors.response.use(
    (response) => { return response },
    refreshTokenAction
)

export default instance