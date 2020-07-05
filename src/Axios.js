import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://torim-6354f.firebaseio.com/'
});

export default instance;
