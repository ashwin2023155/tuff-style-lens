
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { FeedPost } from "@/components/FeedPost";
import { Button } from "@/components/ui/button";
import { Plus, Share } from "lucide-react";
import { ShareModal } from "@/components/ShareModal";
import { NewPostModal } from "@/components/NewPostModal";

// Mock data for posts
const mockPosts = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Sophia Martinez",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 92
    },
    image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
    caption: "Feeling the autumn vibes today with this new coat from ZARA! 🍂 What do you think?",
    tags: {
      season: "Autumn",
      occasion: "Casual",
      brand: "ZARA",
      style: "Minimalist"
    },
    likes: 124,
    superLikes: 18,
    saves: 32,
    comments: [
      {
        id: "c1",
        user: {
          name: "Emma Wilson",
          avatar: "https://i.pravatar.cc/150?img=9"
        },
        text: "Love that coat! The color really suits you.",
        timestamp: "2h ago"
      },
      {
        id: "c2",
        user: {
          name: "Liam Chen",
          avatar: "https://i.pravatar.cc/150?img=12"
        },
        text: "Perfect autumn look! 👌",
        timestamp: "1h ago"
      }
    ],
    timestamp: "3h ago"
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/150?img=8",
      rating: 85
    },
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
    caption: "Business casual done right. The key is in the details. #MensStyle",
    tags: {
      season: "Winter",
      occasion: "Business Casual",
      brand: "H&M",
      style: "Classic"
    },
    likes: 89,
    superLikes: 7,
    saves: 15,
    comments: [
      {
        id: "c3",
        user: {
          name: "Alex Kim",
          avatar: "https://i.pravatar.cc/150?img=11"
        },
        text: "That blazer fits perfectly! Where did you get it?",
        timestamp: "4h ago"
      }
    ],
    timestamp: "5h ago"
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Olivia Taylor",
      avatar: "https://i.pravatar.cc/150?img=10",
      rating: 78
    },
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    caption: "Street style meets comfort. This oversized jacket is everything!",
    tags: {
      season: "Spring",
      occasion: "Street",
      brand: "Urban Outfitters",
      style: "Streetwear"
    },
    likes: 243,
    superLikes: 0,
    saves: 47,
    comments: [],
    timestamp: "1d ago"
  }
];

const FeedPage = () => {
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [sharePost, setSharePost] = useState<typeof mockPosts[0] | null>(null);

  const handleShare = (post: typeof mockPosts[0]) => {
    setSharePost(post);
    setIsShareModalOpen(true);
  };

  const handleProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <AppLayout title="Fashion Feed">
      <div className="max-w-xl mx-auto">
        {mockPosts.map((post) => (
          <FeedPost
            key={post.id}
            {...post}
            onShare={() => handleShare(post)}
          />
        ))}
      </div>

      {/* Floating Post Button */}
      <Button
        onClick={() => setIsNewPostModalOpen(true)}
        className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        post={sharePost}
      />

      {/* New Post Modal */}
      <NewPostModal
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
      />
    </AppLayout>
  );
};

export default FeedPage;
