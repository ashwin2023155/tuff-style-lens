
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const UploadPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

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
      <div className={cn(
        "mx-auto pt-6",
        isMobile ? "max-w-full px-2" : "max-w-2xl"
      )}>
        <Card className="overflow-hidden">
          <CardContent className={cn(
            "space-y-6",
            isMobile ? "p-4" : "p-6"
          )}>
            <p className="text-center text-muted-foreground text-sm md:text-base">
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
                  className={cn(
                    "w-full object-cover",
                    isMobile ? "aspect-[3/4] max-h-96" : "aspect-square"
                  )}
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
                className={cn(
                  "image-upload-container flex flex-col items-center justify-center cursor-pointer",
                  isMobile ? "aspect-[3/4] py-8" : "aspect-square"
                )}
                onClick={handleUploadClick}
              >
                <Image className={cn(
                  "text-muted-foreground mb-4",
                  isMobile ? "h-8 w-8" : "h-12 w-12"
                )} />
                <p className={cn(
                  "font-medium text-center",
                  isMobile ? "text-base" : "text-lg"
                )}>
                  {isMobile ? "Tap to upload" : "Drag and drop or click to upload"}
                </p>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Support for JPG, PNG, WEBP
                </p>
                {isUploading && (
                  <div className="mt-4 text-primary text-sm">Uploading...</div>
                )}
              </div>
            )}
            
            <Button 
              className={cn(
                "w-full text-base",
                isMobile ? "h-12" : "h-12"
              )}
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
