
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription, 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Clock, 
  PlayCircle, 
  Calendar, 
  Pin, 
  Filter,
  SortAsc,
  SortDesc,
  Search
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Mock courses data with additional properties
const courses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    instructor: 'Dr. Jessica Chen',
    progress: 65,
    nextLesson: 'CSS Flexbox Layout',
    dueDate: 'Apr 15, 2025',
    image: '/placeholder.svg',
    category: 'Web Development',
    isPinned: true,
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    instructor: 'Prof. David Miller',
    progress: 32,
    nextLesson: 'Supervised Learning Algorithms',
    dueDate: 'Apr 18, 2025',
    image: '/placeholder.svg',
    category: 'Data Science',
    isPinned: false,
  },
  {
    id: 3,
    title: 'Advanced JavaScript Concepts',
    instructor: 'Sarah Johnson',
    progress: 78,
    nextLesson: 'Asynchronous Programming',
    dueDate: 'Apr 14, 2025',
    image: '/placeholder.svg',
    category: 'Web Development',
    isPinned: false,
  },
  {
    id: 4,
    title: 'iOS App Development with Swift',
    instructor: 'Michael Brown',
    progress: 45,
    nextLesson: 'UIKit Fundamentals',
    dueDate: 'Apr 20, 2025',
    image: '/placeholder.svg',
    category: 'Mobile Development',
    isPinned: false,
  },
  {
    id: 5,
    title: 'Database Design and SQL',
    instructor: 'Amanda Garcia',
    progress: 90,
    nextLesson: 'Advanced Joins and Subqueries',
    dueDate: 'Apr 13, 2025',
    image: '/placeholder.svg',
    category: 'Database',
    isPinned: true,
  },
];

export const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Filter courses based on the current filter and search query
  const filteredCourses = courses
    .filter(course => {
      if (filter === 'all') return true;
      if (filter === 'pinned') return course.isPinned;
      return course.category.toLowerCase() === filter.toLowerCase();
    })
    .filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Sort courses based on the current sort criteria
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === 'progress') {
      comparison = a.progress - b.progress;
    } else if (sortBy === 'dueDate') {
      comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  // Get a list of unique categories
  const categories = Array.from(new Set(courses.map(course => course.category)));
  
  // Toggle course pinned status
  const togglePinCourse = (courseId: number) => {
    // In a real app, you would update this in a state management system or API
    console.log(`Toggling pin status for course ${courseId}`);
  };
  
  return (
    <Layout title="My Courses">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search courses..."
            className="pl-10 h-10 w-full rounded-md border border-input bg-background shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  All Courses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('pinned')}>
                  Pinned Courses
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                {categories.map(category => (
                  <DropdownMenuItem 
                    key={category} 
                    onClick={() => setFilter(category.toLowerCase())}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setSortBy('title')}>
                  Course Title
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('progress')}>
                  Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('dueDate')}>
                  Due Date
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setSortOrder('asc')}>
                  Ascending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder('desc')}>
                  Descending
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCourses.map(course => (
          <Card key={course.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="relative p-0">
              <div className="h-40 bg-gray-200 relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div>
                    <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                    <CardDescription className="text-white/80">{course.instructor}</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`absolute top-2 right-2 text-white hover:bg-black/20 ${course.isPinned ? 'text-yellow-400' : ''}`}
                  onClick={() => togglePinCourse(course.id)}
                >
                  <Pin className="h-5 w-5" fill={course.isPinned ? "currentColor" : "none"} />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-learnify-500 rounded-full" 
                    style={{ width: `${course.progress}%` }} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <PlayCircle className="h-4 w-4 text-learnify-500" />
                  <span className="truncate">Next: {course.nextLesson}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-learnify-500" />
                  <span>Due: {course.dueDate}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t p-4 flex justify-between">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Materials
              </Button>
              <Button size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Continue
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Empty State */}
      {sortedCourses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={() => {setSearchQuery(''); setFilter('all');}}>
            Reset Filters
          </Button>
        </div>
      )}
    </Layout>
  );
};
