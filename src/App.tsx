
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";
import ChatPage from "./pages/ChatPage";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import StyleSuggestPage from "./pages/StyleSuggestPage";
import ProductSuggestPage from "./pages/ProductSuggestPage";
import LookbookPage from "./pages/LookbookPage";
import ColorAnalysisPage from "./pages/ColorAnalysisPage";
import VirtualTryOnPage from "./pages/VirtualTryOnPage";
import FashionEducationPage from "./pages/FashionEducationPage";
import TrendsPage from "./pages/TrendsPage";
import SQCalculatorPage from "./pages/SQCalculatorPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<FeedPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:conversationId" element={<ChatPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/style-suggestions" element={<StyleSuggestPage />} />
          <Route path="/product-suggestions" element={<ProductSuggestPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/color-analysis" element={<ColorAnalysisPage />} />
          <Route path="/virtual-try-on" element={<VirtualTryOnPage />} />
          <Route path="/fashion-education" element={<FashionEducationPage />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="/sq-calculator" element={<SQCalculatorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
