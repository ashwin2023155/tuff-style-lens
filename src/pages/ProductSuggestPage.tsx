
import { AppLayout } from "@/components/AppLayout";
import { BrandCard } from "@/components/BrandCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock brand recommendations
const brandRecommendations = {
  casual: [
    {
      id: 1,
      name: "H&M",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: "Casual"
    },
    {
      id: 2,
      name: "Uniqlo",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "Casual"
    },
    {
      id: 3,
      name: "Madewell",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      category: "Casual"
    }
  ],
  streetwear: [
    {
      id: 4,
      name: "Urban Outfitters",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      category: "Streetwear"
    },
    {
      id: 5,
      name: "Zara",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      category: "Streetwear"
    },
    {
      id: 6,
      name: "Nike",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: "Streetwear"
    }
  ],
  semiformal: [
    {
      id: 7,
      name: "COS",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "Semi-formal"
    },
    {
      id: 8,
      name: "Massimo Dutti",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      category: "Semi-formal"
    },
    {
      id: 9,
      name: "Arket",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: "Semi-formal"
    }
  ]
};

const ProductSuggestPage = () => {
  return (
    <AppLayout title="Suggested Brands">
      <div className="space-y-6 animate-fade-in">
        <Tabs defaultValue="casual">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="casual">Casual</TabsTrigger>
            <TabsTrigger value="streetwear">Streetwear</TabsTrigger>
            <TabsTrigger value="semiformal">Semi-formal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="casual" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brandRecommendations.casual.map((brand) => (
                <BrandCard
                  key={brand.id}
                  name={brand.name}
                  image={brand.image}
                  category={brand.category}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="streetwear" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brandRecommendations.streetwear.map((brand) => (
                <BrandCard
                  key={brand.id}
                  name={brand.name}
                  image={brand.image}
                  category={brand.category}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="semiformal" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brandRecommendations.semiformal.map((brand) => (
                <BrandCard
                  key={brand.id}
                  name={brand.name}
                  image={brand.image}
                  category={brand.category}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-muted/40 rounded-lg p-4 mt-8">
          <h3 className="font-medium mb-2">Why these brands?</h3>
          <p className="text-sm text-muted-foreground">
            Based on your style analysis, body type, and color palette, we've selected brands that offer pieces 
            that will complement your personal style. These recommendations focus on quality, fit, and 
            aesthetic alignment with your fashion preferences.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProductSuggestPage;
