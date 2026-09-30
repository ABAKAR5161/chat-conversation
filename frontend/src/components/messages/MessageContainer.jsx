import HeaderMessage from "./HeaderMessage"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import NoChatSelected from "./NoChatSelected";


const MessageContainer = () => {
  const notChatSelected = true;
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {notChatSelected ? <NoChatSelected /> : (
        <>
          {/* Header Here We Go */}
          <HeaderMessage />
          {/* Message componet Here We Go */}
          <Messages />
          {/* Message Input Here We Go */}
        </>
      )}
      <MessageInput />
    </div>
  );
}

export default MessageContainer