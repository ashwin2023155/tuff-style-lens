import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutfitCard } from "@/components/OutfitCard";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { MessageSquare, Settings, Grid, Bookmark, Heart, Award, LogOut } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("outfits");
  
  // Mock user data
  const userData = {
    id: userId || "user1",
    name: "Sophia Martinez",
    username: "sophiastyle",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Fashion enthusiast | Style consultant | NYC",
    posts: 27,
    followers: 1243,
    following: 568,
    score: 92,
    website: "sophiastyle.com"
  };
  
  // Mock posts data
  const userPosts = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      score: 9.2,
      feedback: "Perfect autumn colors that complement your skin tone",
      date: "Oct 15"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80",
      score: 8.7,
      feedback: "Great layering technique with complementary colors",
      date: "Oct 10"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1566206091558-7f218b696731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
      score: 9.5,
      feedback: "Exceptional color blocking and proportion balance",
      date: "Oct 5"
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1296&q=80",
      score: 8.9,
      feedback: "Bold color choice that works perfectly with your undertone",
      date: "Sep 28"
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1632149877166-f75d49000351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
      score: 9.1,
      feedback: "Sophisticated use of neutral tones with great texture contrast",
      date: "Sep 22"
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
      score: 8.5,
      feedback: "Classic silhouette with modern details",
      date: "Sep 15"
    }
  ];
  
  // Mock saved posts
  const savedPosts = userPosts.slice(2, 5);
  
  // Mock liked posts
  const likedPosts = userPosts.slice(1, 4);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <AppLayout title={userData.name}>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-border">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <ScoreDisplay score={userData.score} />
            </div>
            
            <div className="flex justify-center md:justify-start gap-6 mb-4">
              <div className="text-center">
                <p className="font-bold">{userData.posts}</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{userData.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{userData.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>
            
            <p className="text-sm mb-2">@{userData.username}</p>
            <p className="text-sm mb-2">{userData.bio}</p>
            <p className="text-sm text-primary">{userData.website}</p>
            
            <div className="flex gap-2 mt-4 justify-center md:justify-start">
              <Button>Follow</Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <Tabs defaultValue="outfits" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="outfits" className="flex-1">
              <Grid className="h-4 w-4 mr-2" /> Outfits
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex-1">
              <Bookmark className="h-4 w-4 mr-2" /> Saved
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex-1">
              <Heart className="h-4 w-4 mr-2" /> Liked
            </TabsTrigger>
            <TabsTrigger value="awards" className="flex-1">
              <Award className="h-4 w-4 mr-2" /> SuperLiked
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="outfits" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {userPosts.map((post) => (
                <OutfitCard
                  key={post.id}
                  image={post.image}
                  score={post.score}
                  feedback={post.feedback}
                  date={post.date}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {savedPosts.map((post) => (
                <OutfitCard
                  key={post.id}
                  image={post.image}
                  score={post.score}
                  feedback={post.feedback}
                  date={post.date}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="liked" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {likedPosts.map((post) => (
                <OutfitCard
                  key={post.id}
                  image={post.image}
                  score={post.score}
                  feedback={post.feedback}
                  date={post.date}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="awards" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {userPosts.slice(0, 2).map((post) => (
                <OutfitCard
                  key={post.id}
                  image={post.image}
                  score={post.score}
                  feedback={post.feedback}
                  date={post.date}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
