
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
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Video,
  FileText,
  ExternalLink,
  MoreHorizontal,
  Calendar as CalendarComponent,
  Clock3
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';

// Sample schedule data
const events = [
  {
    id: 1,
    title: 'Web Development Lecture',
    course: 'Introduction to Web Development',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    date: addDays(new Date(), 1),
    location: 'Room 101',
    type: 'lecture',
    link: 'https://example.com/meeting',
    materials: ['Lecture Slides', 'Code Examples'],
  },
  {
    id: 2,
    title: 'Machine Learning Lab',
    course: 'Machine Learning Fundamentals',
    startTime: '2:00 PM',
    endTime: '3:30 PM',
    date: new Date(),
    location: 'Lab 302',
    type: 'lab',
    link: 'https://example.com/lab',
    materials: ['Lab Instructions', 'Dataset'],
  },
  {
    id: 3,
    title: 'JavaScript Assignment Due',
    course: 'Advanced JavaScript Concepts',
    startTime: '11:59 PM',
    date: addDays(new Date(), 2),
    type: 'assignment',
    materials: ['Assignment Brief', 'Rubric'],
  },
  {
    id: 4,
    title: 'Group Project Meeting',
    course: 'Database Design and SQL',
    startTime: '4:00 PM',
    endTime: '5:00 PM',
    date: addDays(new Date(), 3),
    location: 'Online',
    type: 'meeting',
    link: 'https://example.com/group-meeting',
  },
  {
    id: 5,
    title: 'Web Development Quiz',
    course: 'Introduction to Web Development',
    startTime: '9:00 AM',
    endTime: '10:00 AM',
    date: addDays(new Date(), 4),
    location: 'Room 101',
    type: 'exam',
  },
];

// Helper function to group events by date
const groupEventsByDate = (events: any[]) => {
  return events.reduce((acc, event) => {
    const dateStr = format(event.date, 'yyyy-MM-dd');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(event);
    return acc;
  }, {});
};

// Calculate the days for the week view
const getDaysInWeek = (date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Start on Monday
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const Schedule = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  
  // Get events for the selected date (for day view)
  const dayEvents = events.filter(event => 
    isSameDay(event.date, date)
  ).sort((a, b) => 
    a.startTime && b.startTime ? a.startTime.localeCompare(b.startTime) : 0
  );
  
  // Get events for the week
  const weekDays = getDaysInWeek(currentWeek);
  const weekEvents = events.filter(event => 
    weekDays.some(day => isSameDay(day, event.date))
  );
  
  // Group events by date for the month view
  const groupedEvents = groupEventsByDate(events);
  
  // Navigate between weeks
  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };
  
  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };
  
  // Get badge color based on event type
  const getEventBadgeProps = (type: string) => {
    switch (type) {
      case 'lecture':
        return { children: 'Lecture', className: 'bg-blue-500' };
      case 'lab':
        return { children: 'Lab', className: 'bg-green-500' };
      case 'assignment':
        return { children: 'Assignment', className: 'bg-amber-500' };
      case 'meeting':
        return { children: 'Meeting', className: 'bg-purple-500' };
      case 'exam':
        return { children: 'Exam', className: 'bg-red-500' };
      default:
        return { children: type, className: 'bg-gray-500' };
    }
  };
  
  return (
    <Layout title="Schedule">
      {/* View Controls */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="font-medium">
            {view === 'day' ? (
              format(date, 'MMMM d, yyyy')
            ) : view === 'week' ? (
              `${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`
            ) : (
              format(date, 'MMMM yyyy')
            )}
          </div>
          
          <Button variant="outline" size="icon" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" onClick={() => {
            setDate(new Date());
            setCurrentWeek(new Date());
          }}>
            Today
          </Button>
        </div>
        
        <Button className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
      
      {/* Day View */}
      {view === 'day' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="md:col-span-5">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Events for {format(date, 'MMMM d, yyyy')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {dayEvents.length > 0 ? (
                    <div className="space-y-4">
                      {dayEvents.map((event) => (
                        <Card key={event.id} className="relative">
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                            getEventBadgeProps(event.type).className
                          }`}></div>
                          <CardContent className="p-4 pl-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">{event.course}</p>
                              </div>
                              <Badge {...getEventBadgeProps(event.type)} />
                            </div>
                            
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-2" />
                                {event.startTime} {event.endTime && `- ${event.endTime}`}
                              </div>
                              
                              {event.location && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <CalendarIcon className="h-4 w-4 mr-2" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center">
                              <div className="flex gap-2">
                                {event.link && (
                                  <Button variant="outline" size="sm" className="h-8">
                                    <Video className="h-4 w-4 mr-1" />
                                    Join
                                  </Button>
                                )}
                                
                                {event.materials && event.materials.length > 0 && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline" size="sm" className="h-8">
                                        <FileText className="h-4 w-4 mr-1" />
                                        Materials
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      {event.materials.map((material: string, index: number) => (
                                        <DropdownMenuItem key={index}>{material}</DropdownMenuItem>
                                      ))}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                                  <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <CalendarIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No events scheduled</h3>
                      <p className="text-muted-foreground mb-4">
                        There are no events scheduled for this day
                      </p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Event
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border shadow-sm"
                  />
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Upcoming Deadlines</h3>
                    <div className="space-y-2">
                      {events
                        .filter(event => event.type === 'assignment' && event.date >= new Date())
                        .slice(0, 3)
                        .map(event => (
                          <Card key={event.id} className="border-l-4 border-l-amber-500">
                            <CardContent className="p-3">
                              <div className="text-sm font-medium">{event.title}</div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock3 className="h-3 w-3 mr-1" />
                                <span>Due {format(event.date, 'MMM d')} at {event.startTime}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Sync with Google Calendar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
      
      {/* Week View */}
      {view === 'week' && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day, index) => (
                <div key={index} className="text-center">
                  <div className={`p-2 rounded-md ${
                    isSameDay(day, new Date()) ? 'bg-learnify-100 text-learnify-500 font-medium' : ''
                  }`}>
                    <div className="text-xs text-muted-foreground">{format(day, 'EEE')}</div>
                    <div className="text-xl">{format(day, 'd')}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-4 mt-4">
              {weekDays.map((day, dayIndex) => {
                const dayEventList = events.filter(event => isSameDay(event.date, day));
                return (
                  <div key={dayIndex} className="min-h-[200px]">
                    {dayEventList.length > 0 ? (
                      <div className="space-y-2">
                        {dayEventList.map((event, eventIndex) => (
                          <div 
                            key={eventIndex} 
                            className={`p-2 rounded-md text-white text-sm cursor-pointer ${
                              getEventBadgeProps(event.type).className
                            }`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-xs">{event.startTime}{event.endTime && ` - ${event.endTime}`}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center border border-dashed rounded-md p-4">
                        <span className="text-xs text-muted-foreground">No events</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Month View */}
      {view === 'month' && (
        <Card>
          <CardHeader>
            <CardTitle>{format(date, 'MMMM yyyy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center p-2 text-sm font-medium">
                  {day}
                </div>
              ))}
              
              {/* Here would be a full calendar grid for the month view */}
              <div className="col-span-7 text-center py-8">
                <p className="text-muted-foreground">
                  Full month calendar view would be implemented here with all dates of the month
                  and event indicators for each day.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t justify-between">
            <p className="text-sm text-muted-foreground">
              {events.length} events this month
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </Layout>
  );
};
