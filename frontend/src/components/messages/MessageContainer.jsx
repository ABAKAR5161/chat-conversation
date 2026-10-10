
import useStoreMessage from "../../store/useMessage";
import HeaderMessage from "./HeaderMessage"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import NoChatSelected from "./NoChatSelected";


const MessageContainer = () => {
  const { selectedConversations } = useStoreMessage();

  // useEffect(() => {
  //   return () => setSelectedConversations(null);
  // }, [setSelectedConversations]);
  return (
    <div className={`${selectedConversations ? "flex" : "hidden"} min-h-0 min-w-0 flex-1 flex-col md:flex`}>
      {!selectedConversations ? <NoChatSelected /> : (
        <>
          {/* Header Here We Go */}
          <HeaderMessage />
          {/* Message componet Here We Go */}
          <Messages />
          {/* Message Input Here We Go */}
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default MessageContainer