
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScoreDisplay } from "./ScoreDisplay";
import { cn } from "@/lib/utils";

interface OutfitCardProps {
  image: string;
  score: number;
  feedback: string;
  date?: string;
  className?: string;
  onClick?: () => void;
}

export const OutfitCard = ({
  image,
  score,
  feedback,
  date,
  className,
  onClick
}: OutfitCardProps) => {
  return (
    <Card 
      className={cn("overflow-hidden hover:shadow-md transition-shadow cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt="Outfit" 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <ScoreDisplay score={score} size="sm" />
          {date && <span className="text-xs text-muted-foreground">{date}</span>}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{feedback}</p>
      </CardContent>
    </Card>
  );
};
