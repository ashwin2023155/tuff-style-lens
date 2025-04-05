
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StyleLabelProps {
  label: string;
  value: string;
  className?: string;
}

export const StyleLabel = ({ label, value, className }: StyleLabelProps) => {
  return (
    <div className={cn("flex flex-col gap-1 items-center", className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <Badge variant="outline" className="px-3 py-1 font-medium">
        {value}
      </Badge>
    </div>
  );
};
