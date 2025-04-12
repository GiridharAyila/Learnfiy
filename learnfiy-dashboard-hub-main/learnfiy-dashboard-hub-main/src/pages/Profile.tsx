
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  BookOpen,
  GraduationCap,
  Globe,
  Layers,
  Github,
  Linkedin,
  MoreHorizontal,
  Briefcase,
  Target,
  BookMarked,
  Users,
  Medal,
  FileText,
  Clock,
  Building,
  Settings,
  ClipboardList,
  Lightbulb,
  Plus
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';

export const Profile = () => {
  const [visibilityStatus, setVisibilityStatus] = useState('public');
  const [userRole, setUserRole] = useState('student'); // 'student', 'teacher', or 'admin'
  
  const userInfo = {
    name: 'Alex Johnson',
    username: 'alex.johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    department: 'Computer Science',
    role: userRole === 'student' ? 'Student' : userRole === 'teacher' ? 'Faculty' : 'Administrator',
    biography: 'Passionate about web development and machine learning. Currently pursuing a degree in Computer Science with a focus on AI applications.',
  };
  
  // Student-specific data
  const careerInfo = {
    shortTermGoals: 'Complete internship at a tech company; Develop a machine learning portfolio project',
    longTermGoals: 'Become an AI research scientist; Work at a leading technology company in Silicon Valley',
    academicInterests: [
      { name: 'Artificial Intelligence', level: 'Advanced' },
      { name: 'Web Development', level: 'Intermediate' },
      { name: 'Data Structures & Algorithms', level: 'Advanced' },
      { name: 'Human-Computer Interaction', level: 'Beginner' },
    ],
    internships: [
      { 
        title: 'Software Engineering Intern', 
        company: 'TechCorp Inc.', 
        period: 'Summer 2023',
        description: 'Developed and maintained web applications using React.js and Node.js. Collaborated with the team to implement new features and fix bugs.',
        keyLearnings: 'Agile development methodologies, collaborative coding, API integration'
      }
    ],
    achievements: [
      { title: 'Dean\'s List', year: '2022-2023', description: 'Recognized for academic excellence with a GPA of 3.9/4.0' },
      { title: 'Hackathon Winner', year: '2023', description: 'First place in university-wide coding competition for innovative AI solution' },
      { title: 'Merit Scholarship', year: '2022', description: 'Awarded full-tuition scholarship based on academic achievements' }
    ],
    extracurricular: [
      { 
        name: 'Coding Club', 
        role: 'Vice President',
        period: '2022-Present',
        description: 'Organize weekly coding workshops and hackathons for students' 
      },
      { 
        name: 'University Debate Team', 
        role: 'Member',
        period: '2021-Present',
        description: 'Participate in regional and national debate competitions' 
      },
      { 
        name: 'Community Outreach', 
        role: 'Volunteer',
        period: '2022-Present',
        description: 'Teach basic computer skills to underprivileged communities' 
      }
    ]
  };
  
  // Teacher-specific data
  const teacherInfo = {
    expertise: [
      { subject: 'Web Development', level: 'Expert', years: 8 },
      { subject: 'Data Structures', level: 'Advanced', years: 5 },
      { subject: 'Machine Learning', level: 'Intermediate', years: 3 },
      { subject: 'Database Design', level: 'Expert', years: 7 }
    ],
    teachingStyle: [
      { approach: 'Project-Based Learning', description: 'Students learn through hands-on projects that simulate real-world applications' },
      { approach: 'Flipped Classroom', description: 'Students review lecture materials at home and engage in discussions and problem-solving in class' },
      { approach: 'Peer Instruction', description: 'Students explain concepts to each other to deepen understanding' }
    ],
    certifications: [
      { name: 'Ph.D. in Computer Science', institution: 'Stanford University', year: '2015' },
      { name: 'Certified Educational Technology Specialist', institution: 'EdTech Association', year: '2018' },
      { name: 'Advanced Teaching Certification', institution: 'National Board of Professional Teaching', year: '2019' }
    ],
    experience: [
      { position: 'Associate Professor', institution: 'University of California', period: '2018-Present' },
      { position: 'Assistant Professor', institution: 'San Francisco State University', period: '2015-2018' },
      { position: 'Teaching Assistant', institution: 'Stanford University', period: '2012-2015' }
    ],
    accomplishments: [
      { title: 'Outstanding Faculty Award', year: '2022', description: 'Recognized for excellence in teaching and student mentorship' },
      { title: 'Published Research Paper', year: '2021', description: 'Co-authored "Innovations in Computer Science Education" in Educational Technology Journal' },
      { title: 'Curriculum Development Lead', year: '2020', description: 'Led the redesign of the undergraduate Computer Science curriculum' }
    ]
  };
  
  // Admin-specific data
  const adminInfo = {
    roles: [
      { title: 'Director of Academic Affairs', description: 'Oversee curriculum development and implementation across departments' },
      { title: 'Faculty Liaison', description: 'Bridge communication between administration and teaching staff' },
      { title: 'Student Success Coordinator', description: 'Develop and implement strategies to improve student retention and performance' }
    ],
    leadershipAchievements: [
      { title: 'Digital Transformation Initiative', year: '2022', impact: 'Led the transition to a new learning management system, increasing student engagement by 35%' },
      { title: 'Budget Optimization', year: '2021', impact: 'Restructured departmental budgets resulting in 20% cost savings while maintaining educational quality' },
      { title: 'Academic Policy Reform', year: '2020', impact: 'Updated academic policies to better support diverse learning needs, leading to 15% improvement in student satisfaction' }
    ],
    qualifications: [
      { name: 'M.B.A. in Educational Administration', institution: 'Harvard University', year: '2014' },
      { name: 'B.S. in Computer Science', institution: 'MIT', year: '2010' },
      { name: 'Certificate in Educational Leadership', institution: 'Leadership Institute', year: '2016' }
    ],
    contributions: [
      { title: 'Online Learning Framework', description: 'Developed comprehensive guidelines for remote learning programs' },
      { title: 'Student Mental Health Initiative', description: 'Established campus-wide mental health resources and support systems' },
      { title: 'Community Partnership Program', description: 'Created industry partnerships that led to increased internship opportunities for students' }
    ]
  };
  
  // Shared data across all roles
  const skills = [
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'React.js', level: 'Intermediate' },
    { name: 'Python', level: 'Advanced' },
    { name: 'Machine Learning', level: 'Intermediate' },
    { name: 'SQL', level: 'Beginner' },
    { name: 'Node.js', level: 'Intermediate' },
  ];
  
  const achievements = [
    { title: 'Course Completion', description: 'Introduction to Web Development', date: 'February 2023', icon: BookOpen },
    { title: 'Certification', description: 'React Developer Certification', date: 'April 2023', icon: Award },
    { title: 'Competition', description: '2nd Place in Hackathon', date: 'June 2023', icon: Trophy },
    { title: 'Milestone', description: '10-day learning streak', date: 'July 2023', icon: Award },
  ];
  
  const learningJourney = [
    { title: 'Started Learning Path', description: 'Full-Stack Development', date: 'January 2023' },
    { title: 'Completed Course', description: 'HTML & CSS Fundamentals', date: 'February 2023' },
    { title: 'Completed Course', description: 'JavaScript Essentials', date: 'March 2023' },
    { title: 'Started Project', description: 'Personal Portfolio Website', date: 'April 2023' },
    { title: 'Joined Study Group', description: 'Advanced React Concepts', date: 'May 2023' },
    { title: 'Completed Project', description: 'E-commerce Dashboard', date: 'July 2023' },
  ];
  
  // Tab options based on role
  const getProfileTabs = () => {
    const commonTabs = [
      { value: "learning-journey", label: "Learning Journey" },
      { value: "skills", label: "Skills" },
      { value: "achievements", label: "Achievements" },
      { value: "portfolio", label: "Portfolio" },
    ];
    
    if (userRole === "student") {
      return [
        ...commonTabs,
        { value: "career", label: "Career" },
        { value: "academic", label: "Academic" },
      ];
    } else if (userRole === "teacher") {
      return [
        ...commonTabs,
        { value: "expertise", label: "Expertise" },
        { value: "teaching", label: "Teaching" },
      ];
    } else if (userRole === "admin") {
      return [
        ...commonTabs,
        { value: "roles", label: "Roles" },
        { value: "leadership", label: "Leadership" },
      ];
    }
    
    return commonTabs;
  };
  
  const profileTabs = getProfileTabs();
  
  return (
    <Layout title="My Profile">
      {/* Role selector (for demo purposes) */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-medium">View as:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {userRole === 'student' ? 'Student' : userRole === 'teacher' ? 'Teacher' : 'Admin'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setUserRole('student')}>
              Student
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserRole('teacher')}>
              Teacher
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserRole('admin')}>
              Admin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Profile header card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-xl font-bold">AJ</AvatarFallback>
              </Avatar>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {visibilityStatus === 'public' ? 'Public Profile' : visibilityStatus === 'private' ? 'Private Profile' : 'Class-Only Profile'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Profile Visibility</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setVisibilityStatus('public')}>
                      Public
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setVisibilityStatus('private')}>
                      Private
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setVisibilityStatus('class')}>
                      Class-Only
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                <p className="text-muted-foreground">@{userInfo.username}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" />
                  {userInfo.role}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {userInfo.department}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Joined {userInfo.joinDate}
                </Badge>
              </div>
              
              <p className="text-sm max-w-2xl">
                {userInfo.biography}
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {userInfo.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {userInfo.location}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="rounded-full">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Globe className="h-4 w-4 mr-2" />
                  Portfolio
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed profile tabs */}
      <Tabs defaultValue="learning-journey" className="w-full">
        <TabsList className="mb-6">
          {profileTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>
        
        {/* Learning Journey Tab - Common for all roles */}
        <TabsContent value="learning-journey">
          <Card>
            <CardHeader>
              <CardTitle>Learning Timeline</CardTitle>
              <CardDescription>
                Track your progress through courses and learning activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-border pl-6 py-2 ml-6">
                {learningJourney.map((item, index) => (
                  <div key={index} className="mb-8 relative">
                    <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full bg-learnify-500 border-4 border-background"></div>
                    <div className="mb-1 text-sm text-muted-foreground">{item.date}</div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
                <div className="absolute -left-[13px] bottom-0 h-4 w-4 rounded-full bg-background border-2 border-learnify-500"></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Skills Tab - Common for all roles */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Competencies</CardTitle>
              <CardDescription>
                Skills you've developed through your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <Badge 
                        variant={skill.level === 'Advanced' ? 'default' : 
                              skill.level === 'Intermediate' ? 'secondary' : 'outline'}
                      >
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-learnify-500" 
                        style={{ 
                          width: skill.level === 'Advanced' ? '90%' : 
                                skill.level === 'Intermediate' ? '60%' : '30%' 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-4">Add New Skill</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="skill-name">Skill Name</Label>
                    <Input id="skill-name" placeholder="e.g., React Native" />
                  </div>
                  <div className="sm:w-40 space-y-2">
                    <Label htmlFor="skill-level">Proficiency</Label>
                    <select 
                      id="skill-level"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div className="sm:self-end">
                    <Button>Add Skill</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Achievements Tab - Common for all roles */}
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Certifications</CardTitle>
              <CardDescription>
                Your accomplishments and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <Card key={index} className="border shadow-sm">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="bg-learnify-100 dark:bg-gray-800 p-3 rounded-full">
                          <Icon className="h-6 w-6 text-learnify-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1">{achievement.date}</div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Portfolio Tab - Common for all roles */}
        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio & Projects</CardTitle>
              <CardDescription>
                Showcase your work and projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Button className="w-full sm:w-auto flex items-center gap-2 p-6 h-auto justify-start">
                  <div className="rounded-full bg-learnify-100 dark:bg-gray-800 p-3">
                    <Layers className="h-6 w-6 text-learnify-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Upload Project or Portfolio</h3>
                    <p className="text-sm text-muted-foreground">
                      Share your work with peers and instructors
                    </p>
                  </div>
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sample portfolio item */}
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-gray-200">
                      <img 
                        src="/placeholder.svg" 
                        alt="Portfolio Project" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Personal Portfolio Website</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        A responsive portfolio website built with React and Tailwind CSS.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">Tailwind CSS</Badge>
                        <Badge variant="outline">JavaScript</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-4 flex justify-between">
                      <Button variant="outline" size="sm">Preview</Button>
                      <Button size="sm">View Code</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Career Tab - Student-specific */}
        {userRole === 'student' && (
          <TabsContent value="career">
            <div className="space-y-6">
              {/* Career Goals Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-learnify-500" />
                    Career Goals
                  </CardTitle>
                  <CardDescription>
                    Your short-term and long-term career aspirations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Short-Term Goals</h3>
                    <p className="text-muted-foreground">{careerInfo.shortTermGoals}</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Long-Term Goals</h3>
                    <p className="text-muted-foreground">{careerInfo.longTermGoals}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Update Career Goals</Button>
                </CardFooter>
              </Card>

              {/* Internships & Work Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-learnify-500" />
                    Internships & Work Experience
                  </CardTitle>
                  <CardDescription>
                    Your professional experience and key learnings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {careerInfo.internships.map((internship, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{internship.title}</h3>
                          <p className="text-muted-foreground">{internship.company}</p>
                        </div>
                        <Badge variant="outline">{internship.period}</Badge>
                      </div>
                      <p className="text-sm">{internship.description}</p>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Key Learnings:</h4>
                        <p className="text-sm text-muted-foreground">{internship.keyLearnings}</p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-learnify-500" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    Awards, competitions, and honors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {careerInfo.achievements.map((achievement, index) => (
                    <div key={index} className="flex gap-4 border rounded-lg p-4">
                      <div className="bg-learnify-100 dark:bg-gray-800 p-3 rounded-full h-fit">
                        <Trophy className="h-5 w-5 text-learnify-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <Badge variant="outline">{achievement.year}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Achievement
                  </Button>
                </CardContent>
              </Card>

              {/* Extracurricular Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-learnify-500" />
                    Extracurricular Activities
                  </CardTitle>
                  <CardDescription>
                    Clubs, sports, volunteer work, and other activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {careerInfo.extracurricular.map((activity, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold">{activity.name}</h3>
                        <Badge variant="outline">{activity.period}</Badge>
                      </div>
                      <p className="text-sm font-medium mb-1">Role: {activity.role}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
        
        {/* Academic Tab - Student-specific */}
        {userRole === 'student' && (
          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5 text-learnify-500" />
                  Academic Interests
                </CardTitle>
                <CardDescription>
                  Your favorite subjects and research topics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {careerInfo.academicInterests.map((interest, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{interest.name}</h3>
                        <Badge 
                          variant={interest.level === 'Advanced' ? 'default' : 
                                interest.level === 'Intermediate' ? 'secondary' : 'outline'}
                        >
                          {interest.level}
                        </Badge>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-learnify-500" 
                          style={{ 
                            width: interest.level === 'Advanced' ? '90%' : 
                                  interest.level === 'Intermediate' ? '60%' : '30%' 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Academic Interest
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Expertise Tab - Teacher-specific */}
        {userRole === 'teacher' && (
          <TabsContent value="expertise">
            <div className="space-y-6">
              {/* Subject Expertise */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-learnify-500" />
                    Subject Expertise
                  </CardTitle>
                  <CardDescription>
                    Specializations and advanced knowledge areas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teacherInfo.expertise.map((subject, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{subject.subject}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{subject.level}</Badge>
                          <Badge variant="secondary">{subject.years} years</Badge>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-learnify-500" 
                          style={{ 
                            width: subject.level === 'Expert' ? '95%' : 
                                  subject.level === 'Advanced' ? '75%' : 
                                  subject.level === 'Intermediate' ? '50%' : '25%' 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Subject Expertise
                  </Button>
                </CardContent>
              </Card>

              {/* Certifications & Qualifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-learnify-500" />
                    Certifications & Qualifications
                  </CardTitle>
                  <CardDescription>
                    Academic degrees and professional certifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teacherInfo.certifications.map((cert, index) => (
                    <div key={index} className="flex gap-4 border rounded-lg p-4">
                      <div className="bg-learnify-100 dark:bg-gray-800 p-3 rounded-full h-fit">
                        <Award className="h-5 w-5 text-learnify-500" />
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <h3 className="font-semibold">{cert.name}</h3>
                          <Badge variant="outline">{cert.year}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{cert.institution}</p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                </CardContent>
              </Card>

              {/* Years of Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-learnify-500" />
                    Years of Experience
                  </CardTitle>
                  <CardDescription>
                    Teaching background and institutions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teacherInfo.experience.map((exp, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold">{exp.position}</h3>
                        <Badge variant="outline">{exp.period}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.institution}</p>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </CardContent>
              </Card>

              {/* Notable Accomplishments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-learnify-500" />
                    Notable Accomplishments
                  </CardTitle>
                  <CardDescription>
                    Publications, leadership in education, and awards
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teacherInfo.accomplishments.map((accomplishment, index) => (
                    <div key={index} className="flex gap-4 border rounded-lg p-4">
                      <div className="bg-learnify-100 dark:bg-gray-800 p-3 rounded-full h-fit">
                        <Trophy className="h-5 w-5 text-learnify-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{accomplishment.title}</h3>
                          <Badge variant="outline">{accomplishment.year}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{accomplishment.description}</p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Accomplishment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {/* Teaching Tab - Teacher-specific */}
        {userRole === 'teacher' && (
          <TabsContent value="teaching">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-learnify-500" />
                  Teaching Style
                </CardTitle>
                <CardDescription>
                  Your pedagogical approach and classroom methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {teacherInfo.teachingStyle.map((style, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-learnify-100 dark:bg-gray-800 p-3 rounded-full">
                        <Lightbulb className="h-5 w-5 text-learnify-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{style.approach}</h3>
                        <p className="text-sm text-muted-foreground">{style.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Teaching Approach
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Roles Tab - Admin-specific */}
        {userRole === 'admin' && (
          <TabsContent value="roles">
            <div className="space-y-6">
              {/* Roles & Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-learnify-500" />
                    Roles & Responsibilities
                  </CardTitle>
                  <CardDescription>
                    Key duties and management scope
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {adminInfo.roles.map((role, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-learnify-100 dark:bg-gray-800 p-3 rounded-full">
                          <Briefcase className="h-5 w-5 text-learnify-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{role.title}</h3>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Role
                  </Button>
                </CardContent>
              </Card>

              {/* Qualifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-learnify-500" />
                    Qualifications
                  </CardTitle>
                  <CardDescription>
                    Relevant degrees and administrative training
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {adminInfo.qualifications.map((qual, index) => (
                    <div key={index} className="flex gap-4 border rounded-lg p-4">
                      <div className="bg-learnify-100 dark:bg-gray-800 p-3 rounded-full h-fit">
                        <GraduationCap className="h-5 w-5 text-learnify-500" />
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <h3 className="font-semibold">{qual.name}</h3>
                          <Badge variant="outline">{qual.year}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{qual.institution}</p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Qualification
                  </Button>
                </CardContent>
              </Card>

              {/* Institutional Contributions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-learnify-500" />
                    Institutional Contributions
                  </CardTitle>
                  <CardDescription>
                    Policies developed and community impact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {adminInfo.contributions.map((contribution, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">{contribution.title}</h3>
                      <p className="text-sm text-muted-foreground">{contribution.description}</p>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contribution
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {/* Leadership Tab - Admin-specific */}
        {userRole === 'admin' && (
          <TabsContent value="leadership">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-learnify-500" />
                  Leadership Achievements
                </CardTitle>
                <CardDescription>
                  Successful initiatives and improvements implemented
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminInfo.leadershipAchievements.map((achievement, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <Badge variant="outline">{achievement.year}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.impact}</p>
                  </div>
                ))}
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Leadership Achievement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </Layout>
  );
};

// Helper component for Trophy icon since it's not exported directly from lucide-react
const Trophy = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

