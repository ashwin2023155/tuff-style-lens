
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BrandCardProps {
  name: string;
  image: string;
  category: string;
  className?: string;
}

export const BrandCard = ({
  name,
  image,
  category,
  className
}: BrandCardProps) => {
  return (
    <Card className={cn("overflow-hidden h-full flex flex-col", className)}>
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Badge variant="outline">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">
          Perfect match for your style profile.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Shop Now</Button>
      </CardFooter>
    </Card>
  );
};
