import MessageContainer from "../../components/messages/MessageContainer"
import Sidebar from "../../components/sidebar/Sidebar"

const Home = () => {
  return (
    <div className="flex h-[100dvh] w-full min-w-0 overflow-hidden bg-gray-400 bg-clip-padding bg-opacity-0 backdrop-blur-lg sm:h-[min(80dvh,700px)] sm:max-w-6xl sm:rounded-lg">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default Home;