import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-86f41.firebaseio.com/'
});

export default instance;