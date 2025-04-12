
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleSelector } from "./components/RoleSelector";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Register } from "./pages/Register";
import { StudentDashboard } from "./pages/StudentDashboard";
import { FacultyDashboard } from "./pages/FacultyDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PlacementDashboard } from "./pages/PlacementDashboard";
import { Settings } from "./pages/Settings";
import { Courses } from "./pages/Courses";
import { Schedule } from "./pages/Schedule";
import { CodeEditor } from "./pages/CodeEditor";
import { Analysis } from "./pages/Analysis";
import { Messages } from "./pages/Messages";
import { Profile } from "./pages/Profile";
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
            {/* Auth Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/role-selector" element={<RoleSelector />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              {/* Dashboard Routes */}
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/dashboard/placement" element={<PlacementDashboard />} />
              
              {/* Settings */}
              <Route path="/settings" element={<Settings />} />
              
              {/* Courses */}
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<Courses />} />
              
              {/* Schedule */}
              <Route path="/schedule" element={<Schedule />} />
              
              {/* Code Editor */}
              <Route path="/code-editor" element={<CodeEditor />} />
              
              {/* Analysis */}
              <Route path="/analysis" element={<Analysis />} />
              
              {/* Messages */}
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:id" element={<Messages />} />
              
              {/* Profile */}
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
