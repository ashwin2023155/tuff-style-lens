
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  useEffect(() => {
    // Initial theme detection
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    
    // Create a mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          const isDarkMode = document.documentElement.classList.contains("dark");
          setTheme(isDarkMode ? "dark" : "light");
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };
  
  return (
    <div className={className}>
      <img 
        src={theme === "dark" 
          ? "/lovable-uploads/a4862d7e-c581-472e-8362-3d969e06ddc5.png" 
          : "/lovable-uploads/d1ca0f13-cde2-4176-b99a-09f4cb2f5bd0.png"
        }
        alt="TUFF Logo"
        className={`${sizeClasses[size]} transition-opacity duration-300`}
      />
    </div>
  );
};
