
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
            <button onClick={handleSelectedUser} className={`${isSelected ? "bg-sky-500" : ""} flex w-full min-w-0 cursor-pointer items-center gap-3 rounded p-2 text-left hover:bg-sky-500`}>
                <div className={`avatar ${isOnLine ? "online" : ""}`}>
                    <div className="h-12 w-12 shrink-0 rounded-full">
                        <img alt="" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex min-w-0 items-center justify-between gap-2">
                        <p className="truncate font-bold text-gray-200">{user.userName}</p>
                        <p className="shrink-0 text-xl">🤡</p>
                    </div>
                </div>
            </button>
            <div className="divider py-0 my-O h-1" />
        </>
    );
};

export default Conversation