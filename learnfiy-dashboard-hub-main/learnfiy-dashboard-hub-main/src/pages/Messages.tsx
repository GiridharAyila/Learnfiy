
import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Settings, 
  Send, 
  Paperclip, 
  Smile, 
  Image, 
  MoreVertical,
  Phone,
  Video,
  Info,
  CheckCheck,
  Clock,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock conversation data
const conversations = [
  {
    id: 1,
    name: 'Dr. Jessica Chen',
    role: 'Instructor',
    course: 'Web Development',
    avatar: '/placeholder.svg',
    lastMessage: 'Please let me know if you have any questions about the assignment.',
    time: '10:30 AM',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Study Group',
    role: 'Group',
    members: ['Alex', 'Sarah', 'Michael', 'You', '+2 more'],
    avatar: '/placeholder.svg',
    lastMessage: "Sarah: I'll share my notes from today's lecture.",
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Prof. David Miller',
    role: 'Instructor',
    course: 'Machine Learning',
    avatar: '/placeholder.svg',
    lastMessage: 'The deadline for the project proposal has been extended.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: 'Academic Advisor',
    role: 'Admin',
    avatar: '/placeholder.svg',
    lastMessage: 'Your course registration for next semester has been confirmed.',
    time: 'Monday',
    unread: 0,
    online: true,
  },
  {
    id: 5,
    name: 'Tech Support',
    role: 'Support',
    avatar: '/placeholder.svg',
    lastMessage: 'Have you tried clearing your browser cache?',
    time: 'Jan 10',
    unread: 0,
    online: true,
  },
];

// Mock messages for a selected conversation
const mockMessages = [
  {
    id: 1,
    sender: 'Dr. Jessica Chen',
    content: 'Hello! I wanted to check in on your progress with the final project.',
    time: 'Yesterday, 2:30 PM',
    isMe: false,
    status: 'read',
  },
  {
    id: 2,
    sender: 'Me',
    content: "Hi Dr. Chen! I've made good progress on the frontend component. Just working on the API integration now.",
    time: 'Yesterday, 2:45 PM',
    isMe: true,
    status: 'read',
  },
  {
    id: 3,
    sender: 'Dr. Jessica Chen',
    content: "That's great to hear! Do you have any questions about the API integration?",
    time: 'Yesterday, 3:00 PM',
    isMe: false,
    status: 'read',
  },
  {
    id: 4,
    sender: 'Me',
    content: "I'm a bit confused about how to handle the authentication. The documentation mentions OAuth, but I'm not sure how to implement it.",
    time: 'Yesterday, 3:15 PM',
    isMe: true,
    status: 'read',
  },
  {
    id: 5,
    sender: 'Dr. Jessica Chen',
    content: "I understand, OAuth can be tricky. Let me share some resources that might help you.",
    time: 'Yesterday, 3:20 PM',
    isMe: false,
    status: 'read',
  },
  {
    id: 6,
    sender: 'Dr. Jessica Chen',
    content: "Here's a tutorial that explains OAuth implementation with practical examples: https://example.com/oauth-tutorial",
    time: 'Yesterday, 3:21 PM',
    isMe: false,
    status: 'read',
  },
  {
    id: 7,
    sender: 'Dr. Jessica Chen',
    content: "Also, check out the chapter on API authentication in our textbook. Pages 157-170 cover this topic in detail.",
    time: 'Yesterday, 3:22 PM',
    isMe: false,
    status: 'read',
  },
  {
    id: 8,
    sender: 'Me',
    content: "Thank you so much! I'll review these resources and try to implement the authentication. I appreciate your help.",
    time: 'Yesterday, 3:30 PM',
    isMe: true,
    status: 'read',
  },
  {
    id: 9,
    sender: 'Dr. Jessica Chen',
    content: "You're welcome! Feel free to reach out if you need further assistance. Don't forget that the final project is due next Friday.",
    time: 'Yesterday, 3:35 PM',
    isMe: false,
    status: 'read',
  },
  {
    id: 10,
    sender: 'Me',
    content: "I'll keep that in mind. Thanks for the reminder!",
    time: 'Yesterday, 3:40 PM',
    isMe: true,
    status: 'read',
  },
  {
    id: 11,
    sender: 'Me',
    content: "Actually, I have one more question. Would it be possible to schedule a quick video call tomorrow to discuss my approach to the project?",
    time: '10:15 AM',
    isMe: true,
    status: 'sent',
  },
  {
    id: 12,
    sender: 'Dr. Jessica Chen',
    content: "Sure, I can do that. How about tomorrow at 2 PM? I'll send you a meeting link.",
    time: '10:30 AM',
    isMe: false,
    status: 'delivered',
  },
];

