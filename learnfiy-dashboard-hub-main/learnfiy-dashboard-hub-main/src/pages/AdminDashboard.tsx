
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  UserCircle, 
  Search,
  Users,
  BookOpen,
  FileText,
  MessageSquare,
  Settings,
  BarChart3,
  UserPlus,
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const userName = "Admin";

  // Mock stats data
  const stats = [
    { title: 'Total Users', value: '1,284', icon: Users, change: '+12%' },
    { title: 'Active Courses', value: '86', icon: BookOpen, change: '+5%' },
    { title: 'Faculty Members', value: '42', icon: UserCircle, change: '+2%' },
    { title: 'Support Tickets', value: '18', icon: MessageSquare, change: '-8%' },
  ];

  // Mock support tickets
  const supportTickets = [
    { 
      id: 1, 
      user: 'John Smith', 
      userType: 'Student',
      subject: 'Login issues with my account', 
      status: 'Open',
      time: '2 hours ago' 
    },
    { 
      id: 2, 
      user: 'Sarah Johnson', 
      userType: 'Faculty',
      subject: 'Need help setting up virtual classroom', 
      status: 'In Progress',
      time: '5 hours ago' 
    },
    { 
      id: 3, 
      user: 'Michael Brown', 
      userType: 'Student',
      subject: 'Missing assignment submission', 
      status: 'Open',
      time: '1 day ago' 
    },
  ];

  // Mock recent users
  const recentUsers = [
    { 
      id: 1, 
      name: 'Emily Wilson', 
      role: 'Student',
      department: 'Computer Science',
      date: 'Apr 12, 2025' 
    },
    { 
      id: 2, 
      name: 'Dr. Robert Lee', 
      role: 'Faculty',
      department: 'Engineering',
      date: 'Apr 11, 2025' 
    },
    { 
      id: 3, 
      name: 'Jessica Parker', 
      role: 'Student',
      department: 'Business',
      date: 'Apr 10, 2025' 
    },
  ];

  return (
    <Layout title="Admin Dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="pl-8 h-9 rounded-md border border-input bg-background shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-3 w-[200px]"
              />
            </div>
            
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
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <h2 className="text-3xl font-bold">{stat.value}</h2>
                      <span className={`text-xs font-medium ${
                        stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="bg-learnify-100 dark:bg-gray-800 p-2 rounded-md">
                    <stat.icon className="h-5 w-5 text-learnify-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* User Management and Support Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* User Management */}
          <div className="lg:col-span-7 space-y-6">
            <Tabs defaultValue="users" className="w-full">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="faculty">Faculty</TabsTrigger>
                </TabsList>
                
                <Button onClick={() => navigate('/users/new')}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
              
              <TabsContent value="users" className="mt-4 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recent Users</CardTitle>
                    <CardDescription>
                      Users that have recently joined the platform
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map(user => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-learnify-100 text-learnify-500">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <div className="flex text-sm text-muted-foreground">
                                <span className="after:content-['•'] after:mx-1">{user.role}</span>
                                <span>{user.department}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="text-sm text-muted-foreground mr-4">{user.date}</span>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full" onClick={() => navigate('/users')}>
                      View All Users
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Course Management</CardTitle>
                    <CardDescription>
                      Monitor and manage your institution's courses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      You have 86 active courses with 3,254 enrolled students.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" onClick={() => navigate('/courses')}>
                      View All Courses
                    </Button>
                    <Button onClick={() => navigate('/courses/new')}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Course
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="faculty" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Faculty Management</CardTitle>
                    <CardDescription>
                      Manage your institution's faculty members
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      You have 42 faculty members across 12 departments.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" onClick={() => navigate('/faculty')}>
                      View All Faculty
                    </Button>
                    <Button onClick={() => navigate('/faculty/new')}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Faculty
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Support Tickets */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Support Tickets</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {supportTickets.map(ticket => (
                <Card key={ticket.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {ticket.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{ticket.user}</p>
                            <p className="text-xs text-muted-foreground">{ticket.userType}</p>
                          </div>
                        </div>
                        
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          ticket.status === 'Open' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {ticket.status}
                        </div>
                      </div>
                      
                      <p className="text-sm">{ticket.subject}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{ticket.time}</span>
                        <Button variant="ghost" size="sm">
                          Respond
                        </Button>
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
