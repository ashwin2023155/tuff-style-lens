import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Diamond, 
  MoreHorizontal 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StyleLabel } from "./StyleLabel";

interface FeedPostProps {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  image: string;
  caption: string;
  tags: {
    season?: string;
    occasion?: string;
    brand?: string;
    style?: string;
  };
  likes: number;
  superLikes: number;
  saves: number;
  comments: Array<{
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    text: string;
    timestamp: string;
  }>;
  timestamp: string;
  onComment?: () => void;
  onShare?: () => void;
}

export const FeedPost = ({
  id,
  user,
  image,
  caption,
  tags,
  likes,
  superLikes,
  saves,
  comments,
  timestamp,
  onComment,
  onShare
}: FeedPostProps) => {
  const [liked, setLiked] = useState(false);
  const [superLiked, setSuperLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  // Toggle like
  const handleLike = () => {
    setLiked(!liked);
  };
  
  // Toggle super like (only if user rating > 80)
  const handleSuperLike = () => {
    if (user.rating >= 80) {
      setSuperLiked(!superLiked);
    }
  };
  
  // Toggle save
  const handleSave = () => {
    setSaved(!saved);
  };
  
  // Toggle comments
  const handleToggleComments = () => {
    setShowComments(!showComments);
    if (onComment && !showComments) {
      onComment();
    }
  };
  
  // Handle share
  const handleShare = () => {
    if (onShare) {
      onShare();
    }
  };

  return (
    <Card className="mb-6 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Post Image */}
      <div className="relative">
        <img 
          src={image} 
          alt="Outfit post" 
          className="w-full aspect-square object-cover"
        />
        
        {/* Tags overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tags.season && <StyleLabel>{tags.season}</StyleLabel>}
          {tags.occasion && <StyleLabel>{tags.occasion}</StyleLabel>}
          {tags.brand && <StyleLabel>{tags.brand}</StyleLabel>}
          {tags.style && <StyleLabel>{tags.style}</StyleLabel>}
        </div>
        
        {/* SuperLike effect */}
        {superLiked && (
          <div className="absolute inset-0 bg-primary/5 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        {/* Action buttons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9" 
              onClick={handleLike}
            >
              <Heart className={cn(
                "h-6 w-6", 
                liked && "fill-red-500 text-red-500"
              )} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9" 
              onClick={handleToggleComments}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            
            {user.rating >= 80 && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9" 
                onClick={handleSuperLike}
              >
                <Diamond className={cn(
                  "h-6 w-6", 
                  superLiked && "fill-primary text-primary"
                )} />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9" 
              onClick={handleShare}
            >
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9" 
            onClick={handleSave}
          >
            <Bookmark className={cn(
              "h-6 w-6", 
              saved && "fill-current"
            )} />
          </Button>
        </div>
        
        {/* Likes counter */}
        <p className="text-sm font-medium mb-2">
          {likes + (liked ? 1 : 0)} likes
          {(superLikes + (superLiked ? 1 : 0)) > 0 && 
            ` • ${superLikes + (superLiked ? 1 : 0)} super`
          }
          {(saves + (saved ? 1 : 0)) > 0 && 
            ` • ${saves + (saved ? 1 : 0)} saves`
          }
        </p>
        
        {/* Caption */}
        <p className="text-sm mb-2">
          <span className="font-medium">{user.name}</span> {caption}
        </p>
        
        {/* Comments */}
        {showComments && comments.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-sm text-muted-foreground mb-2">
              {comments.length} comment{comments.length !== 1 ? 's' : ''}
            </p>
            
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{comment.user.name}</span> {comment.text}
                  </p>
                  <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <form className="flex items-center gap-2 w-full">
          <Avatar className="h-7 w-7">
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0"
          />
          <Button variant="ghost" size="sm" className="text-primary">Post</Button>
        </form>
      </CardFooter>
    </Card>
  );
};
