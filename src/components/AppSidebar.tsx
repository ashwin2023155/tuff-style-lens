
import { 
  Home, 
  Upload, 
  Book, 
  ShoppingBag, 
  Palette, 
  User,
  Menu,
  X,
  Droplet,
  MessageSquare,
  Grid,
  TrendingUp,
  Award
} from "lucide-react";
import { useState, useEffect } from "react";
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

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      closeSidebar();
    }
  }, [location.pathname, isMobile]);

  // Handle body scroll lock when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isOpen]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!isMobile || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const trigger = document.getElementById('sidebar-trigger');
      
      if (sidebar && !sidebar.contains(event.target as Node) && 
          trigger && !trigger.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {isMobile && (
        <Button 
          id="sidebar-trigger"
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-background/90 backdrop-blur-sm border border-border shadow-lg hover:bg-background/95"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside 
        id="mobile-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border flex flex-col shadow-lg",
          isMobile && "transform transition-transform duration-300 ease-in-out",
          isMobile && (isOpen ? "translate-x-0" : "-translate-x-full"),
          !isMobile && "translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold logo-text">TUFF</h1>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/" icon={Grid} label="Feed" end onClick={closeSidebar} />
          <NavItem to="/home" icon={Home} label="Home" onClick={closeSidebar} />
          <NavItem to="/upload" icon={Upload} label="Upload Outfit" onClick={closeSidebar} />
          <NavItem to="/messages" icon={MessageSquare} label="Messages" onClick={closeSidebar} />
          <NavItem to="/lookbook" icon={Book} label="Lookbook" onClick={closeSidebar} />
          <NavItem to="/color-analysis" icon={Droplet} label="Color Analysis" onClick={closeSidebar} />
          <NavItem to="/style-suggestions" icon={Palette} label="Style Suggestions" onClick={closeSidebar} />
          <NavItem to="/product-suggestions" icon={ShoppingBag} label="Brand Suggestions" onClick={closeSidebar} />
          <NavItem to="/fashion-education" icon={Book} label="Fashion Education" onClick={closeSidebar} />
          <NavItem to="/trends" icon={TrendingUp} label="Fashion Trends" onClick={closeSidebar} />
          <NavItem to="/sq-calculator" icon={Award} label="Style Quotient" onClick={closeSidebar} />
        </nav>

        <div className="p-4 border-t border-sidebar-border flex items-center justify-between">
          <NavLink to="/profile/user1" className="flex items-center gap-2" onClick={closeSidebar}>
            <Button variant="ghost" size="icon" className="rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </Button>
            <span className="text-sm font-medium">John Doe</span>
          </NavLink>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
};
