
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BookOpen, Calendar, Code, BarChart2, MessageSquare, 
  Briefcase, Settings, Home, Menu, X, User, Grid,
  PieChart, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

type NavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  active?: boolean;
};

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems: NavItem[] = [
    { 
      label: 'Dashboard', 
      icon: Home, 
      href: '/dashboard',
      active: location.pathname.includes('/dashboard')
    },
    { 
      label: 'My Courses', 
      icon: BookOpen, 
      href: '/courses',
      active: location.pathname.includes('/courses')
    },
    { 
      label: 'Schedule', 
      icon: Calendar, 
      href: '/schedule',
      active: location.pathname.includes('/schedule')
    },
    { 
      label: 'Code Editor', 
      icon: Code, 
      href: '/code-editor',
      active: location.pathname.includes('/code-editor')
    },
    { 
      label: 'Analysis', 
      icon: BarChart2, 
      href: '/analysis',
      active: location.pathname.includes('/analysis')
    },
    { 
      label: 'Messages', 
      icon: MessageSquare, 
      href: '/messages',
      active: location.pathname.includes('/messages')
    },
    { 
      label: 'Career', 
      icon: Briefcase, 
      href: '/career',
      active: location.pathname.includes('/career')
    },
    { 
      label: 'Profile', 
      icon: User, 
      href: '/profile',
      active: location.pathname.includes('/profile')
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      href: '/settings',
      active: location.pathname.includes('/settings')
    },
  ];

  return (
    <>
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50" 
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
      
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-200",
          isMobile ? (isOpen ? "opacity-100" : "opacity-0 pointer-events-none") : "hidden"
        )}
        onClick={toggleSidebar}
      />
      
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full z-50 bg-sidebar border-r border-sidebar-border transition-all duration-300 shadow-lg",
          isMobile ? 
            (isOpen ? "translate-x-0 w-64" : "-translate-x-full") : 
            "w-64 translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-learnify-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Learnify</h1>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                item.active 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};
