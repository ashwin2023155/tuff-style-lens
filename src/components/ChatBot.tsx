
import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your TUFF assistant. How can I help you with your fashion and styling needs today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI response with predefined responses
      setTimeout(() => {
        const response = getAIResponse(input.toLowerCase());
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: response,
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-lg">
          <CardHeader className="bg-primary/10 p-3 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">TUFF Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-3 h-80 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce"></div>
                      <div className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:0.2s]"></div>
                      <div className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          onClick={toggleChat} 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

// Function to provide canned responses based on user input
function getAIResponse(input: string): string {
  // Simple matching logic for common questions
  if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
    return "Hello! How can I help with your fashion needs today?";
  } else if (input.includes("color analysis") || input.includes("skin tone")) {
    return "Our Color Analysis feature helps identify your skin tone and suggests colors that complement you. You can try it by going to the Color Analysis page in the sidebar menu!";
  } else if (input.includes("upload") || input.includes("photo") || input.includes("picture")) {
    return "You can upload photos of your outfits by clicking on 'Upload Outfit' in the sidebar. We'll analyze your style and provide feedback!";
  } else if (input.includes("style") || input.includes("suggestion")) {
    return "For style suggestions, check out our Style Suggestions page. We provide personalized recommendations based on your body type, skin tone, and preferences.";
  } else if (input.includes("brand") || input.includes("shop") || input.includes("product")) {
    return "Looking for brand recommendations? Visit our Brand Suggestions page to discover brands that match your style and preferences.";
  } else if (input.includes("lookbook")) {
    return "Your Lookbook is where you can review all your previously uploaded outfits and track your style evolution over time.";
  } else if (input.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  
  // Default response
  return "I'm here to help with fashion advice, color analysis, style suggestions, and more. How can I assist you today?";
}
