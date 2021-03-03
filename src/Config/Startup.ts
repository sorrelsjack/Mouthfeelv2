import axios from 'axios';

export const Startup = () => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
}