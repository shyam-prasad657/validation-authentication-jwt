import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
    baseURL : 'http://localhost:3500', //backend port
    withCredentials : true, //needed for cookies
});

let isRefreshing = false;

axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');

    if(token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() /1000;

        //If token is about to expire in next 1 min
        if(decoded.exp - currentTime < 60 && !isRefreshing) {
            isRefreshing = true;

            try {
                const res = await axios.get('/refresh-token');
                const newAccessToken = res.data.accessToken;
                localStorage.setItem('token', newAccessToken);
                config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            } catch(err) {
                alert('Access Token Expired');
                localStorage.clear(); // optional: clear token and expiry 
                console.error('Refresh failed', err);
            } finally {
                isRefreshing = false;
            }
        } else {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosInstance;