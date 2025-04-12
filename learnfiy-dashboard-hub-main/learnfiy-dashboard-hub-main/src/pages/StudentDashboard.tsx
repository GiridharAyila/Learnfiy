
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
  Clock, 
  UserCircle, 
  ArrowRight, 
  ArrowUpRight,
  PlayCircle,
  BookOpen,
  Calendar,
  Clock3,
  Target,
  TrendingUp,
  Flag,
  Medal,
  Megaphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock courses data
const courses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    instructor: 'Dr. Jessica Chen',
    progress: 65,
    nextLesson: 'CSS Flexbox Layout',
    dueDate: 'Apr 15, 2025',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    instructor: 'Prof. David Miller',
    progress: 32,
    nextLesson: 'Supervised Learning Algorithms',
    dueDate: 'Apr 18, 2025',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Advanced JavaScript Concepts',
    instructor: 'Sarah Johnson',
    progress: 78,
    nextLesson: 'Asynchronous Programming',
    dueDate: 'Apr 14, 2025',
    image: '/placeholder.svg'
  },
];

// Mock upcoming deadlines
const upcomingDeadlines = [
  {
    id: 1,
    title: 'JavaScript Project',
    course: 'Advanced JavaScript Concepts',
    dueDate: 'Tomorrow, 11:59 PM',
    type: 'assignment',
  },
  {
    id: 2,
    title: 'Supervised Learning Quiz',
    course: 'Machine Learning Fundamentals',
    dueDate: 'Apr 15, 10:00 AM',
    type: 'quiz',
  },
  {
    id: 3,
    title: 'Web Development Midterm',
    course: 'Introduction to Web Development',
    dueDate: 'Apr 17, 2:00 PM',
    type: 'exam',
  },
];

// Mock announcements
const announcements = [
  {
    id: 1,
    title: 'System Maintenance Scheduled',
    content: 'The platform will be down for maintenance on April 20th from 2 AM to 5 AM EST.',
    date: 'Apr 12, 2025',
    isNew: true,
  },
  {
    id: 2,
    title: 'New Course Available: Blockchain Development',
    content: 'A new course on Blockchain Development is now available for enrollment.',
    date: 'Apr 10, 2025',
    isNew: true,
  },
  {
    id: 3,
    title: 'Spring Break Schedule',
    content: 'All courses will be on break from April 22nd to April 26th for Spring Break.',
    date: 'Apr 5, 2025',
    isNew: false,
  },
];

// Learning goals data
const learningGoals = {
  daily: {
    target: 2,
    current: 1.5,
    unit: 'hours',
  },
  weekly: {
    target: 12,
    current: 8,
    unit: 'hours',
  },
  courses: {
    target: 3,
    current: 1,
    unit: 'courses',
  },
};

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const userName = "Alex";
  const currentTime = new Date().getHours();
  
  let greeting = "Good morning";
  if (currentTime >= 12 && currentTime < 17) {
    greeting = "Good afternoon";
  } else if (currentTime >= 17) {
    greeting = "Good evening";
  }

  // Calculate total progress across all courses
  const totalCourses = courses.length;
  const completedCourses = courses.filter(course => course.progress === 100).length;
  const inProgressCourses = totalCourses - completedCourses;
  const averageProgress = courses.reduce((sum, course) => sum + course.progress, 0) / totalCourses;

  return (
    <Layout title="Student Dashboard">
      <div className="space-y-8">
        {/* Profile Summary */}
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
                  <h2 className="text-xl font-semibold">{greeting}, {userName}!</h2>
                  <p className="text-muted-foreground">Welcome back to your learning dashboard</p>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Last activity: Today at 9:32 AM</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button onClick={() => navigate('/profile')}>
                  Update Profile
                </Button>
                <Button variant="outline" onClick={() => navigate('/notifications')}>
                  View Notifications
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Learning Summary & Goals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Learning Summary */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Learning Summary</CardTitle>
              <CardDescription>Overview of your course progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-learnify-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">Completed</div>
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      {completedCourses} / {totalCourses}
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{completedCourses}</div>
                  <div className="text-sm text-muted-foreground">courses completed</div>
                </div>
                
                <div className="bg-learnify-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">In Progress</div>
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {inProgressCourses} / {totalCourses}
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{inProgressCourses}</div>
                  <div className="text-sm text-muted-foreground">courses in progress</div>
                </div>
                
                <div className="bg-learnify-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">Overall Progress</div>
                    <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                      {averageProgress.toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{averageProgress.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">average completion</div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => navigate('/courses')}>
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          {/* Goals Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Goals</CardTitle>
              <CardDescription>Track your progress towards goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-learnify-500" />
                    <span className="font-medium">Daily Study Goal</span>
                  </div>
                  <Badge variant="outline">
                    {learningGoals.daily.current} / {learningGoals.daily.target} {learningGoals.daily.unit}
                  </Badge>
                </div>
                <Progress value={(learningGoals.daily.current / learningGoals.daily.target) * 100} />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-learnify-500" />
                    <span className="font-medium">Weekly Study Goal</span>
                  </div>
                  <Badge variant="outline">
                    {learningGoals.weekly.current} / {learningGoals.weekly.target} {learningGoals.weekly.unit}
                  </Badge>
                </div>
                <Progress value={(learningGoals.weekly.current / learningGoals.weekly.target) * 100} />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-learnify-500" />
                    <span className="font-medium">Courses Completed</span>
                  </div>
                  <Badge variant="outline">
                    {learningGoals.courses.current} / {learningGoals.courses.target} {learningGoals.courses.unit}
                  </Badge>
                </div>
                <Progress value={(learningGoals.courses.current / learningGoals.courses.target) * 100} />
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => navigate('/analysis')}>
                See Detailed Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* My Courses Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Courses</h2>
            <Button variant="link" className="flex items-center" onClick={() => navigate('/courses')}>
              View All Courses
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <Card key={course.id} className="course-card">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className="w-10 h-10 rounded-md bg-learnify-100 dark:bg-gray-700 flex items-center justify-center"
                    >
                      <BookOpen className="h-5 w-5 text-learnify-500" />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-learnify-100 dark:hover:bg-gray-700"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                
                <CardContent className="p-4 py-2">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <PlayCircle className="h-4 w-4 mr-2 text-learnify-500" />
                        <span>Next: {course.nextLesson}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-learnify-500" />
                        <span>Due: {course.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-2">
                  <Button className="w-full gap-2">
                    <Clock3 className="h-4 w-4" />
                    Continue Learning
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Upcoming Deadlines & Announcements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Deadlines */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Don't miss these important dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map(deadline => (
                  <div key={deadline.id} className={`flex items-start p-3 rounded-lg border ${
                    deadline.type === 'assignment' ? 'border-l-4 border-l-yellow-500' :
                    deadline.type === 'quiz' ? 'border-l-4 border-l-green-500' :
                    'border-l-4 border-l-red-500'
                  }`}>
                    <div className={`rounded-full p-2 mr-4 ${
                      deadline.type === 'assignment' ? 'bg-yellow-100 text-yellow-700' :
                      deadline.type === 'quiz' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {deadline.type === 'assignment' ? (
                        <FileText className="h-5 w-5" />
                      ) : deadline.type === 'quiz' ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{deadline.title}</h3>
                      <p className="text-sm text-muted-foreground">{deadline.course}</p>
                      <div className="flex items-center mt-1 text-sm">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">Due: {deadline.dueDate}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-2" onClick={() => navigate('/schedule')}>
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full" onClick={() => navigate('/schedule')}>
                  View Full Schedule
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Recent updates and news</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map(announcement => (
                  <div key={announcement.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{announcement.title}</h3>
                      {announcement.isNew && (
                        <Badge className="bg-red-500">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                    <div className="text-xs text-muted-foreground">{announcement.date}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full flex items-center" onClick={() => navigate('/messages')}>
                  <Megaphone className="h-4 w-4 mr-2" />
                  All Announcements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Access Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center"
            onClick={() => navigate('/code-editor')}
          >
            <CodeIcon className="h-8 w-8 mb-2" />
            <span>Code Editor</span>
          </Button>
          
          <Button 
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center"
            onClick={() => navigate('/messages')}
          >
            <MessageSquare className="h-8 w-8 mb-2" />
            <span>Messages</span>
          </Button>
          
          <Button 
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center"
            onClick={() => navigate('/analysis')}
          >
            <PieChart className="h-8 w-8 mb-2" />
            <span>Analysis</span>
          </Button>
          
          <Button 
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-8 w-8 mb-2" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

// Additional icons for the dashboard
import { 
  FileText, 
  Check, 
  AlertCircle, 
  MessageSquare, 
  Settings,
  PieChart,
  Code as CodeIcon
} from 'lucide-react';
