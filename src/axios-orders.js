import axios from 'axios';

const orderInstance = axios.create({
    baseURL: 'https://react-zhe-burger.firebaseio.com'
});

export default orderInstance;