import axios from "axios";

const requestClient = axios.create({
    baseURL: "http://localhost:5000/api",  // Adjust base URL based on your API configuration
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default requestClient;  // Ensure you're using default export
