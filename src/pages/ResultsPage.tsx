
import { useLocation, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorCircle } from "@/components/ColorCircle";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { StyleLabel } from "@/components/StyleLabel";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// Mock analysis data
const mockAnalysisData = {
  score: 8.5,
  feedback: "Your outfit showcases excellent color harmony and proportional balance. The silhouette flatters your body type, and the casual-chic aesthetic works well for everyday wear.",
  colors: [
    { color: "#3B6291", name: "Navy Blue" },
    { color: "#F4E9E1", name: "Cream" },
    { color: "#A77E58", name: "Camel" },
    { color: "#2D2B2C", name: "Charcoal" },
  ],
  attributes: {
    skinTone: "Warm",
    brightness: "Medium",
    contrast: "Low-Medium"
  }
};

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState(mockAnalysisData);
  
  const image = location.state?.image || "/placeholder.svg";

  useEffect(() => {
    // Simulate loading analysis data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleViewSuggestions = () => {
    navigate("/style-suggestions", { state: { image, analysisData } });
  };

  return (
    <AppLayout title="Style Analysis Results" hideSearch>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 animate-fade-in">
        <div className="md:col-span-2">
          <Card className="overflow-hidden sticky top-24">
            <div className="aspect-square">
              <img 
                src={image} 
                alt="Analyzed outfit" 
                className="w-full h-full object-cover" 
              />
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          {isLoading ? (
            <Card>
              <CardContent className="p-6 flex justify-center items-center h-48">
                <p>Analyzing your outfit...</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Style Score</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center pb-2">
                  <ScoreDisplay score={analysisData.score} size="lg" className="mb-4" />
                  <p className="text-center text-muted-foreground">
                    {analysisData.feedback}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Color Palette</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-6 py-2">
                    {analysisData.colors.map((color, index) => (
                      <ColorCircle 
                        key={index} 
                        color={color.color} 
                        name={color.name} 
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Style Attributes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-6 flex-wrap py-2">
                    <StyleLabel label="Skin Tone" value={analysisData.attributes.skinTone} />
                    <StyleLabel label="Brightness" value={analysisData.attributes.brightness} />
                    <StyleLabel label="Contrast" value={analysisData.attributes.contrast} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleViewSuggestions}
                    className="w-full"
                  >
                    View Style Suggestions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ResultsPage;
