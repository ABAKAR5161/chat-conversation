import { IoArrowBack } from "react-icons/io5";
import useStoreMessage from "../../store/useMessage";


const HeaderMessage = () => {
    const { selectedConversations, setSelectedConversations } = useStoreMessage()
    return (
        <header className="mb-2 flex shrink-0 items-center gap-3 bg-slate-500 px-3 py-3 sm:px-4">
            <button
                type="button"
                className="btn btn-ghost btn-sm px-2 md:hidden"
                onClick={() => setSelectedConversations(false)}
                aria-label="Retour aux conversations"
            >
                <IoArrowBack className="h-5 w-5" />
            </button>
            <div className="min-w-0 truncate">
                <span className="label-text">To:</span>{" "}
                <span className="font-bold text-gray-900">
                    {selectedConversations?.userName}
                </span>
            </div>
        </header>
    );
};

export default HeaderMessage
