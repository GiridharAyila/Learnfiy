
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Moon, Sun, Bell, Shield, GitBranch } from 'lucide-react';

export const Settings = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  
  // Security preferences
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  // Integrations
  const [googleCalendar, setGoogleCalendar] = useState(false);
  const [github, setGithub] = useState(false);
  
  const handleSavePreferences = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };
  
  return (
    <Layout title="Settings">
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div 
                      className={`flex items-center justify-center border rounded-lg p-4 cursor-pointer ${
                        theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setTheme('light')}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Sun className="h-8 w-8 text-orange-500" />
                        <span>Light</span>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex items-center justify-center border rounded-lg p-4 cursor-pointer ${
                        theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setTheme('dark')}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Moon className="h-8 w-8 text-indigo-400" />
                        <span>Dark</span>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex items-center justify-center border rounded-lg p-4 cursor-pointer ${
                        theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setTheme('system')}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 flex items-center justify-center">
                          <Sun className="h-5 w-5 text-orange-500" />
                          <Moon className="h-5 w-5 text-indigo-400 -ml-2" />
                        </div>
                        <span>System</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="x-large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleSavePreferences}>Save Appearance Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <Switch 
                    id="push-notifications" 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications within the application
                    </p>
                  </div>
                  <Switch 
                    id="in-app-notifications" 
                    checked={inAppNotifications}
                    onCheckedChange={setInAppNotifications}
                  />
                </div>
                
                <Button onClick={handleSavePreferences}>Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch 
                    id="two-factor" 
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Change Password</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Reset Security Questions
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Session Management</Label>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Log Out of All Devices
                  </Button>
                </div>
                
                <Button onClick={handleSavePreferences}>Save Security Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>
                Connect your account with external services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M18 10a8 8 0 1 1-16 0c0-4.4 2.9-8 8-8 5.1 0 8 3.6 8 8Z"></path><path d="M4 10a4 4 0 0 0 4 4v0M8 20l2-3"></path><path d="M12 10a2 2 0 0 0-2 2v0a2 2 0 0 0 4 0v-1a2 2 0 0 0-2-2 2 2 0 0 0-2 2"></path><path d="M22.5 10c0-5.5-3.9-10-9-10h-1.5"></path><path d="M14 10h2.2a5 5 0 0 1 0 10h-.5M18 17 A 3 3 0 0 1 15 20"></path><path d="M14 24 H 10 L 7 20 L 10 18"></path></svg>
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Google Calendar</h3>
                      <p className="text-sm text-muted-foreground">
                        Sync your schedule with Google Calendar
                      </p>
                    </div>
                  </div>
                  <Switch 
                    id="google-calendar" 
                    checked={googleCalendar}
                    onCheckedChange={setGoogleCalendar}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gray-100 p-2">
                      <GitBranch className="text-gray-800" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-medium">GitHub</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect your GitHub account for code projects
                      </p>
                    </div>
                  </div>
                  <Switch 
                    id="github" 
                    checked={github}
                    onCheckedChange={setGithub}
                  />
                </div>
                
                <Button onClick={handleSavePreferences}>Save Integration Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};
