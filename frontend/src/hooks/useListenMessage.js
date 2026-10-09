import { useEffect } from "react";
import { useSocketContext } from "./useSocketContext"
import useStoreMessage from "../store/useMessage";
import notification from "../assets/notification-facebook.mp3"

export const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { addMessage } = useStoreMessage();
    useEffect(() => {
        const getsocketMessage = () => {
            if (!socket) {
                return;
            }
            socket.on("newMessage", (newMessage) => {
                const sound = new Audio(notification);
                sound.play();
                addMessage(newMessage)
            });
            return () => socket.off("newMessage");
        }
        return getsocketMessage();
        
    }, [socket, addMessage]);
};