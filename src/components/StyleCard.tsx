
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StyleCardProps {
  title: string;
  image: string;
  description: string;
  className?: string;
}

export const StyleCard = ({
  title,
  image,
  description,
  className
}: StyleCardProps) => {
  return (
    <Card className={cn("overflow-hidden h-full", className)}>
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
