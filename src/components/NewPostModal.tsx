
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPostModal = ({ isOpen, onClose }: NewPostModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [season, setSeason] = useState("");
  const [occasion, setOccasion] = useState("");
  const [brand, setBrand] = useState("");
  const [style, setStyle] = useState("");
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }
    
    // Convert to base64 for preview
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!image) {
      toast({
        title: "Image required",
        description: "Please upload an image of your outfit",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your backend
    toast({
      title: "Post created!",
      description: "Your outfit has been posted successfully",
    });
    
    // Close modal and reset form
    onClose();
    setImage(null);
    setCaption("");
    setSeason("");
    setOccasion("");
    setBrand("");
    setStyle("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Preview"
                className="w-full aspect-square object-cover rounded-md"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-muted-foreground/30 rounded-md p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={handleUploadClick}
            >
              <Image className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                Drag and drop or click to upload
              </p>
            </div>
          )}
          
          {/* Caption */}
          <Textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="resize-none"
            rows={3}
          />
          
          {/* Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Season</label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spring">Spring</SelectItem>
                  <SelectItem value="Summer">Summer</SelectItem>
                  <SelectItem value="Autumn">Autumn</SelectItem>
                  <SelectItem value="Winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Occasion</label>
              <Select value={occasion} onValueChange={setOccasion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select occasion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Party">Party</SelectItem>
                  <SelectItem value="Sport">Sport</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Input
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Style Type</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Minimalist">Minimalist</SelectItem>
                  <SelectItem value="Streetwear">Streetwear</SelectItem>
                  <SelectItem value="Classic">Classic</SelectItem>
                  <SelectItem value="Vintage">Vintage</SelectItem>
                  <SelectItem value="Bohemian">Bohemian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
