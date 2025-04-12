
import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { GraduationCap, UserCog, School, Briefcase } from 'lucide-react';
import { UserRole } from '@/contexts/AuthContext';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  selectedRole, 
  onSelectRole 
}) => {
  const roles = [
    { 
      id: 'student', 
      title: 'Student', 
      description: 'Access courses, track progress and collaborate',
      icon: GraduationCap 
    },
    { 
      id: 'faculty', 
      title: 'Faculty', 
      description: 'Manage courses, track student progress',
      icon: School 
    },
    { 
      id: 'admin', 
      title: 'Admin', 
      description: 'Full control over users, courses and content',
      icon: UserCog 
    },
    { 
      id: 'placement', 
      title: 'Placement Panel', 
      description: 'Track placements, manage company relationships',
      icon: Briefcase 
    },
  ];
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {roles.map((role) => {
        const isSelected = selectedRole === role.id;
        const RoleIcon = role.icon;
        
        return (
          <Card 
            key={role.id}
            className={`cursor-pointer transition-all ${
              isSelected 
                ? 'border-learnify-500 ring-2 ring-learnify-500/20' 
                : 'hover:border-learnify-300 dark:hover:border-learnify-700'
            }`}
            onClick={() => onSelectRole(role.id as UserRole)}
          >
            <CardHeader className="space-y-1">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{role.title}</CardTitle>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-learnify-500 text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  <RoleIcon className="h-4 w-4" />
                </div>
              </div>
              <CardDescription className="text-xs">
                {role.description}
              </CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
};
