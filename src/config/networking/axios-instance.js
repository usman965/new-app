import axios from 'axios';

class AxiosInstance {
    constructor(baseURL) {
        this.api = axios.create({ baseURL });
    }

    async get(endpoint) {
        try {
            const response = await this.api.get(endpoint);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}


const httpRequest = new AxiosInstance("https://newsapi.org/v2")

export default httpRequest;