import axios from "axios";

const instance = axios.create({
    baseURL: 'https://ani-night.online',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;