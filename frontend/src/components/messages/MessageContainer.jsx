
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
    <div className="md:min-w-[450px]  flex flex-col">
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