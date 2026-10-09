
import { BiLogOut } from "react-icons/bi";
import useStoreAuth from "../../store/useAuth";
import useStoreMessage from "../../store/useMessage";
const LogoutButton = () => {
  const { logout } = useStoreAuth();
  const { setSelectedConversations } = useStoreMessage();

  const handleLogout = () => {
    logout();
    setSelectedConversations(false);
  }
  return (
    <button onClick={handleLogout} className="mt-auto">
      <BiLogOut className="h-6 w-6 text-white cursor-pointer" />
    </button>
  )
}

export default LogoutButton
