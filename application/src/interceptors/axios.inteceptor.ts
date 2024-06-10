import axios, { AxiosRequestConfig } from 'axios';

export const AxiosInterceptor = () => {
    const updateHeader = (request: AxiosRequestConfig) => {

        const token = window.localStorage.getItem('TOKEN');
        const newHeader = {
            Authorization: token,
            'Content-Type': request.url?.includes('upload')
                ? 'multipart/form-data'
                : 'application/json',
        }
        request.headers = newHeader;
        return request;
    }

    //@ts-ignore
    axios.interceptors.request.use((req) => {
        const request = updateHeader(req)
        // console.log(request);
        return request;
    })

    axios.interceptors.response.use(
        (response) => {
            // console.log(response);
            return response;
        },
        (error) => {
            // console.log(error);
            
            return error;
        }

    )
}