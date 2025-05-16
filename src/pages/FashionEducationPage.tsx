
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, ThumbsUp, ThumbsDown, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock fashion items to swipe through
const fashionItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
    title: "Classic White Shirt",
    description: "A wardrobe staple that pairs well with almost anything. Versatile for both casual and formal occasions.",
    category: "Essentials"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c",
    title: "Navy Blazer",
    description: "A structured piece that instantly elevates any outfit. Perfect for smart-casual events.",
    category: "Outerwear"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
    title: "Floral Summer Dress",
    description: "A lightweight, breezy dress perfect for warm weather. The floral pattern adds a feminine touch.",
    category: "Dresses"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    title: "Slim Fit Jeans",
    description: "A modern cut that flatters most body types. The dark wash makes it suitable for casual and semi-formal settings.",
    category: "Bottoms"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
    title: "Chunky Knit Sweater",
    description: "A cozy, textured piece perfect for layering in cooler weather. Adds visual interest to simple outfits.",
    category: "Knitwear"
  },
];

// Fashion tips
const fashionTips = [
  "Balance proportions: Pair loose tops with fitted bottoms or vice versa.",
  "The rule of thirds: Divide your outfit visually into thirds for better proportions.",
  "Neutral colors like black, white, navy, and beige are easy to mix and match.",
  "Statement accessories can elevate a simple outfit.",
  "Tailor your clothes for the perfect fit."
];

const FashionEducationPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [dislikedItems, setDislikedItems] = useState<number[]>([]);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  
  const currentItem = fashionItems[currentIndex];
  const progress = ((currentIndex + 1) / fashionItems.length) * 100;
  
  const handleSwipe = (liked: boolean) => {
    setDirection(liked ? "right" : "left");
    setTimeout(() => {
      if (liked) {
        setLikedItems([...likedItems, currentItem.id]);
      } else {
        setDislikedItems([...dislikedItems, currentItem.id]);
      }
      
      if (currentIndex < fashionItems.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setDirection(null);
      }
    }, 300);
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      // Remove from liked or disliked
      const itemId = fashionItems[currentIndex - 1].id;
      if (likedItems.includes(itemId)) {
        setLikedItems(likedItems.filter(id => id !== itemId));
      } else if (dislikedItems.includes(itemId)) {
        setDislikedItems(dislikedItems.filter(id => id !== itemId));
      }
    }
  };
  
  const variants = {
    enter: (direction: "left" | "right") => {
      return {
        x: direction === "left" ? -300 : 300,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => {
      return {
        zIndex: 0,
        x: direction === "left" ? 300 : -300,
        opacity: 0,
      };
    },
  };
  
  return (
    <AppLayout title="Fashion Education">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Your Style</h1>
          <p className="text-muted-foreground">
            Swipe right if you like the style, left if you don't
          </p>
        </div>
        
        <div className="mb-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-1 text-right">
            {currentIndex + 1} of {fashionItems.length}
          </p>
        </div>
        
        <div className="relative h-[500px] mb-6">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentItem.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full h-full"
            >
              <Card className="w-full h-full overflow-hidden">
                <div className="relative h-full">
                  <div className="h-3/4">
                    <img
                      src={currentItem.image}
                      alt={currentItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="absolute bottom-0 w-full bg-card p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold">{currentItem.title}</h2>
                        <p className="text-sm text-muted-foreground">{currentItem.category}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setShowInfo(!showInfo)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {showInfo && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 text-sm"
                      >
                        {currentItem.description}
                      </motion.p>
                    )}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => handleSwipe(false)}
            className="group"
          >
            <ThumbsDown className="mr-2 h-4 w-4 group-hover:text-destructive transition-colors" />
            Not My Style
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            size="lg"
            onClick={() => handleSwipe(true)}
            className="group"
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            Love It
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-bold mb-3">Fashion Tip</h3>
            <p className="text-muted-foreground italic">
              "{fashionTips[currentIndex % fashionTips.length]}"
            </p>
          </CardContent>
        </Card>
        
        {currentIndex === fashionItems.length - 1 && (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-bold mb-2">Style Profile Building</h3>
            <p className="mb-4 text-muted-foreground">
              Based on your preferences, we're building your personalized style profile.
              Continue exploring to refine your recommendations.
            </p>
            <Button size="lg" onClick={() => setCurrentIndex(0)}>
              Restart Style Discovery
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default FashionEducationPage;
