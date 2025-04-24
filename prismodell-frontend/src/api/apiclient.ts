import axios, { AxiosResponse } from 'axios';

// Create an instance of axios with some default configuration
const apiClient = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Define a generic API function
export const apiRequest = async <T>(url: string, method: 'GET', data?: any): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient({
        method,
        url,
        data,
    });

    return response.data;
};