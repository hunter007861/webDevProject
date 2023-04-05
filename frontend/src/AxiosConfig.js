import axios from "axios";

const baseURL = "http://localhost:5000";

const Axios = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": 'application/json',
    }
})

export { Axios, baseURL}
