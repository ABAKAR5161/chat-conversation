import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useStoreAuth from "../store/useAuth";
import { SocketContext } from "./socketContext";


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onLineUsers, setOnLineUsers] = useState([]);
    const { authUser } = useStoreAuth();

    useEffect(() => {
        const socket = () => {
            if (!authUser) {
                setSocket(null);
                setOnLineUsers([]);
                return;
            }

            const newSocket = io({
                query: {
                    userId: authUser._id,
                }
            });

            setSocket(newSocket);
            newSocket.on("getOnLineUsers", (users) => {
                setOnLineUsers(users);
            });

            return () => newSocket.close();
        }

        return socket();
       
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onLineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};