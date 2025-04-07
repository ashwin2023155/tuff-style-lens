
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Link, Copy, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  image: string;
  caption: string;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

export const ShareModal = ({ isOpen, onClose, post }: ShareModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Mock friends data
  const friends = [
    { id: "1", name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=9", lastActive: "1m ago" },
    { id: "2", name: "Liam Chen", avatar: "https://i.pravatar.cc/150?img=12", lastActive: "3h ago" },
    { id: "3", name: "Alex Kim", avatar: "https://i.pravatar.cc/150?img=11", lastActive: "1d ago" },
    { id: "4", name: "Isabella Lopez", avatar: "https://i.pravatar.cc/150?img=3", lastActive: "2h ago" },
    { id: "5", name: "Ethan Brown", avatar: "https://i.pravatar.cc/150?img=7", lastActive: "Just now" },
  ];

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyLink = () => {
    if (post) {
      navigator.clipboard.writeText(`https://tuff.io/post/${post.id}`);
      toast({
        title: "Link copied!",
        description: "Post link has been copied to clipboard",
      });
    }
  };

  const shareToFriend = (friendId: string) => {
    toast({
      title: "Post shared!",
      description: "Post has been shared successfully",
    });
  };

  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="friends">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Send to friends</span>
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span>Copy link</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="friends" className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3"
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <div 
                    key={friend.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => shareToFriend(friend.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{friend.name}</p>
                        <p className="text-xs text-muted-foreground">{friend.lastActive}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No friends found</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="link" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <img 
                    src={post.image} 
                    alt="Post thumbnail" 
                    className="h-10 w-10 object-cover rounded"
                  />
                  <span className="text-sm truncate flex-1">
                    {post.caption.substring(0, 30)}...
                  </span>
                </div>
              </div>
              <Button onClick={copyLink} size="icon" variant="outline">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-start">
          <div className="w-full text-xs text-muted-foreground">
            Share this outfit with your friends or copy the link to share elsewhere.
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
