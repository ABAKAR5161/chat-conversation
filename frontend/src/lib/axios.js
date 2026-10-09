import { create } from "axios";

const axiosInstance = create({
    baseURL: "/api",
    withCredentials: true,
});
export default axiosInstance;