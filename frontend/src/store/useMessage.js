import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useStoreMessage = create((set) => ({
    selectedConversations: null,
    setSelectedConversations: (selectedConversations) => set({selectedConversations}),
    messages: [],
    // setMessages: (messages) => set({messages}),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    isLoadingMessage: false,
    isSendingMessage: false,
    getMessage: async (userId) => {
        set({ isLoadingMessage: true });
        try {
            const response = await axiosInstance.get("/messages/" + userId);
            // const { setMessages } = get()
            // setMessages(response.data);
            set({ messages: response.data });
        } finally {
            set({ isLoadingMessage: false });
        }
    },
    sendMessage: async (userId, data) => {
        set({ isSendingMessage: true });
        try {
            const response = await axiosInstance.post("/messages/send/" + userId, data);
            return response.data
        } finally {
            set({ isSendingMessage: false });
        }
    },
}));
export default useStoreMessage;