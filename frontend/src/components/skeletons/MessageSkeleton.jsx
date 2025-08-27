const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);
  // Vary bubble widths for realism
  const bubbleWidths = ["w-40", "w-56", "w-32", "w-48", "w-36", "w-60"];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full bg-base-200">
              <div className="skeleton w-full h-full rounded-full" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16 rounded" />
          </div>

          <div className={`chat-bubble bg-base-200/60 p-0 ${idx % 2 === 0 ? "rounded-br-2xl" : "rounded-bl-2xl"} rounded-2xl shadow-sm`}>
            <div className={`skeleton h-6 ${bubbleWidths[idx % bubbleWidths.length]} mb-2 rounded`} />
            <div className={`skeleton h-4 ${bubbleWidths[(idx + 1) % bubbleWidths.length]} rounded`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
