import { create } from "axios";

const axiosInstance = create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});
export default axiosInstance;