
import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Groq from "groq-sdk";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your TUFF assistant powered by AI. How can I help you with your fashion and styling needs today?",
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
      // Create a system prompt for fashion-focused responses
      const systemPrompt = `You are TUFF, an AI fashion assistant. You help users with:
      - Color analysis and skin tone matching
      - Outfit coordination and styling advice
      - Fashion trends and recommendations
      - Brand suggestions and shopping advice
      - Style improvement tips
      - Fashion education and guidance
      
      Keep responses helpful, friendly, and focused on fashion and style. Be concise but informative.`;

      // Prepare conversation history for context
      const conversationHistory = messages.slice(-5).map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      }));

      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationHistory,
          { role: "user", content: input }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 500,
      });

      const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiResponse,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Groq API error:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI. Please try again.",
        variant: "destructive",
      });
      
      // Fallback to predefined responses
      const fallbackResponse = getFallbackResponse(input.toLowerCase());
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: fallbackResponse,
          timestamp: new Date(),
        },
      ]);
    } finally {
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
                placeholder="Ask me about fashion..."
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

// Fallback function for when Groq API fails
function getFallbackResponse(input: string): string {
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
  
  return "I'm here to help with fashion advice, color analysis, style suggestions, and more. How can I assist you today?";
}
