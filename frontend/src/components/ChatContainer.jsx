import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-base-100/80">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100/80">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat group ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border-2 border-primary shadow-md bg-white">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </div>
            <div className="chat-header mb-1 flex items-center gap-2">
              <time className="text-xs opacity-60 ml-1 group-hover:opacity-100 transition-opacity">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div
              className={`chat-bubble flex flex-col shadow-md transition-all duration-200 group-hover:scale-[1.03] group-hover:shadow-lg ${
                message.senderId === authUser._id
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 text-base-content"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[220px] max-w-full rounded-lg mb-2 border border-base-300 shadow"
                />
              )}
              {message.text && <p className="whitespace-pre-line break-words">{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
