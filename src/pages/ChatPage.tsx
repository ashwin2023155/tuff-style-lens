
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Send, 
  Image as ImageIcon, 
  MoreVertical,
  Bot
} from "lucide-react";
import { OutfitCard } from "@/components/OutfitCard";

// Mock conversation data
const mockConversations = {
  "1": {
    user: {
      id: "user1",
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=9",
      online: true
    },
    messages: [
      {
        id: "m1",
        senderId: "user1",
        text: "Hey! I saw your latest outfit post. Love the color palette!",
        timestamp: "Yesterday, 4:30 PM",
        read: true
      },
      {
        id: "m2",
        senderId: "currentUser",
        text: "Thanks Emma! I was trying out some of the color combinations from my analysis.",
        timestamp: "Yesterday, 4:45 PM",
        read: true
      },
      {
        id: "m3",
        senderId: "user1",
        text: "It really works well with your skin tone. Where did you get that jacket?",
        timestamp: "Yesterday, 5:00 PM",
        read: true
      },
      {
        id: "m4",
        senderId: "currentUser",
        text: "I got it from that new boutique downtown. I can share the outfit details if you want!",
        timestamp: "Yesterday, 5:10 PM",
        read: true
      },
      {
        id: "m5",
        senderId: "user1",
        text: "Yes please! I'd love to check it out.",
        timestamp: "10:30 AM",
        read: true
      }
    ]
  },
  "3": {
    user: {
      id: "stylebot",
      name: "TUFF StyleBot",
      avatar: "",
      online: true,
      isBot: true
    },
    messages: [
      {
        id: "m1",
        senderId: "stylebot",
        text: "Hello! I'm your TUFF StyleBot. I can help you with personalized fashion advice, color matching, and outfit suggestions. How can I assist you today?",
        timestamp: "Yesterday, 2:30 PM",
        read: true
      },
      {
        id: "m2",
        senderId: "currentUser",
        text: "Hi! I need help finding a good outfit for a business casual event.",
        timestamp: "Yesterday, 2:35 PM",
        read: true
      },
      {
        id: "m3",
        senderId: "stylebot",
        text: "I'd be happy to help with business casual outfit ideas! Could you tell me a bit about your color season and preferred style?",
        timestamp: "Yesterday, 2:36 PM",
        read: true
      },
      {
        id: "m4",
        senderId: "currentUser",
        text: "I have a Autumn color palette and I usually prefer minimalist style.",
        timestamp: "Yesterday, 2:40 PM",
        read: true
      },
      {
        id: "m5",
        senderId: "stylebot",
        text: "Perfect! For Autumn tones with a minimalist style, I recommend earth-toned trousers or a skirt paired with a cream blouse. Add a structured blazer in olive or rust. Accessorize with gold-toned minimal jewelry and ankle boots. Would you like to see some specific examples?",
        timestamp: "Yesterday, 2:45 PM",
        read: true
      }
    ]
  }
};

// Mock shared outfit
const sharedOutfit = {
  id: "outfit1",
  image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?ixlib=rb-4.0.3",
  score: 9.2,
  feedback: "Perfect autumn colors that complement your skin tone"
};

const ChatPage = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [showSharedOutfit, setShowSharedOutfit] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversation = mockConversations[conversationId as keyof typeof mockConversations];
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);
  
  if (!conversation) {
    return (
      <AppLayout title="Chat">
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground">Conversation not found</p>
        </div>
      </AppLayout>
    );
  }
  
  const handleSend = () => {
    if (!input.trim()) return;
    // Here you would typically send the message to your backend
    
    // For demo, we'll just clear the input
    setInput("");
  };
  
  const handleShareOutfit = () => {
    setShowSharedOutfit(!showSharedOutfit);
  };

  return (
    <AppLayout title="" hideSearch>
      <div className="flex flex-col h-[calc(100vh-140px)]">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/messages")} 
            className="md:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              {conversation.user.isBot ? (
                <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </div>
              ) : (
                <>
                  <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                  <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                </>
              )}
            </Avatar>
            
            <div>
              <p className="font-medium">{conversation.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {conversation.user.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          
          <div className="ml-auto">
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.senderId === "currentUser" ? "justify-end" : "justify-start"}`}
            >
              {message.senderId !== "currentUser" && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  {conversation.user.isBot ? (
                    <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                  ) : (
                    <>
                      <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                      <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                    </>
                  )}
                </Avatar>
              )}
              
              <div 
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderId === "currentUser" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
          
          {/* Shared outfit, if any */}
          {showSharedOutfit && (
            <div className="flex justify-end">
              <div className="max-w-[70%] rounded-lg p-3 bg-primary text-primary-foreground">
                <p className="text-sm mb-2">Check out this outfit!</p>
                <div className="rounded-md overflow-hidden">
                  <OutfitCard
                    image={sharedOutfit.image}
                    score={sharedOutfit.score}
                    feedback={sharedOutfit.feedback}
                    className="max-w-xs"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handleShareOutfit}
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
            
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            
            <Button 
              size="icon" 
              className="rounded-full"
              disabled={!input.trim()}
              onClick={handleSend}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
