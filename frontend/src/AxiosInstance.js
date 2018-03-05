import axios from "axios";

export default axios.create({
    //For local development
    // baseURL: 'http://localhost:8080/',
    //For AWS:
    baseURL: '/',
});