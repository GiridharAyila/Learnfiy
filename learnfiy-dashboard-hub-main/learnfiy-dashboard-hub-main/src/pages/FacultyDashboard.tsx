
import React from 'react';
import { Layout } from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  UserCircle, 
  PlusCircle,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FacultyDashboard = () => {
  const navigate = useNavigate();
  const userName = "Prof. Williams";
  
  // Mock courses data
  const courses = [
    {
      id: 1,
      title: 'Introduction to Programming',
      students: 42,
      lastUpdated: 'Today',
      nextSession: 'Tomorrow, 10:00 AM',
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      students: 38,
      lastUpdated: '2 days ago',
      nextSession: 'Apr 16, 2025, 2:00 PM',
    },
    {
      id: 3,
      title: 'Database Management Systems',
      students: 35,
      lastUpdated: '3 days ago',
      nextSession: 'Apr 17, 2025, 9:30 AM',
    },
  ];

  // Faculty actions
  const facultyActions = [
    {
      title: 'Manage Students',
      description: 'View and manage student enrollment',
      icon: Users,
      href: '/students',
    },
    {
      title: 'Create Assignment',
      description: 'Add assignments to your courses',
      icon: FileText,
      href: '/assignments/new',
    },
    {
      title: 'Message Center',
      description: 'Communicate with your students',
      icon: MessageSquare,
      href: '/messages',
    },
    {
      title: 'Manage Schedule',
      description: 'Update class schedule and office hours',
      icon: Calendar,
      href: '/schedule',
    },
    {
      title: 'Analytics',
      description: 'Track student progress and engagement',
      icon: BarChart3,
      href: '/analytics',
    },
  ];

  return (
    <Layout title="Faculty Dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Faculty Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={() => navigate('/profile')}
            >
              <UserCircle className="h-5 w-5" />
              <span className="hidden md:inline">Profile</span>
            </Button>
          </div>
        </div>
        
        {/* Welcome Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-learnify-500 text-white text-xl">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2 flex-1">
                <div>
                  <h2 className="text-xl font-semibold">Welcome back, {userName}!</h2>
                  <p className="text-muted-foreground">You have 3 courses and 115 active students</p>
                </div>
              </div>
              
              <Button className="w-full md:w-auto" onClick={() => navigate('/courses/new')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Courses and Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Courses Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Courses</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {courses.map(course => (
                <Card key={course.id}>
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-medium">{course.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{course.students} students</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/courses/${course.id}`)}
                        >
                          Manage
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => navigate(`/courses/${course.id}/students`)}
                        >
                          View Students
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            
            <div className="space-y-3">
              {facultyActions.map(action => (
                <Card key={action.title} className="hover:border-learnify-300 transition-colors cursor-pointer">
                  <CardContent className="p-4" onClick={() => navigate(action.href)}>
                    <div className="flex items-start space-x-3">
                      <div className="bg-learnify-100 dark:bg-gray-800 rounded-md p-2">
                        <action.icon className="h-5 w-5 text-learnify-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
