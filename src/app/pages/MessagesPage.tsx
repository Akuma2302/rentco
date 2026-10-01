import { useState } from "react";
import { Search, Send } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { mockMessages, currentUser } from "../data/mockData";
import { PageHeader } from "../components/PageHeader";

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  // Group messages by conversation
  const conversations = mockMessages.reduce((acc, msg) => {
    const otherUserId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
    const otherUserName = msg.senderId === currentUser.id ? "Recipient" : msg.senderName;
    
    if (!acc[otherUserId]) {
      acc[otherUserId] = {
        userId: otherUserId,
        userName: otherUserName,
        messages: [],
        lastMessage: "",
        lastTimestamp: "",
      };
    }
    
    acc[otherUserId].messages.push(msg);
    acc[otherUserId].lastMessage = msg.content;
    acc[otherUserId].lastTimestamp = msg.timestamp;
    
    return acc;
  }, {} as Record<string, any>);

  const conversationList = Object.values(conversations);
  const activeConversation = selectedConversation ? conversations[selectedConversation] : null;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Mock send message
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <PageHeader title="Messages">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            className="pl-11 h-11 rounded-2xl bg-input-background text-sm"
          />
        </div>
      </PageHeader>

      {/* Conversations List */}
      {!selectedConversation ? (
        <div className="flex-1 overflow-y-auto">
          {conversationList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No messages yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {conversationList.map((conv) => (
                <div
                  key={conv.userId}
                  onClick={() => setSelectedConversation(conv.userId)}
                  className="p-4 hover:bg-accent cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-[#5B8BFF] font-bold rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {conv.userName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm">{conv.userName}</h3>
                        <span className="text-xs text-gray-500">
                          {new Date(conv.lastTimestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Conversation View */
        <div className="flex-1 flex flex-col">
          {/* Conversation Header */}
          <div className="border-b p-4 flex items-center gap-3">
            <button
              onClick={() => setSelectedConversation(null)}
              className="text-primary"
            >
              ← Back
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-[#5B8BFF] font-bold rounded-full flex items-center justify-center text-white">
              {activeConversation.userName.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm">{activeConversation.userName}</h3>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeConversation.messages.map((msg: any) => {
              const isOwn = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      isOwn
                        ? "bg-primary text-white"
                        : "bg-accent text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwn ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-input-background"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}