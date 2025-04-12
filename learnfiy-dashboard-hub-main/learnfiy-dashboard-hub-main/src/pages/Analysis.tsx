
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription, 
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Download, Filter, TrendingUp, Clock, BookOpen, Award, Brain } from 'lucide-react';

// Sample data for charts
const weeklyActivityData = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 1.8 },
  { name: 'Wed', hours: 3.2 },
  { name: 'Thu', hours: 2.1 },
  { name: 'Fri', hours: 1.5 },
  { name: 'Sat', hours: 0.8 },
  { name: 'Sun', hours: 1.2 },
];

const courseProgressData = [
  { name: 'Web Dev', completed: 65, total: 100 },
  { name: 'ML', completed: 32, total: 100 },
  { name: 'JS', completed: 78, total: 100 },
  { name: 'iOS', completed: 45, total: 100 },
  { name: 'SQL', completed: 90, total: 100 },
];

const skillsData = [
  { subject: 'JavaScript', A: 80, fullMark: 100 },
  { subject: 'React', A: 65, fullMark: 100 },
  { subject: 'Python', A: 75, fullMark: 100 },
  { subject: 'HTML/CSS', A: 90, fullMark: 100 },
  { subject: 'SQL', A: 60, fullMark: 100 },
  { subject: 'Node.js', A: 55, fullMark: 100 },
];

const timeDistributionData = [
  { name: 'Watching Lectures', value: 45 },
  { name: 'Coding Practice', value: 30 },
  { name: 'Reading Materials', value: 15 },
  { name: 'Taking Quizzes', value: 10 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

// Comparison with peers data
const peerComparisonData = [
  { name: 'Assignment 1', you: 85, average: 75 },
  { name: 'Assignment 2', you: 78, average: 72 },
  { name: 'Quiz 1', you: 92, average: 80 },
  { name: 'Midterm', you: 88, average: 76 },
  { name: 'Project', you: 95, average: 82 },
];

export const Analysis = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedCourse, setSelectedCourse] = useState('all');
  
  return (
    <Layout title="Learning Analysis">
      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="web">Web Development</SelectItem>
              <SelectItem value="ml">Machine Learning</SelectItem>
              <SelectItem value="js">JavaScript</SelectItem>
              <SelectItem value="ios">iOS Development</SelectItem>
              <SelectItem value="sql">SQL & Databases</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Study Time</p>
                <div className="flex items-baseline space-x-2">
                  <h2 className="text-3xl font-bold">13.1</h2>
                  <span className="text-xs font-medium text-green-500">+2.5h</span>
                </div>
                <p className="text-sm text-muted-foreground">Hours this week</p>
              </div>
              <div className="bg-learnify-100 dark:bg-gray-800 p-2 rounded-md">
                <Clock className="h-5 w-5 text-learnify-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <div className="flex items-baseline space-x-2">
                  <h2 className="text-3xl font-bold">76%</h2>
                  <span className="text-xs font-medium text-green-500">+5%</span>
                </div>
                <p className="text-sm text-muted-foreground">Overall progress</p>
              </div>
              <div className="bg-learnify-100 dark:bg-gray-800 p-2 rounded-md">
                <TrendingUp className="h-5 w-5 text-learnify-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Courses Completed</p>
                <div className="flex items-baseline space-x-2">
                  <h2 className="text-3xl font-bold">3</h2>
                  <span className="text-xs font-medium text-green-500">+1</span>
                </div>
                <p className="text-sm text-muted-foreground">Out of 8 enrolled</p>
              </div>
              <div className="bg-learnify-100 dark:bg-gray-800 p-2 rounded-md">
                <BookOpen className="h-5 w-5 text-learnify-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Performance</p>
                <div className="flex items-baseline space-x-2">
                  <h2 className="text-3xl font-bold">89</h2>
                  <span className="text-xs font-medium text-green-500">+3%</span>
                </div>
                <p className="text-sm text-muted-foreground">Average score</p>
              </div>
              <div className="bg-learnify-100 dark:bg-gray-800 p-2 rounded-md">
                <Award className="h-5 w-5 text-learnify-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>
              Hours spent studying per day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="hours" 
                    name="Study Hours" 
                    fill="#8884d8" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>
              Completion percentage by course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={courseProgressData}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="completed" 
                    name="Completed %" 
                    fill="#82ca9d" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional Charts */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="time">Time Distribution</TabsTrigger>
          <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          <TabsTrigger value="peer">Peer Comparison</TabsTrigger>
        </TabsList>
        
        {/* Performance Tab */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>
                Track your quiz and assignment scores over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={peerComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="you" 
                      name="Your Score" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 text-sm text-muted-foreground">
              Performance data shown for the selected time period and course(s).
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Time Distribution Tab */}
        <TabsContent value="time">
          <Card>
            <CardHeader>
              <CardTitle>Study Time Distribution</CardTitle>
              <CardDescription>
                How your study time is distributed across different activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={timeDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {timeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Activity Breakdown</h3>
                  <div className="space-y-6">
                    {timeDistributionData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center">
                            <span 
                              className="inline-block w-3 h-3 mr-2 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            {item.name}
                          </span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${item.value}%`,
                              backgroundColor: COLORS[index % COLORS.length] 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Aim for a balanced distribution. Reading and hands-on coding are especially important for retention.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Skills Analysis Tab */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>
                Visual representation of your skill proficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Based on your performance across assignments, quizzes, and practical exercises.
                </div>
                <Button variant="outline" size="sm">
                  <Brain className="h-4 w-4 mr-2" />
                  Full Skills Report
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Peer Comparison Tab */}
        <TabsContent value="peer">
          <Card>
            <CardHeader>
              <CardTitle>Peer Comparison</CardTitle>
              <CardDescription>
                Your performance compared to course averages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={peerComparisonData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="you" name="Your Score" fill="#8884d8" />
                    <Bar dataKey="average" name="Class Average" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 text-sm text-muted-foreground">
              <p>
                Note: Peer comparison is anonymized and shown for educational purposes only.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};
