
import { useSocketContext } from "../../hooks/useSocketContext";
import useStoreMessage from "../../store/useMessage";



const Conversation = ({ user }) => {
    const { selectedConversations, setSelectedConversations } = useStoreMessage();
    const isSelected = selectedConversations?._id === user?._id;
    const { onLineUsers } = useSocketContext();
    const isOnLine = onLineUsers.includes(user?._id)
    const handleSelectedUser = () => {
        setSelectedConversations(user);
        
    };
    
    return (
        <>
            <button onClick={handleSelectedUser} className={`${isSelected && "bg-sky-500"} flex items-center gap-2 hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}>
                <div className={`avatar ${isOnLine ? "online" : ""}`}>
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{user.userName}</p>
                        <p className="text-xl">🤡</p>
                    </div>
                </div>
            </button>
            <div className="divider py-0 my-O h-1" />
        </>
    );
};

export default Conversation