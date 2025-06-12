import { useState } from "react";
import { Chat } from "@/components/Chat";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatInput } from "@/components/ChatInput";
import { useToast } from "@/components/ui/use-toast";

export type Message = {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
};

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "other",
      timestamp: new Date(),
    },
  ]);
  const { toast } = useToast();

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getResponseMessage(content),
        sender: "other",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, responseMessage]);
      toast({
        title: "New message",
        description: "You have received a new message",
      });
    }, 1000);
  };

  const getResponseMessage = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
      return "Hello there! How are you doing today?";
    } else if (lowercaseMessage.includes("how are you")) {
      return "I'm just a simple chat app, but I'm working well, thanks for asking!";
    } else if (lowercaseMessage.includes("bye") || lowercaseMessage.includes("goodbye")) {
      return "Goodbye! Have a great day!";
    } else {
      return "That's interesting! Tell me more.";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader />
      <Chat messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}