export const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [conversationFilter, setConversationFilter] = useState('all');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Filter conversations based on search query and conversation type
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (conversationFilter === 'all') return matchesSearch;
    if (conversationFilter === 'unread') return matchesSearch && conv.unread > 0;
    if (conversationFilter === 'instructors') return matchesSearch && conv.role === 'Instructor';
    if (conversationFilter === 'groups') return matchesSearch && conv.role === 'Group';
    
    return matchesSearch;
  });
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'Me',
        content: message,
        time: 'Just now',
        isMe: true,
        status: 'sending',
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };
  
  // Handle key press (send message on Enter)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Render message status icon
  const renderMessageStatus = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case 'sent':
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Layout title="Messages">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        {/* Conversation List */}
        <div className="md:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="px-4 py-3 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Messages</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <Tabs 
                defaultValue="all" 
                className="w-full mt-2"
                value={conversationFilter}
                onValueChange={setConversationFilter}
              >
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="instructors">Instructors</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <ScrollArea className="flex-1">
              {filteredConversations.map(conv => (
                <div 
                  key={conv.id} 
                  className={`p-3 border-b cursor-pointer transition-colors ${
                    selectedConversation.id === conv.id ? 'bg-accent' : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conv.avatar} />
                        <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{conv.name}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{conv.time}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <Badge className="ml-2 shrink-0">{conv.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredConversations.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No conversations found</p>
                </div>
              )}
            </ScrollArea>
          </Card>
        </div>
        
        {/* Conversation View */}
        <div className="md:col-span-2">
          {selectedConversation ? (
            <Card className="h-full flex flex-col">
              {/* Conversation Header */}
              <CardHeader className="px-4 py-3 border-b flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedConversation.avatar} />
                      <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{selectedConversation.name}</h3>
                        {selectedConversation.online && (
                          <Badge variant="outline" className="text-xs px-1 py-0 h-5 bg-green-100 text-green-800 border-green-200">
                            Online
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.role === 'Group' 
                          ? `${selectedConversation.members?.join(', ')}`
                          : `${selectedConversation.role}${selectedConversation.course ? ` • ${selectedConversation.course}` : ''}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                        <DropdownMenuItem>Notification settings</DropdownMenuItem>
                        <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                        <DropdownMenuItem>Block conversation</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              
              {/* Message List */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className="flex gap-2 max-w-[70%]">
                        {!msg.isMe && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={selectedConversation.avatar} />
                            <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div>
                          <div className={`rounded-lg p-3 ${
                            msg.isMe 
                              ? 'bg-learnify-500 text-white' 
                              : 'bg-accent'
                          }`}>
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          
                          <div className="flex items-center mt-1 gap-1 justify-end">
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                            {msg.isMe && renderMessageStatus(msg.status)}
                          </div>
                        </div>
                        
                        {msg.isMe && (
                          <div className="w-8 flex items-start">
                            {/* Empty space to align with avatar on the other side */}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <CardFooter className="border-t p-3">
                <div className="flex items-center gap-2 w-full">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-full flex flex-col justify-center items-center p-8">
              <div className="text-center space-y-4">
                <div className="bg-gray-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto">
                  <MessageSquare className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium">No conversation selected</h3>
                <p className="text-muted-foreground max-w-md">
                  Select a conversation from the list or start a new one
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Conversation
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Import needed for MessageSquare icon
import { MessageSquare } from 'lucide-react';
