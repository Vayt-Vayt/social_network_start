import axios from 'axios'

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {"API-KEY": "162c7a6e-c8a1-4f32-8ca0-d2e8f0db39a3"}
}) 

export const userAPI = {
    getUsers: (currentPage=1, pageSize=5) => instance.get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data)
}

export const profileAPI = {
    getProfileId: (userId) => instance.get(`profile/${userId}`)
        .then(response => response.data),
    getStatusId: (userId) => instance.get(`profile/status/${userId}`)
        .then(response => response.data),
    setStatus: (status) => instance.put(` /profile/status`, {status: status})
}

export const authAPI = {
    getAuthMe: () => instance.get(`auth/me`),
    setAuth: (email, password, rememberMe, captcha) => {
        console.log(email, password, rememberMe, captcha);
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
        .then(response => response.data)},
    getCaptcha: () => instance.get(`security/get-captcha-url`)
    .then(response => response.data.url),
    deletAuth: () => instance.delete(`auth/login`).then(response => response.data)
}