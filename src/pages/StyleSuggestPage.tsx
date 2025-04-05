
import { useLocation } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { StyleCard } from "@/components/StyleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock style suggestions
const styleRecommendations = [
  {
    id: 1,
    title: "Soft Summer",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "A cool, muted palette that features soft blues, muted pinks, and dusty purples. Your complexion works well with these gentle hues that have a slight cool undertone."
  },
  {
    id: 2,
    title: "Classic Minimal",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    description: "Clean lines, neutral colors, and timeless silhouettes define this style. This streamlined aesthetic complements your balanced proportions and creates a sophisticated look."
  },
  {
    id: 3,
    title: "Urban Casual",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    description: "Relaxed fits with interesting details and textures. This style emphasizes comfort while maintaining a put-together appearance, perfect for your lifestyle."
  }
];

const StyleSuggestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state?.image || "/placeholder.svg";
  
  const handleViewBrands = () => {
    navigate("/product-suggestions");
  };
  
  return (
    <AppLayout title="Style Recommendations">
      <div className="space-y-8 animate-fade-in">
        {location.state?.image && (
          <Card className="overflow-hidden">
            <CardContent className="p-0 flex items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                <img 
                  src={image} 
                  alt="Your outfit" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Based on your upload</h3>
                <p className="text-sm text-muted-foreground">
                  We've analyzed your style preferences and created personalized recommendations.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {styleRecommendations.map((style) => (
            <StyleCard
              key={style.id}
              title={style.title}
              image={style.image}
              description={style.description}
            />
          ))}
        </div>
        
        <div className="flex justify-center pt-4">
          <Button onClick={handleViewBrands} size="lg">
            View Brand Suggestions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default StyleSuggestPage;
