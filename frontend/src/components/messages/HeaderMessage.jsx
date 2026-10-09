import useStoreMessage from "../../store/useMessage";


const HeaderMessage = () => {
    const { selectedConversations } = useStoreMessage()
    return (
        <header className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span> {" "}
            <span className="font-bold text-gray-900">
                {selectedConversations?.userName}
            </span>
        </header>
    );
};

export default HeaderMessage
