import { User } from "../types/user";
import { axiosInstance } from "./axios"

export const registerUser = (formData: FormData): Promise<User> => {
    const body = JSON.stringify(Object.fromEntries(formData));

    return axiosInstance.post('/user/register', body, { headers: { 'Content-Type': 'application/json' } })
        .then(r => r.data)
}

export const loginUser = (formData: FormData): Promise<User> => {
    const body = JSON.stringify(Object.fromEntries(formData));

    return axiosInstance.post('/user/login', body, { headers: { 'Content-Type': 'application/json' } })
        .then(r => r.data)
}