import axios, { AxiosRequestConfig } from 'axios'

import { AppError } from '../utils/AppError'

const api = axios.create({
	baseURL: 'http://localhost:3000'
})

api.interceptors.response.use(resp => resp, error => {
	if (error.response && error.response.data) {
		return Promise.reject(new AppError(error.response.data.message))
	} else {
		return Promise.reject(error)
	}
})

export { api }

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const fetchData = async (urls: string[], method: HttpMethod, config?: AxiosRequestConfig) => {
	try {
		const requests = urls.map(async (url) => await api[method](url, config))
		const responses = await Promise.all(requests)
		return responses.map(({ data }) => data)
	} catch (error) {
		throw new Error(JSON.stringify(error))
	}
}

export const fetchSingle = async (url: string, method: HttpMethod, config?: AxiosRequestConfig) => {
	try {
		const { data: response } = await api[method](url, config)
		return response
	} catch (error) {
		throw new Error(JSON.stringify(error))
	}
}

export const fetchPost = async (url: string, method: HttpMethod, data: any) => {
	try {
		const { data: response } = await api[method](url, data)
		return response
	} catch (error) {
		throw new Error(JSON.stringify(error))
	}
}
