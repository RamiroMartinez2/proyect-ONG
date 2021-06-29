import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'http://ongapi.alkemy.org/api'
});

export default clientAxios;