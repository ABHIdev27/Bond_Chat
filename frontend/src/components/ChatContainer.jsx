import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageReactions from "./MessageReactions";
import EmojiPicker from "./EmojiPicker";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime, getProfilePicUrl } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  // Demo: simple local state for reactions (replace with real logic as needed)
  const [reactions, setReactions] = useState({});
  const [pickerMsgId, setPickerMsgId] = useState(null);

  const handleReact = (msgId, emoji) => {
    setReactions((prev) => {
      const prevMsg = prev[msgId] || {};
      const count = prevMsg[emoji]?.count || 0;
      const reacted = prevMsg[emoji]?.reacted || false;
      return {
        ...prev,
        [msgId]: {
          ...prevMsg,
          [emoji]: {
            count: reacted ? count - 1 : count + 1,
            reacted: !reacted,
          },
        },
      };
    });
  };
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
  <div className="h-full min-h-0 flex flex-col bg-base-100/80">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-4 space-y-6 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
        {messages.map((message, idx) => {
          const isOwn = message.senderId === authUser._id;
          const msgReactions = [
            { emoji: "👍", count: reactions[message._id]?.["👍"]?.count || 0, reacted: reactions[message._id]?.["👍"]?.reacted || false },
            { emoji: "😂", count: reactions[message._id]?.["😂"]?.count || 0, reacted: reactions[message._id]?.["😂"]?.reacted || false },
            { emoji: "❤️", count: reactions[message._id]?.["❤️"]?.count || 0, reacted: reactions[message._id]?.["❤️"]?.reacted || false },
          ];
          return (
            <div
              key={message._id}
              className={`chat group ${isOwn ? "chat-end" : "chat-start"} px-1 sm:px-4"}`}
              ref={idx === messages.length - 1 ? messageEndRef : null}
            >
              <div className="chat-image avatar">
<div className="size-12 rounded-full border-2 border-primary shadow-md bg-white">
<img
  src={
    isOwn
      ? getProfilePicUrl(authUser.profilePic) || "/avatar.png"
      : getProfilePicUrl(selectedUser.profilePic) || "/avatar.png"
  }
  alt="profile pic"
  className="size-12 object-cover rounded-full"
  onError={(e) => {
    e.target.src = "/avatar.png";
  }}
/>
                </div>
              </div>
              <div className="chat-header mb-1 flex items-center gap-2">
                <time className="text-xs opacity-60 ml-1 group-hover:opacity-100 transition-opacity">
                  {formatMessageTime(message.createdAt)}
                </time>
                {/* Status indicator placeholder */}
                {isOwn && (
                  <span className="ml-2 text-xs text-primary/70">✓✓</span>
                )}
              </div>
              <div
                className={`relative chat-bubble flex flex-col shadow-md transition-all duration-200 group-hover:scale-[1.03] group-hover:shadow-lg ${
                  isOwn
                    ? "bg-gradient-to-tr from-primary to-secondary text-primary-content"
                    : "bg-base-200 text-base-content"
                } px-4 py-2 min-w-[80px] max-w-full sm:max-w-[70%]`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[220px] max-w-full rounded-lg mb-2 border border-base-300 shadow"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                {message.text && <p className="whitespace-pre-line break-words text-base leading-relaxed">{message.text}</p>}

                {/* Show reactions bar only if any count > 0 */}
                {msgReactions.some(r => r.count > 0) && (
                  <div className="mt-1">
                    <MessageReactions
                      reactions={msgReactions}
                      onReact={(emoji) => handleReact(message._id, emoji)}
                    />
                  </div>
                )}

                {/* Add Reaction button, shown on hover/focus */}
                <button
                  className="absolute -top-6 right-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 bg-base-100 border border-base-300 rounded-full p-2 shadow hover:bg-base-200 text-xl z-20"
                  onClick={() => setPickerMsgId(message._id)}
                  tabIndex={0}
                  aria-label="Add reaction"
                  type="button"
                >
                  <span role="img" aria-label="Add reaction">➕</span>
                </button>
                {/* Emoji picker popup */}
                {pickerMsgId === message._id && (
                  <EmojiPicker
                    onSelect={(emoji) => handleReact(message._id, emoji)}
                    onClose={() => setPickerMsgId(null)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;