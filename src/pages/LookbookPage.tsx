
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { OutfitCard } from "@/components/OutfitCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { ColorCircle } from "@/components/ColorCircle";
import { StyleLabel } from "@/components/StyleLabel";

// Mock lookbook data
const mockLookbook = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    score: 9.2,
    feedback: "Perfect color harmony and proportions. The silhouette flatters your body type.",
    date: "April 1, 2025",
    colors: [
      { color: "#E0C1B3", name: "Blush" },
      { color: "#FFFFFF", name: "White" },
      { color: "#DED7C9", name: "Beige" },
    ],
    attributes: {
      skinTone: "Warm",
      brightness: "Light",
      contrast: "Low"
    }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    score: 8.5,
    feedback: "Good pattern mixing and color coordination. Consider adjusting the proportions slightly.",
    date: "March 28, 2025",
    colors: [
      { color: "#3D3F44", name: "Charcoal" },
      { color: "#FFFFFF", name: "White" },
      { color: "#B1A49A", name: "Taupe" },
    ],
    attributes: {
      skinTone: "Cool",
      brightness: "Medium",
      contrast: "High"
    }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    score: 7.8,
    feedback: "Nice casual ensemble. The color palette works well for your skin tone.",
    date: "March 25, 2025",
    colors: [
      { color: "#8CA9C5", name: "Dusty Blue" },
      { color: "#FFFFFF", name: "White" },
      { color: "#E8E8E8", name: "Light Gray" },
    ],
    attributes: {
      skinTone: "Neutral",
      brightness: "Medium",
      contrast: "Medium"
    }
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    score: 8.9,
    feedback: "Excellent layering and texture play. The monochromatic palette creates a sophisticated look.",
    date: "March 20, 2025",
    colors: [
      { color: "#27231F", name: "Off Black" },
      { color: "#413D3A", name: "Dark Gray" },
      { color: "#5E5B57", name: "Slate" },
    ],
    attributes: {
      skinTone: "Cool",
      brightness: "Dark",
      contrast: "Low"
    }
  }
];

const LookbookPage = () => {
  const [sortBy, setSortBy] = useState("date");
  const [selectedOutfit, setSelectedOutfit] = useState<null | typeof mockLookbook[0]>(null);
  
  const sortedLookbook = [...mockLookbook].sort((a, b) => {
    if (sortBy === "score") {
      return b.score - a.score;
    }
    // Default sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  const handleOutfitClick = (outfit: typeof mockLookbook[0]) => {
    setSelectedOutfit(outfit);
  };
  
  const handleDialogClose = () => {
    setSelectedOutfit(null);
  };
  
  return (
    <AppLayout title="Your Lookbook">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Your Past Outfits</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date (newest)</SelectItem>
                <SelectItem value="score">Score (highest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedLookbook.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              image={outfit.image}
              score={outfit.score}
              feedback={outfit.feedback}
              date={outfit.date}
              onClick={() => handleOutfitClick(outfit)}
            />
          ))}
        </div>
        
        {sortedLookbook.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't uploaded any outfits yet.</p>
            <Button>Upload Your First Outfit</Button>
          </div>
        )}
      </div>
      
      <Dialog open={selectedOutfit !== null} onOpenChange={handleDialogClose}>
        {selectedOutfit && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Outfit Details</DialogTitle>
              <DialogDescription>
                Analyzed on {selectedOutfit.date}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <img 
                  src={selectedOutfit.image} 
                  alt="Outfit" 
                  className="w-full aspect-square object-cover rounded-lg" 
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Score</p>
                  <ScoreDisplay score={selectedOutfit.score} size="md" />
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Colors</p>
                  <div className="flex gap-2">
                    {selectedOutfit.colors.map((color, index) => (
                      <ColorCircle 
                        key={index} 
                        color={color.color} 
                        size="sm" 
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Feedback</p>
                  <p className="text-sm">{selectedOutfit.feedback}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between gap-2 pt-2">
              {Object.entries(selectedOutfit.attributes).map(([key, value]) => (
                <StyleLabel 
                  key={key} 
                  label={key.charAt(0).toUpperCase() + key.slice(1)} 
                  value={value} 
                />
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </AppLayout>
  );
};

export default LookbookPage;
