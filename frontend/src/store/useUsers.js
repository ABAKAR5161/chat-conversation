import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useStoreUser = create((set) => ({
    users: null,
    isLoadingUsers: false,
    getUsers: async () => {
        set({ isLoadingUsers: false });
        try {
            const response = await axiosInstance.get("/users/");
            set({ users: response.data });
        } finally {
            set({ isLoadingUsers: false });
        }
    },
}));
export default useStoreUser;