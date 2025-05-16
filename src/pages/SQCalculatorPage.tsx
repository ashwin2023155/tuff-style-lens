
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Upload, 
  CircleCheck, 
  ArrowRight, 
  Star, 
  Palette, 
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Custom SQ score component
const SQScoreCircle = ({ score }: { score: number }) => {
  // Calculate the stroke dash for circle fill
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 90) return "text-primary";
    if (score >= 70) return "text-tuff-pastel-green";
    if (score >= 50) return "text-tuff-pastel-blue";
    return "text-tuff-pastel-peach";
  };
  
  // Determine label based on score
  const getScoreLabel = () => {
    if (score >= 90) return "Fashion Trailblazer";
    if (score >= 70) return "Style Star";
    if (score >= 50) return "Getting There";
    return "Style Rookie";
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-muted/20"
          />
          
          {/* Score circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={getScoreColor()}
            transform="rotate(-90 50 50)"
          />
          
          {/* Inner content */}
          <text
            x="50"
            y="46"
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
            className={getScoreColor()}
          >
            {score}
          </text>
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontSize="8"
            className="text-muted-foreground"
          >
            Style Quotient
          </text>
        </svg>
      </div>
      <p className={`text-xl font-bold mt-2 ${getScoreColor()}`}>
        {getScoreLabel()}
      </p>
    </div>
  );
};

const SQCalculatorPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    colorScore: number;
    trendScore: number;
    harmonyScore: number;
    totalScore: number;
  } | null>(null);
  
  // Mock analysis function
  const analyzeSQ = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Mock results
      setResults({
        colorScore: 85,
        trendScore: 72,
        harmonyScore: 91,
        totalScore: 83
      });
      
      setStep(3);
      toast.success("Style Quotient calculation complete!");
    }, 2000);
  };
  
  return (
    <AppLayout title="Style Quotient Calculator">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Award className="h-8 w-8 text-primary" />
            Style Quotient Calculator
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover your fashion intelligence score and how to improve it
          </p>
        </div>
        
        {step === 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center">What is Style Quotient (SQ)?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                Style Quotient is a comprehensive score that measures your fashion sense
                across multiple dimensions. It helps you understand your style strengths
                and areas for improvement.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center space-y-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-full mx-auto flex items-center justify-center">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Color Match</h3>
                  <p className="text-sm text-muted-foreground">
                    How well your outfits complement your skin tone and color season
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-full mx-auto flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Outfit Harmony</h3>
                  <p className="text-sm text-muted-foreground">
                    Balance, proportion, and cohesiveness of your outfit combinations
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-full mx-auto flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Trend Relevance</h3>
                  <p className="text-sm text-muted-foreground">
                    How your style aligns with current fashion trends and movements
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button size="lg" onClick={() => setStep(2)}>
                Calculate My SQ Score
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Upload for SQ Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground mb-4">
                  Upload a full-body outfit photo for the most accurate SQ score.
                  For best results, ensure good lighting and that your entire outfit is visible.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-32 border-2 border-dashed flex flex-col gap-2"
                    onClick={() => navigate("/upload")}
                  >
                    <Upload className="h-6 w-6" />
                    <span>Upload Outfit Photo</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-32 border-2 border-dashed flex flex-col gap-2"
                    onClick={() => navigate("/color-analysis")}
                  >
                    <Palette className="h-6 w-6" />
                    <span>Complete Color Analysis</span>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={analyzeSQ}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>Analyzing Style Quotient...</>
                  ) : (
                    <>
                      Quick Demo Analysis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="text-center">
              <Button 
                variant="ghost" 
                className="text-muted-foreground"
                onClick={() => setStep(1)}
              >
                Back to Information
              </Button>
            </div>
          </motion.div>
        )}
        
        {step === 3 && results && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center justify-center">
              <SQScoreCircle score={results.totalScore} />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Your Style Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="flex items-center">
                        <Palette className="h-4 w-4 mr-2 text-primary" />
                        Color Match Score
                      </p>
                      <span className="font-medium">{results.colorScore}/100</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${results.colorScore}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                        Trend Relevance Score
                      </p>
                      <span className="font-medium">{results.trendScore}/100</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${results.trendScore}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-primary" />
                        Outfit Harmony Score
                      </p>
                      <span className="font-medium">{results.harmonyScore}/100</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${results.harmonyScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Improvement Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CircleCheck className="h-5 w-5 text-primary mt-1" />
                    <p className="text-sm">
                      <span className="font-medium">Color Match (Great!):</span> Your color choices are very flattering for your skin tone. Continue using these deep blues and warm neutrals.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CircleCheck className="h-5 w-5 text-primary mt-1" />
                    <p className="text-sm">
                      <span className="font-medium">Trend Relevance (Good):</span> Your style incorporates some current trends. Consider exploring more contemporary silhouettes to boost this score.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CircleCheck className="h-5 w-5 text-primary mt-1" />
                    <p className="text-sm">
                      <span className="font-medium">Outfit Harmony (Excellent!):</span> Your outfit proportions and combinations show excellent balance. Keep up this strong sense of cohesion.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-4 justify-center">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => navigate("/style-suggestions")}
                >
                  <Palette className="h-4 w-4" />
                  View Style Suggestions
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => navigate("/trends")}
                >
                  <TrendingUp className="h-4 w-4" />
                  Explore Trends
                </Button>
                
                <Button onClick={() => setStep(1)}>
                  Calculate Again
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default SQCalculatorPage;
