
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, GitHub, Facebook } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup, googleSignIn, facebookSignIn, githubSignIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      toast({
        title: "Account created successfully!",
        description: "Please choose your role to continue.",
      });
      navigate('/role-selector');
    } catch (error: any) {
      setError(error.message || 'Failed to create an account');
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || 'Failed to create an account',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      navigate('/role-selector');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
      toast({
        variant: "destructive",
        title: "Google Sign In Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleFacebookSignIn = async () => {
    try {
      setLoading(true);
      await facebookSignIn();
      navigate('/role-selector');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Facebook');
      toast({
        variant: "destructive",
        title: "Facebook Sign In Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      await githubSignIn();
      navigate('/role-selector');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with GitHub');
      toast({
        variant: "destructive",
        title: "GitHub Sign In Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Sign up to SkillStreak Academy to start learning
          </p>
        </div>
        
        {error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-muted-foreground"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
            <FcGoogle className="h-5 w-5 mr-2" />
            Google
          </Button>
          <Button variant="outline" className="w-full" onClick={handleFacebookSignIn} disabled={loading}>
            <Facebook className="h-5 w-5 mr-2 text-blue-600" />
            Facebook
          </Button>
          <Button variant="outline" className="w-full" onClick={handleGithubSignIn} disabled={loading}>
            <GitHub className="h-5 w-5 mr-2" />
            GitHub
          </Button>
        </div>
        
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
