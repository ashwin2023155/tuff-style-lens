
import { useState, useRef } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ColorCircle } from "@/components/ColorCircle";
import { Palette, Upload, Image as ImageIcon, Eye, Droplet, SlidersHorizontal, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SkintoneMatch } from "@/components/SkintoneMatch";
import { StyleLabel } from "@/components/StyleLabel";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

// Seasonal color palettes based on skin tone analysis
const seasonalPalettes = {
  "Spring": {
    primary: "#F4DFCF",
    colors: [
      { color: "#FFDAB9", name: "Peach" },
      { color: "#FFE4B5", name: "Moccasin" },
      { color: "#FA8072", name: "Salmon" },
      { color: "#F4A460", name: "Sandy Brown" },
    ],
    description: "Warm and bright colors that enhance your golden undertone."
  },
  "Summer": {
    primary: "#F5D7D1",
    colors: [
      { color: "#C0C0FF", name: "Periwinkle" },
      { color: "#DDA0DD", name: "Plum" },
      { color: "#B0E0E6", name: "Powder Blue" },
      { color: "#FFC0CB", name: "Pink" },
    ],
    description: "Soft, cool colors that complement your delicate undertone."
  },
  "Autumn": {
    primary: "#C68642",
    colors: [
      { color: "#8B4513", name: "Saddle Brown" },
      { color: "#A0522D", name: "Sienna" },
      { color: "#D2691E", name: "Chocolate" },
      { color: "#556B2F", name: "Olive" },
    ],
    description: "Rich, warm earthy tones that enhance your natural depth."
  },
  "Winter": {
    primary: "#8D5524",
    colors: [
      { color: "#00008B", name: "Dark Blue" },
      { color: "#4682B4", name: "Steel Blue" },
      { color: "#008B8B", name: "Teal" },
      { color: "#B0C4DE", name: "Light Steel Blue" },
    ],
    description: "Bold, cool colors that create striking contrast with your skin."
  }
};

// Undertone classification
const undertones = ["Warm", "Cool", "Neutral"];

// Brightness and contrast levels
const brightnessLevels = ["Light", "Medium", "Deep"];
const contrastLevels = ["Low", "Medium", "High"];

const ColorAnalysisPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [analysisResult, setAnalysisResult] = useState<{
    skintone: {
      name: string;
      color: string;
      undertone: string;
      season: string;
      brightness: string;
      contrast: string;
    } | null;
    complementaryColors: Array<{ color: string; name: string }>;
    description: string;
  }>({
    skintone: null,
    complementaryColors: [],
    description: ""
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setActiveTab("analyze");
      toast.success("Image uploaded successfully");
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const analyzeSkintone = (imageData: string) => {
    // In a real application, we would send the image to a backend server
    // for processing with MediaPipe and color analysis algorithms.
    // For demo purposes, we'll simulate analysis with a random selection.
    
    // 1. Randomly select a season (in a real app, this would be algorithmically determined)
    const seasons = Object.keys(seasonalPalettes);
    const randomSeason = seasons[Math.floor(Math.random() * seasons.length)] as keyof typeof seasonalPalettes;
    
    // 2. Get associated palette
    const palette = seasonalPalettes[randomSeason];
    
    // 3. For the selected season, determine undertone (in real app, would be based on HSV analysis)
    let undertone = "Neutral";
    if (randomSeason === "Spring" || randomSeason === "Autumn") {
      undertone = "Warm";
    } else if (randomSeason === "Summer" || randomSeason === "Winter") {
      undertone = "Cool";
    }
    
    // 4. Determine brightness and contrast based on season
    let brightness = "Medium";
    let contrast = "Medium";
    
    if (randomSeason === "Spring") {
      brightness = "Light";
      contrast = "Low";
    } else if (randomSeason === "Summer") {
      brightness = "Light";
      contrast = "Low";
    } else if (randomSeason === "Autumn") {
      brightness = "Deep";
      contrast = "High";
    } else if (randomSeason === "Winter") {
      brightness = "Deep";
      contrast = "High";
    }
    
    // 5. Create a skintone name based on the analysis
    const depthPrefix = brightness === "Light" ? "Fair" : brightness === "Deep" ? "Deep" : "Medium";
    const skintoneName = `${depthPrefix} ${undertone}`;
    
    return {
      skintone: {
        name: skintoneName,
        color: palette.primary,
        undertone,
        season: randomSeason,
        brightness,
        contrast
      },
      complementaryColors: palette.colors,
      description: palette.description
    };
  };

  const handleAnalyze = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay - in a real app, this would call a backend API
    setTimeout(() => {
      const result = analyzeSkintone(image);
      setAnalysisResult(result);
      
      setIsAnalyzing(false);
      setActiveTab("results");
      toast.success("Analysis complete!");
    }, 2000);
  };

  return (
    <AppLayout title="Color & Facial Analysis" hideSearch>
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Skin Tone & Seasonal Color Analysis
            </CardTitle>
            <CardDescription>
              Upload a clear selfie to analyze your skin tone, undertone, and seasonal color type
              for personalized fashion color recommendations.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="analyze" disabled={!image}>Analyze</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysisResult.skintone}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-0">
            <Card>
              <CardContent className="p-6 space-y-6">
                <p className="text-center text-muted-foreground">
                  Upload a clear selfie in good lighting for accurate analysis
                </p>
                
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                
                <div 
                  className="image-upload-container aspect-square flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors p-6"
                  onClick={handleUploadClick}
                >
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Drag and drop or click to upload</p>
                  <p className="text-sm text-muted-foreground">
                    Support for JPG, PNG, WEBP
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analyze" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                {image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={image}
                      alt="Your selfie"
                      className="w-full aspect-square object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                      onClick={handleUploadClick}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ready to Analyze</CardTitle>
                  <CardDescription>
                    We'll analyze your facial features to provide personalized color recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">This analysis will detect:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <Droplet className="h-3 w-3" /> Skin Tone
                      </Badge>
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <SlidersHorizontal className="h-3 w-3" /> Undertone
                      </Badge>
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <Palette className="h-3 w-3" /> Seasonal Type
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">How it works:</p>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground pl-2">
                      <li>We extract your skin color from the image</li>
                      <li>We analyze your undertone (warm, cool, neutral)</li>
                      <li>We determine your seasonal color type</li>
                      <li>We recommend complementary colors for your wardrobe</li>
                    </ol>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze My Features"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="mt-0">
            {analysisResult.skintone && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Color Analysis Results</CardTitle>
                    <CardDescription>
                      Based on your skin tone, we've determined your personal color profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <SkintoneMatch 
                        name={analysisResult.skintone.name}
                        color={analysisResult.skintone.color}
                        undertone={analysisResult.skintone.undertone}
                        season={analysisResult.skintone.season}
                        brightness={analysisResult.skintone.brightness}
                        contrast={analysisResult.skintone.contrast}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Your Seasonal Color Palette</CardTitle>
                    <CardDescription>
                      {analysisResult.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center gap-6 py-4">
                      {analysisResult.complementaryColors.map((color, index) => (
                        <ColorCircle 
                          key={index} 
                          color={color.color} 
                          name={color.name} 
                          size="lg"
                        />
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-3">
                    <div className="bg-muted/30 p-3 rounded-md w-full">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">Color Harmony Tips</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            These colors will create natural harmony with your skin tone. Use them for clothing, accessories, and makeup to enhance your natural features.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
                
                <div className="text-center">
                  <Button onClick={() => setActiveTab("upload")}>
                    Analyze Another Photo
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ColorAnalysisPage;
