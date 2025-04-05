
import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ScoreDisplay = ({ 
  score, 
  maxScore = 10, 
  size = "md",
  className
}: ScoreDisplayProps) => {
  const percentage = (score / maxScore) * 100;
  
  const getColor = () => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-amber-500";
    return "text-red-500";
  };
  
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl"
  };
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("font-bold", getColor(), sizeClasses[size])}>
        {score.toFixed(1)}
        <span className="text-muted-foreground text-base">/{maxScore}</span>
      </div>
    </div>
  );
};
