import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import SearchInput from "./SearchInput"
import useStoreMessage from "../../store/useMessage"

const Sidebar = () => {
  const { selectedConversations } = useStoreMessage();

  return (
    <div className={`${selectedConversations ? "hidden" : "flex"} min-h-0 w-full shrink-0 flex-col border-r border-slate-500 p-3 sm:p-4 md:flex md:w-80`}>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  )
}

export default Sidebar
