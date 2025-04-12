
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/AuthLayout';
import { RoleSelector as RoleSelectorComponent } from '@/components/RoleSelector';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/contexts/AuthContext';
import { ChevronRight } from 'lucide-react';

export const RoleSelector = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);
  
  const { setUserRole, currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleContinue = () => {
    if (!selectedRole) {
      toast({
        variant: "destructive",
        title: "Role Required",
        description: "Please select a role to continue",
      });
      return;
    }
    
    try {
      setLoading(true);
      setUserRole(selectedRole);
      
      // In a real app, you would save the user's role to your database here
      
      // Navigate to the appropriate dashboard based on selected role
      navigate(`/dashboard/${selectedRole}`);
      
      toast({
        title: "Role selected",
        description: `You are now logged in as a ${selectedRole}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to set user role",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Choose Your Role</h1>
          <p className="text-muted-foreground">
            Select how you want to use SkillStreak Academy
          </p>
        </div>
        
        <div className="py-4">
          <RoleSelectorComponent
            selectedRole={selectedRole}
            onSelectRole={setSelectedRole}
          />
        </div>
        
        <Button 
          className="w-full flex items-center justify-center"
          onClick={handleContinue}
          disabled={!selectedRole || loading}
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        
        <div className="text-xs text-center text-muted-foreground">
          You can change your role later in the settings
        </div>
      </div>
    </AuthLayout>
  );
};
