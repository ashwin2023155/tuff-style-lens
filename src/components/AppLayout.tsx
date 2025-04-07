
import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChatBot } from "./ChatBot";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  hideSearch?: boolean;
  className?: string;
}

export const AppLayout = ({ 
  children, 
  title,
  hideSearch,
  className 
}: AppLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <main className={cn(
        "flex-1 flex flex-col min-h-screen",
        isMobile ? "pl-0" : "pl-64"
      )}>
        <AppHeader title={title} hideSearch={hideSearch} />
        <div className={cn("flex-1 p-4 md:p-6", className)}>
          {children}
        </div>
        <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t border-border">
          © TUFF 2025. All rights reserved.
        </footer>
      </main>
      <ChatBot />
    </div>
  );
};
