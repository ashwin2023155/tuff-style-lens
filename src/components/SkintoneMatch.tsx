
import { cn } from "@/lib/utils";

interface SkintoneMatchProps {
  name: string;
  color: string;
  className?: string;
}

export const SkintoneMatch = ({ name, color, className }: SkintoneMatchProps) => {
  return (
    <div className={cn("text-center", className)}>
      <div 
        className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto mb-3"
        style={{ backgroundColor: color }}
      />
      <div className="space-y-1">
        <h3 className="text-xl font-medium">Your skin tone is</h3>
        <p className="text-2xl font-bold text-primary">{name}</p>
        <p className="text-xs text-muted-foreground">{color.toUpperCase()}</p>
      </div>
    </div>
  );
};
