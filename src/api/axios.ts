import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const fetchData = async (urls: string[], method: HttpMethod, config?: AxiosRequestConfig) => {
  try {
    const requests = urls.map(async (url) => await api[method](url, config));
    const responses = await Promise.all(requests);
    return responses.map(({ data }) => data);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const fetchSingle = async (url: string, method: HttpMethod, data?: any, config?: AxiosRequestConfig) => {
  try {
    let request = api[method](url);

    if (method === 'post') {
      request = api[method](url, data)
    }

    const { data: response } = await request;
    return response;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const fetchPost = async (url: string, method: HttpMethod, data: any) => {
  try {
    const { data: response } = await api[method](url, data)

    return response;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
