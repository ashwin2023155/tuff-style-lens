
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Edit, Bot } from "lucide-react";

// Mock conversations data
const conversations = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=9",
      online: true
    },
    lastMessage: {
      text: "That outfit looks amazing on you!",
      timestamp: "2m ago",
      unread: true
    }
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Liam Chen",
      avatar: "https://i.pravatar.cc/150?img=12",
      online: false
    },
    lastMessage: {
      text: "Thanks for the styling advice",
      timestamp: "1h ago",
      unread: false
    }
  },
  {
    id: "3",
    user: {
      id: "stylebot",
      name: "TUFF StyleBot",
      avatar: "",
      online: true,
      isBot: true
    },
    lastMessage: {
      text: "I can help you find the perfect outfit for your event",
      timestamp: "3h ago",
      unread: false
    }
  },
  {
    id: "4",
    user: {
      id: "user3",
      name: "Alex Kim",
      avatar: "https://i.pravatar.cc/150?img=11",
      online: true
    },
    lastMessage: {
      text: "Can you share that jacket you posted yesterday?",
      timestamp: "1d ago",
      unread: false
    }
  },
  {
    id: "5",
    user: {
      id: "user4",
      name: "Isabella Lopez",
      avatar: "https://i.pravatar.cc/150?img=3",
      online: false
    },
    lastMessage: {
      text: "I loved your latest outfit post",
      timestamp: "2d ago",
      unread: false
    }
  }
];

const MessagesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter((convo) =>
    convo.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleOpenChat = (conversationId: string) => {
    navigate(`/messages/${conversationId}`);
  };
  
  const handleNewMessage = () => {
    // This would typically open a modal or navigate to a new message page
    navigate("/messages/new");
  };

  return (
    <AppLayout title="Messages">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={handleNewMessage} size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => handleOpenChat(conversation.id)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  {conversation.user.isBot ? (
                    <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground">
                      <Bot className="h-6 w-6" />
                    </div>
                  ) : (
                    <>
                      <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                      <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                    </>
                  )}
                </Avatar>
                {conversation.user.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate">{conversation.user.name}</p>
                  <p className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</p>
                </div>
                <p className={`text-sm truncate ${conversation.lastMessage.unread ? "font-medium" : "text-muted-foreground"}`}>
                  {conversation.lastMessage.text}
                </p>
              </div>
              
              {conversation.lastMessage.unread && (
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default MessagesPage;
