import { Message } from "@/pages/ChatPage";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(message.timestamp);

  return (
    <div className={cn(
      "flex",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[75%] rounded-lg px-4 py-2 shadow-sm",
        isUser ? "bg-blue-500 text-white" : "bg-white text-gray-800"
      )}>
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <div className={cn(
          "text-xs mt-1",
          isUser ? "text-blue-100" : "text-gray-500"
        )}>
          {time}
        </div>
      </div>
    </div>
  );
}