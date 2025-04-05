
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image } from "lucide-react";
import { toast } from "sonner";

const UploadPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsUploading(false);
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    }, 1000);
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
    
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate("/results", { state: { image } });
    }, 2000);
  };

  return (
    <AppLayout title="Upload Your Outfit" hideSearch>
      <div className="max-w-2xl mx-auto pt-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <p className="text-center text-muted-foreground">
              Upload a clear image showing your full outfit for AI analysis
            </p>
            
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            {image ? (
              <div className="relative overflow-hidden rounded-xl border border-border">
                <img
                  src={image}
                  alt="Outfit preview"
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
            ) : (
              <div 
                className="image-upload-container aspect-square flex flex-col items-center justify-center"
                onClick={handleUploadClick}
              >
                <Image className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Drag and drop or click to upload</p>
                <p className="text-sm text-muted-foreground">
                  Support for JPG, PNG, WEBP
                </p>
                {isUploading && (
                  <div className="mt-4 text-primary">Uploading...</div>
                )}
              </div>
            )}
            
            <Button 
              className="w-full h-12 text-base"
              onClick={handleAnalyze}
              disabled={!image || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze My Look"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default UploadPage;
