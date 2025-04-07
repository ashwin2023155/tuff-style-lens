
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";

const HomePage = () => {
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <AppLayout>
      <motion.div 
        className="max-w-3xl mx-auto space-y-12 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center space-y-6"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center justify-center mb-6">
            <Logo size="lg" className="mb-4" />
            <h1 className="text-5xl font-bold logo-text">TUFF</h1>
          </div>
          <p className="text-2xl font-medium text-foreground/90">Your AI Fashion Assistant</p>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Elevate your style with AI-powered analysis and personalized recommendations
          </p>
        </motion.div>
        
        {/* Main Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={itemVariants}
        >
          {/* Outfit Analyzer Card */}
          <motion.div 
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="h-full"
          >
            <Card className="overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow border-2 border-primary/5 bg-gradient-to-br from-background to-accent/5">
              <CardContent className="p-0">
                <div className="p-8 flex flex-col h-full">
                  <div className="mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">Outfit Analyzer</h2>
                  
                  <p className="text-muted-foreground mb-6 flex-grow">
                    Upload your outfit for instant AI analysis. Get personalized style feedback, color matching, and improvement suggestions.
                  </p>
                  
                  <Button 
                    size="lg" 
                    className="w-full mt-auto group"
                    onClick={() => navigate("/upload")}
                  >
                    Analyze My Outfit
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Color Analysis Card */}
          <motion.div 
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="h-full"
          >
            <Card className="overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow border-2 border-primary/5 bg-gradient-to-br from-background to-accent/5">
              <CardContent className="p-0">
                <div className="p-8 flex flex-col h-full">
                  <div className="mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Palette className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">Color Analysis</h2>
                  
                  <p className="text-muted-foreground mb-6 flex-grow">
                    Discover your perfect color palette based on your skin tone. Find your seasonal color type and most flattering shades.
                  </p>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full mt-auto group"
                    onClick={() => navigate("/color-analysis")}
                  >
                    Find My Colors
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* How It Works Section */}
        <motion.div 
          className="bg-muted/30 rounded-2xl p-8 text-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6">How TUFF Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-3">
              <motion.div 
                className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-primary font-bold">1</span>
              </motion.div>
              <h3 className="font-medium">Upload</h3>
              <p className="text-sm text-muted-foreground">
                Upload a photo of your outfit or take a selfie
              </p>
            </div>
            
            <div className="space-y-3">
              <motion.div 
                className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-primary font-bold">2</span>
              </motion.div>
              <h3 className="font-medium">Analyze</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes colors, fit, and style elements
              </p>
            </div>
            
            <div className="space-y-3">
              <motion.div 
                className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-primary font-bold">3</span>
              </motion.div>
              <h3 className="font-medium">Discover</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations and insights
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default HomePage;
