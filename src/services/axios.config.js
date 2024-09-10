import axios from "axios";

const URL = 'https://66dfa4222fb67ac16f26c6d7.mockapi.io/api/stockProducts'

export const axiosInstance = axios.create({
    baseURL: URL
})