import axios, { AxiosInstance } from 'axios';

export const BACKEND_URL = `http://localhost:81/api`;
export const REQUEST_TIMEOUT = 5000000;

export const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });

    return api;
}