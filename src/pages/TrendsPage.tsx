
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TrendingUp, Calendar, MapPin, Users } from "lucide-react";
import { ColorCircle } from "@/components/ColorCircle";

// Mock trending data
const trendingColors = [
  { color: "#6A8D73", name: "Sage Green" },
  { color: "#F1D5B7", name: "Sand" },
  { color: "#965E5E", name: "Rustic Clay" },
  { color: "#323E4F", name: "Navy Blue" },
  { color: "#EFEBE5", name: "Cream" },
];

const trendingStyles = [
  {
    id: 1,
    name: "Coastal Grandma",
    image: "https://images.unsplash.com/photo-1567459169588-52cd265e65d4",
    description: "Relaxed linen pieces, neutral colors, and coastal-inspired accessories with a hint of nautical influence.",
    popularity: 89
  },
  {
    id: 2,
    name: "Quiet Luxury",
    image: "https://images.unsplash.com/photo-1575429076211-47123208fac3",
    description: "Minimalist designs, high-quality fabrics, and understated elegance with subtle branding.",
    popularity: 94
  },
  {
    id: 3,
    name: "Y2K Revival",
    image: "https://images.unsplash.com/photo-1596453410913-f646163547b7",
    description: "Low-rise jeans, crop tops, mini skirts, and bold colors reminiscent of early 2000s fashion.",
    popularity: 78
  },
  {
    id: 4,
    name: "Coquette Aesthetic",
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223",
    description: "Feminine details like bows, lace, pastels, and romantic silhouettes with a playful touch.",
    popularity: 83
  },
];

const trendingItems = [
  {
    id: 1,
    name: "Oversized Blazer",
    image: "https://images.unsplash.com/photo-1591813916067-abd617b5e9f8",
    category: "Outerwear",
    popularity: 92
  },
  {
    id: 2,
    name: "Wide Leg Pants",
    image: "https://images.unsplash.com/photo-1580651214613-f4692d6d138f",
    category: "Bottoms",
    popularity: 88
  },
  {
    id: 3,
    name: "Platform Boots",
    image: "https://images.unsplash.com/photo-1630611250087-2b226786181e",
    category: "Footwear",
    popularity: 85
  },
  {
    id: 4,
    name: "Statement Collar",
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6",
    category: "Tops",
    popularity: 79
  },
  {
    id: 5,
    name: "Y2K Mini Bag",
    image: "https://images.unsplash.com/photo-1590739225300-f9f1b04cdcc6",
    category: "Accessories",
    popularity: 87
  },
];

const TrendsPage = () => {
  const [location, setLocation] = useState("Global");
  const [timeframe, setTimeframe] = useState("This Week");
  
  return (
    <AppLayout title="Fashion Trends">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-primary" />
              Fashion Trends
            </h1>
            <p className="text-muted-foreground">
              Stay updated with the latest styles and fashion movements
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {timeframe}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              For You
            </Badge>
          </div>
        </div>
        
        <Tabs defaultValue="styles" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="styles">Trending Styles</TabsTrigger>
            <TabsTrigger value="colors">Trending Colors</TabsTrigger>
            <TabsTrigger value="items">Trending Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="styles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trendingStyles.map((style) => (
                <Card key={style.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={style.image} 
                      alt={style.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{style.name}</CardTitle>
                      <Badge className="bg-primary">
                        {style.popularity}% Popular
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{style.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Explore This Style</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette of the Season</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center flex-wrap gap-8 py-6">
                  {trendingColors.map((color, index) => (
                    <ColorCircle
                      key={index}
                      color={color.color}
                      name={color.name}
                      size="lg"
                    />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    This season's palette features earth tones complemented by soft neutrals,
                    creating a grounded yet versatile color story that works for various occasions.
                  </p>
                  <Button>Find Items In These Colors</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="items" className="space-y-6">
            <Carousel>
              <CarouselContent>
                {trendingItems.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card>
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold">{item.name}</h3>
                          <Badge variant="secondary">{item.category}</Badge>
                        </div>
                        <div className="w-full bg-muted h-2 rounded-full">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${item.popularity}%` }}
                          />
                        </div>
                        <p className="text-xs text-right mt-1 text-muted-foreground">
                          {item.popularity}% Trending
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                These trending items are being featured in street style, social media, and fashion publications.
                They're versatile pieces that can be incorporated into various outfits.
              </p>
              <Button>Shop Trending Items</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default TrendsPage;
