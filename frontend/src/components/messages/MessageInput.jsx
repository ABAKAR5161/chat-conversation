
import { BsSend } from "react-icons/bs";
const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="relative w-full">
        <input type="text" className="input rounded-lg text-sm w-full block p-2.5 bg-gray-700 border-gray-500 text-white"
          placeholder="Send a message" />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3" type="submit">
          <BsSend />
        </button>
      </div>
      
    </form>
  )
}

export default MessageInput
