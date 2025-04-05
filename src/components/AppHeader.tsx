
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppHeaderProps {
  title?: string;
  hideSearch?: boolean;
}

export const AppHeader = ({ title, hideSearch = false }: AppHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <header className={cn(
      "sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border py-2",
      isMobile ? "pl-16" : "pl-4" 
    )}>
      <div className="flex items-center justify-between pr-4">
        {title && (
          <h1 className="text-xl font-bold px-4">{title}</h1>
        )}
        
        <div className="flex-1 flex items-center justify-end gap-2">
          {!hideSearch && (
            <div className="relative max-w-md w-full mr-2 hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 bg-muted/50 border-none"
              />
            </div>
          )}
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
