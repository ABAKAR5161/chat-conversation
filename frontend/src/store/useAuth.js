import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useStoreAuth = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isLoadingSignup: false,
    isLoadingLogin: false,
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axiosInstance.get("/users/checkAuth");
            const authUser = response.data.authUser ?? null;
            set({ authUser });
            return authUser;
        } catch {
            set({ authUser: null });
            return null;
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isLoadingSignup: true });
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            set({ authUser: response.data.authUser });
            return response.data;
        } finally {
            set({ isLoadingSignup: false });
        }
    },
    login: async (data) => {
        set({ isLoadingLogin: true });
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({ authUser: response.data.authUser });
            return response.data;
        } finally {
            set({ isLoadingLogin: false });
        }
    },
    logout: async () => {
        const response = await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        return response.data;
    }
}));
export default useStoreAuth;