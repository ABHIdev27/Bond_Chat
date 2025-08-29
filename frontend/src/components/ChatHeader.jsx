import { X, Phone, Video, Info } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { getProfilePicUrl } from "../lib/utils";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b border-base-300 bg-base-100/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          {/* Avatar with animated ring and online indicator */}
<div className="avatar relative">
  <div className={`size-12 rounded-full border-2 ${onlineUsers.includes(selectedUser._id) ? 'border-green-400 animate-pulse-slow' : 'border-base-300'} shadow-md transition-all duration-300`}>
    <img 
      src={getProfilePicUrl(selectedUser.profilePic) || "/avatar.png"} 
      alt={selectedUser.fullName} 
      className="size-12 object-cover rounded-full"
      onError={(e) => {
        e.target.src = "/avatar.png";
      }}
    />
    {onlineUsers.includes(selectedUser._id) && (
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
    )}
  </div>
</div>
          {/* User info */}
          <div className="min-w-0">
            <h3 className="font-semibold text-lg truncate text-base-content">{selectedUser.fullName}</h3>
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <span>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</span>
              {/* Example: last seen, bio, etc. */}
              {selectedUser.bio && <span className="hidden sm:inline text-xs text-zinc-400">· {selectedUser.bio}</span>}
            </div>
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm rounded-full hover:bg-primary/10 transition" title="Call">
            <Phone className="size-5" />
          </button>
          <button className="btn btn-ghost btn-sm rounded-full hover:bg-primary/10 transition" title="Video Call">
            <Video className="size-5" />
          </button>
          <button className="btn btn-ghost btn-sm rounded-full hover:bg-primary/10 transition" title="Info">
            <Info className="size-5" />
          </button>
          <button className="btn btn-ghost btn-sm rounded-full hover:bg-error/10 transition" onClick={() => setSelectedUser(null)} title="Close chat">
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
// Add this animation to your global CSS (e.g., index.css):
// @keyframes pulse-slow {
//   0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
//   50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.15); }
// }
// .animate-pulse-slow { animation: pulse-slow 1.6s infinite cubic-bezier(0.6,0,0.4,1); }
  );
};
export default ChatHeader;
