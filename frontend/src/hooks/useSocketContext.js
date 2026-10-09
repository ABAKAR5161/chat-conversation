import { useContext } from "react"
import { SocketContext } from "../context/socketContext"

export const useSocketContext = () => {
    return useContext(SocketContext);
}