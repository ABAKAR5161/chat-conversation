import { useListenMessages } from "../../hooks/useListenMessage";
import useStoreMessage from "../../store/useMessage";
import { useEffect, useRef } from "react";

const Message = () => {
    const { selectedConversations, messages, getMessage, isLoadingMessage } = useStoreMessage();
    useListenMessages()
    const currentUserId = selectedConversations?._id;
    const bottomRef = useRef(null)

    useEffect(() => {
        if (!currentUserId) return;
        getMessage(currentUserId);
    }, [currentUserId, getMessage]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages]);

    if (!currentUserId) {
        return null;
    }

    return (
        <>
            {isLoadingMessage && (
                <div className="flex w-52 flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                        <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div>
                    </div>
                    <div className="skeleton h-32 w-full"></div>
                </div>
            )}
            {!isLoadingMessage && messages?.length > 0 && messages.map((message, index) => {
                const isCurrentUserMessage = message.senderId === currentUserId;
                return (
                    <div
                        key={message._id ?? `${message.senderId}-${index}`}
                        className={`chat ${!isCurrentUserMessage ? "chat-start" : "chat-end"}`}
                    >
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <div className={`chat-bubble max-w-[85%] break-words [overflow-wrap:anywhere] sm:max-w-[75%] ${!isCurrentUserMessage ? "bg-sky-500" : ""}`}>{message.message}</div>
                        <div className="chat-footer opacity-50">Delivered</div>
                    </div>
                );
            })}
           

            {!isLoadingMessage && messages?.length === 0 && <div className="flex flex-col justify-center items-center m-3">No message - send message to chatting.</div>}
            <div ref={bottomRef} aria-hidden="true" />

        </>
    )
};

export default Message