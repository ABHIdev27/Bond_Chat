import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen min-h-screen w-full bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 dark:from-base-200 dark:via-base-300 dark:to-base-100">
      <div className="flex items-center justify-center pt-20 px-2 sm:px-4">
        <div className="bg-white/80 dark:bg-base-200/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] border border-white/30">
          <div className="flex h-full rounded-3xl overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
