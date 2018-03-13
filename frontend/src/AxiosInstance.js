import axios from "axios";

export default axios.create({
    //For local development
     baseURL: 'http://localhost:8080/api/v1/',
    //For AWS:
    //baseURL: '/api/v1/',
});