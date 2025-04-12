
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Briefcase, Award, TrendingUp, UserCheck, FileSpreadsheet } from 'lucide-react';

// Placeholder data for charts
const placementData = [
  { month: 'Jan', placements: 12 },
  { month: 'Feb', placements: 18 },
  { month: 'Mar', placements: 15 },
  { month: 'Apr', placements: 25 },
  { month: 'May', placements: 22 },
  { month: 'Jun', placements: 30 },
  { month: 'Jul', placements: 28 },
];

const skillsData = [
  { skill: 'JavaScript', students: 65 },
  { skill: 'Python', students: 78 },
  { skill: 'Java', students: 52 },
  { skill: 'React', students: 45 },
  { skill: 'Node.js', students: 40 },
  { skill: 'SQL', students: 60 },
];

const jobReadyScores = [
  { name: 'Web Dev', ready: 75, notReady: 25 },
  { name: 'Data Science', ready: 60, notReady: 40 },
  { name: 'Mobile Dev', ready: 45, notReady: 55 },
  { name: 'Cloud', ready: 55, notReady: 45 },
  { name: 'Security', ready: 40, notReady: 60 },
];

export const PlacementDashboard = () => {
  return (
    <Layout title="Placement Dashboard">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,856</div>
              <p className="text-xs text-muted-foreground">+10.1% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Placements</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">148</div>
              <p className="text-xs text-muted-foreground">+25.2% from last quarter</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Job-Ready Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73.4%</div>
              <p className="text-xs text-muted-foreground">+4.3% from last assessment</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="analytics">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-6">
            {/* Placement Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Placement Trends</CardTitle>
                <CardDescription>Monthly placement statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={placementData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="placements" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Job-Ready Scores by Track */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job-Ready Scores by Track</CardTitle>
                  <CardDescription>Percentage of students ready for placement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={jobReadyScores} layout="vertical">
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="ready" stackId="a" fill="#8b5cf6" />
                        <Bar dataKey="notReady" stackId="a" fill="#e2e8f0" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Skills Among Students</CardTitle>
                  <CardDescription>Number of students proficient in each skill</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillsData}>
                        <XAxis dataKey="skill" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="students" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Job-Ready Students</CardTitle>
                  <Button size="sm">
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
                <CardDescription>Students with 80%+ job-ready scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-muted h-10 grid grid-cols-6 items-center px-4 text-sm">
                    <div>Name</div>
                    <div>Course</div>
                    <div>Score</div>
                    <div>Skills</div>
                    <div>Available From</div>
                    <div></div>
                  </div>
                  {/* This would be a mapping of actual student data */}
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="grid grid-cols-6 items-center px-4 py-3">
                        <div className="font-medium">Student {i}</div>
                        <div>Web Development</div>
                        <div className="font-medium">{85 + i}%</div>
                        <div>React, Node.js</div>
                        <div>May 1, 2025</div>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm">View Profile</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="companies" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Partner Companies</CardTitle>
                  <Button variant="outline" size="sm">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Add Company
                  </Button>
                </div>
                <CardDescription>Companies with active hiring relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-muted h-10 grid grid-cols-5 items-center px-4 text-sm">
                    <div>Company</div>
                    <div>Industry</div>
                    <div>Open Positions</div>
                    <div>Students Placed</div>
                    <div></div>
                  </div>
                  {/* This would be a mapping of actual company data */}
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="grid grid-cols-5 items-center px-4 py-3">
                        <div className="font-medium">Tech Company {i}</div>
                        <div>{['Software', 'Finance', 'Healthcare', 'E-commerce', 'Education'][i-1]}</div>
                        <div className="font-medium">{i * 2}</div>
                        <div>{i * 3}</div>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};
