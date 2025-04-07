
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StyleLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const StyleLabel = ({ children, className }: StyleLabelProps) => {
  return (
    <Badge variant="outline" className={cn("px-3 py-1 font-medium", className)}>
      {children}
    </Badge>
  );
};
