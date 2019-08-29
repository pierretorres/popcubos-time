import axios from 'axios';

const api = axios.create({ baseURL: 'https://api.themoviedb.org/3/movie/popular?api_key=b160d520a251ec089deab6fdc48006f2&language=pt-br&page=1'}); 

export default api;