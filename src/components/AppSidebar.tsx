
import { 
  Home, 
  Upload, 
  Book, 
  ShoppingBag, 
  Palette, 
  User, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  end?: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon: Icon, label, end = false, onClick }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      end={end}
      onClick={onClick}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
        isActive && "bg-sidebar-accent text-sidebar-foreground font-medium"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
};

export const AppSidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border flex flex-col",
        isMobile && "transform transition-transform duration-300 ease-in-out",
        isMobile && (isOpen ? "translate-x-0" : "-translate-x-full")
      )}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold logo-text">TUFF</h1>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/" icon={Home} label="Home" end onClick={closeSidebar} />
          <NavItem to="/upload" icon={Upload} label="Upload Outfit" onClick={closeSidebar} />
          <NavItem to="/lookbook" icon={Book} label="Lookbook" onClick={closeSidebar} />
          <NavItem to="/style-suggestions" icon={Palette} label="Style Suggestions" onClick={closeSidebar} />
          <NavItem to="/product-suggestions" icon={ShoppingBag} label="Brand Suggestions" onClick={closeSidebar} />
        </nav>

        <div className="p-4 border-t border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </Button>
            <span className="text-sm font-medium">John Doe</span>
          </div>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
};
