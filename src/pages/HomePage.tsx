
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Book, Palette, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

// Home page feature cards
const features = [
  {
    icon: Upload,
    title: "Upload Your Outfit",
    description: "Take a photo or upload an image of your outfit for instant AI-powered style analysis.",
    path: "/upload",
    color: "bg-tuff-pastel-blue/20"
  },
  {
    icon: Book,
    title: "View Your Lookbook",
    description: "Revisit your outfit history and track your style evolution over time.",
    path: "/lookbook",
    color: "bg-tuff-pastel-pink/20"
  },
  {
    icon: Palette,
    title: "Get Style Suggestions",
    description: "Receive personalized style recommendations based on your body type and preferences.",
    path: "/style-suggestions",
    color: "bg-tuff-pastel-green/20"
  },
  {
    icon: ShoppingBag,
    title: "Shop Recommended Brands",
    description: "Discover brands and specific pieces that complement your unique style profile.",
    path: "/product-suggestions",
    color: "bg-tuff-pastel-yellow/20"
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="space-y-10 animate-fade-in">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl font-bold logo-text">TUFF</h1>
          <p className="text-xl text-muted-foreground">Your AI Fashion Assistant</p>
          <p className="text-muted-foreground">
            Upload your outfits, get personalized style analysis, and discover recommendations
            that enhance your unique fashion sense.
          </p>
          <Button 
            size="lg" 
            className="mt-4"
            onClick={() => navigate("/upload")}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Your First Outfit
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className={cn("flex flex-row items-center gap-4", feature.color)}>
                <div className="bg-white dark:bg-card p-2 rounded-lg">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(feature.path)}
                >
                  Try Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-muted/50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">How TUFF Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-medium">Upload</h3>
              <p className="text-sm text-muted-foreground">
                Upload a photo of your outfit or style you like
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-medium">Analyze</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes colors, fit, and style elements
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-medium">Discover</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations and style insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
