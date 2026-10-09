
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useStoreMessage from "../../store/useMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, selectedConversations, addMessage } = useStoreMessage();
  const [error, setError] = useState({});
  const currentUserId = selectedConversations?._id;
   
  const handleChange = (event) => {
    setMessage(event.target.value);
    setError(prevError => ({
      ...prevError,
      message: "",

    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!message.trim()) {
      nextErrors.message = "Message est obligatoire."
    }
    setError(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    try {
      if (!currentUserId) {
        return;
      }
      const response = await sendMessage(currentUserId, { message });
      addMessage(response);
      setMessage("")
    } catch (error) {
      setError(prevMessage => ({
        ...prevMessage,
        message: error.response?.data?.message
          || "Échec D'envoyer message."
      }))
    }
   
  }
  
 
  return (
    <form
      onSubmit={handleSubmit} className="px-4 mb-1  my-auto">
      <div className="relative  w-full">
        <input
          onChange={handleChange}
          value={message}
          name="message"
          type="text"
          className="input rounded-lg  text-sm w-full block p-2.5 bg-gray-700 border-gray-500 text-white"
          placeholder="Send a message"
        />
        {error?.message && <p id="message-error" className="py-1 text-sm text-orange-900 font-semibold">{error.message}</p>}
     
          <button  className="absolute inset-y-0 end-0 flex items-center pe-3" type="submit">
            <BsSend />
          </button>
        
      </div>
      
    </form>
  );
}

export default MessageInput
