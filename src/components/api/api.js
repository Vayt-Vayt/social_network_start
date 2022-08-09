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