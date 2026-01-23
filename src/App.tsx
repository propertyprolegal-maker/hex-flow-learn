import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import CategoryCourses from "./pages/CategoryCourses";
import SchoolsPage from "./pages/SchoolsPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import AnchorCoursesPage from "./pages/AnchorCoursesPage";
import WorkshopsPage from "./pages/WorkshopsPage";
import CareersPage from "./pages/CareersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses/schools" element={<SchoolsPage />} />
            <Route path="/courses/universities" element={<UniversitiesPage />} />
            <Route path="/courses/anchor-courses" element={<AnchorCoursesPage />} />
            <Route path="/courses/workshops" element={<WorkshopsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/courses/:category" element={<CategoryCourses />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
