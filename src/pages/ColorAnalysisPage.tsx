
import { useState, useRef } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ColorCircle } from "@/components/ColorCircle";
import { Palette, Upload, Image as ImageIcon, Eye, Droplet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SkintoneMatch } from "@/components/SkintoneMatch";

// Mock skin tone palette data - this would ideally come from a more sophisticated analysis
const skinTonePalettes = [
  {
    id: "fair-cool",
    name: "Fair Cool",
    primaryColor: "#F5D7D1",
    complementaryColors: [
      { color: "#1E3E5B", name: "Navy Blue" },
      { color: "#6F4E7C", name: "Purple" },
      { color: "#96616B", name: "Mauve" },
      { color: "#626D71", name: "Slate Gray" },
    ]
  },
  {
    id: "fair-warm",
    name: "Fair Warm",
    primaryColor: "#F4DFCF",
    complementaryColors: [
      { color: "#5B7D5B", name: "Olive Green" },
      { color: "#AA6F2B", name: "Bronze" },
      { color: "#BB8A52", name: "Camel" },
      { color: "#9B4B4B", name: "Terracotta" },
    ]
  },
  {
    id: "medium-cool",
    name: "Medium Cool",
    primaryColor: "#DAB394",
    complementaryColors: [
      { color: "#4D668B", name: "Steel Blue" },
      { color: "#6B8E23", name: "Forest Green" },
      { color: "#AA7B82", name: "Rose" },
      { color: "#363636", name: "Charcoal" },
    ]
  },
  {
    id: "medium-warm",
    name: "Medium Warm", 
    primaryColor: "#C68642",
    complementaryColors: [
      { color: "#006666", name: "Teal" },
      { color: "#8A4117", name: "Burnt Sienna" },
      { color: "#DAA520", name: "Goldenrod" },
      { color: "#800020", name: "Burgundy" },
    ]
  },
  {
    id: "deep-cool",
    name: "Deep Cool",
    primaryColor: "#8D5524",
    complementaryColors: [
      { color: "#E86100", name: "Bright Orange" },
      { color: "#01796F", name: "Turquoise" },
      { color: "#FFFF00", name: "Yellow" },
      { color: "#C2B280", name: "Sand" },
    ]
  },
  {
    id: "deep-warm",
    name: "Deep Warm",
    primaryColor: "#6A4C35",
    complementaryColors: [
      { color: "#FF8C00", name: "Orange" },
      { color: "#FFD700", name: "Gold" },
      { color: "#228B22", name: "Forest Green" },
      { color: "#CD7F32", name: "Bronze" },
    ]
  },
  {
    id: "deep-neutral",
    name: "Deep Neutral",
    primaryColor: "#3C2218",
    complementaryColors: [
      { color: "#FFFFFF", name: "White" },
      { color: "#C0C0C0", name: "Silver" },
      { color: "#FFD700", name: "Gold" },
      { color: "#FF0000", name: "Red" },
    ]
  }
];

const ColorAnalysisPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [analysisResult, setAnalysisResult] = useState<{
    skintone: (typeof skinTonePalettes)[0] | null;
    eyeShape: string | null;
    jawline: string | null;
  }>({
    skintone: null,
    eyeShape: null,
    jawline: null
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

  const handleAnalyze = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay - in a real app, this would be a call to a backend service
    setTimeout(() => {
      // Mock analysis result - randomly select a skin tone palette
      const randomPalette = skinTonePalettes[Math.floor(Math.random() * skinTonePalettes.length)];
      
      // Mock eye shape and jawline detection
      const eyeShapes = ["Almond", "Round", "Monolid", "Hooded", "Downturned"];
      const jawlines = ["Angular", "Square", "Round", "Heart", "Oval"];
      
      setAnalysisResult({
        skintone: randomPalette,
        eyeShape: eyeShapes[Math.floor(Math.random() * eyeShapes.length)],
        jawline: jawlines[Math.floor(Math.random() * jawlines.length)]
      });
      
      setIsAnalyzing(false);
      setActiveTab("results");
    }, 2000);
  };

  return (
    <AppLayout title="Color & Facial Analysis" hideSearch>
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Skin Tone & Facial Analysis
            </CardTitle>
            <CardDescription>
              Upload a clear selfie to analyze your skin tone, eye shape, and facial features
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
                  className="image-upload-container aspect-square flex flex-col items-center justify-center"
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
                    Our AI will analyze your facial features to provide personalized recommendations
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
                        <Eye className="h-3 w-3" /> Eye Shape
                      </Badge>
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <Palette className="h-3 w-3" /> Color Palette
                      </Badge>
                    </div>
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
                    <CardTitle>Your Skin Tone Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <SkintoneMatch 
                        name={analysisResult.skintone.name}
                        color={analysisResult.skintone.primaryColor}
                      />
                      
                      <div className="mt-6 text-center">
                        <h3 className="text-lg font-medium mb-2">Facial Features</h3>
                        <div className="flex justify-center gap-6">
                          <div className="space-y-1 text-center">
                            <p className="text-sm text-muted-foreground">Eye Shape</p>
                            <Badge variant="outline">{analysisResult.eyeShape}</Badge>
                          </div>
                          <div className="space-y-1 text-center">
                            <p className="text-sm text-muted-foreground">Jawline</p>
                            <Badge variant="outline">{analysisResult.jawline}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Your Complementary Colors</CardTitle>
                    <CardDescription>
                      These colors will complement your skin tone in outfits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center gap-6 py-4">
                      {analysisResult.skintone.complementaryColors.map((color, index) => (
                        <ColorCircle 
                          key={index} 
                          color={color.color} 
                          name={color.name} 
                          size="lg"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Use these color recommendations when choosing your outfits for a more harmonious look
                  </p>
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
