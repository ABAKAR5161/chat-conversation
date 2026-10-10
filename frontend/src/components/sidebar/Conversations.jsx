import { useEffect } from "react";
import useStoreUser from "../../store/useUsers";
import Conversation from "./Conversation";



const Conversations = () => {
  const { users, isLoadingUsers, getUsers } = useStoreUser();


  useEffect(() => {
    getUsers();
  }, [getUsers]);
    
  return (
    isLoadingUsers ? (<div> Loading...</div >) : (
      <div className="flex min-h-0 flex-1 flex-col overflow-auto py-2">
        {users?.map((user) => <Conversation key={user._id} user={user} />)}
      </div>
    )
  );
};

export default Conversations
