
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Play, 
  Save, 
  Download, 
  Upload, 
  FileText, 
  Plus, 
  Settings, 
  X,
  Terminal,
  FolderTree,
  Maximize2,
  Minimize2,
  Copy,
  Trash,
  MoreVertical,
  Code as CodeIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export const CodeEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [currentTab, setCurrentTab] = useState('index.js');
  const [fullScreen, setFullScreen] = useState(false);
  const [showConsole, setShowConsole] = useState(true);
  const [showFileTree, setShowFileTree] = useState(true);
  
  // Sample tabs
  const [tabs, setTabs] = useState([
    { id: 1, name: 'index.js', language: 'javascript', active: true },
    { id: 2, name: 'style.css', language: 'css', active: false },
    { id: 3, name: 'index.html', language: 'html', active: false },
  ]);
  
  // Sample code for different languages
  const codeExamples: Record<string, string> = {
    javascript: `// JavaScript Example
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));

// You can add more code here and run it
// to see the output in the console below.

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);`,
    
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Web Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a simple HTML page.</p>
  
  <script src="index.js"></script>
</body>
</html>`,
    
    css: `/* CSS Example */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

p {
  line-height: 1.5;
  color: #666;
}`,
    
    python: `# Python Example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))

# You can add more code here and run it
# to see the output in the console below.

numbers = [1, 2, 3, 4, 5]
doubled = [num * 2 for num in numbers]
print(doubled)`,
    
    java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println(greet("World"));
        
        // You can add more code here
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,
    
    cpp: `// C++ Example
#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::cout << greet("World") << std::endl;
    
    // You can add more code here
    
    return 0;
}`,
  };
  
  // Sample file tree items
  const fileTree = [
    {
      name: 'project',
      type: 'folder',
      children: [
        { name: 'index.html', type: 'file', language: 'html' },
        { name: 'assets', type: 'folder', children: [
          { name: 'style.css', type: 'file', language: 'css' },
          { name: 'script.js', type: 'file', language: 'javascript' },
        ]},
        { name: 'README.md', type: 'file', language: 'markdown' },
      ],
    },
    {
      name: 'examples',
      type: 'folder',
      children: [
        { name: 'example.py', type: 'file', language: 'python' },
        { name: 'example.java', type: 'file', language: 'java' },
        { name: 'example.cpp', type: 'file', language: 'cpp' },
      ],
    },
  ];
  
  // Sample console output
  const consoleOutput = [
    { type: 'log', content: 'Hello, World!', timestamp: '10:23:45' },
    { type: 'log', content: '[2, 4, 6, 8, 10]', timestamp: '10:23:45' },
    { type: 'info', content: 'Application initialized', timestamp: '10:23:45' },
    { type: 'warn', content: 'Deprecated feature used', timestamp: '10:23:46' },
    { type: 'error', content: 'Uncaught TypeError: Cannot read property of undefined', timestamp: '10:23:47' },
  ];
  
  // Change active tab
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
    setTabs(tabs.map(tab => ({
      ...tab,
      active: tab.name === tabName,
    })));
  };
  
  // Close a tab
  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Don't close if it's the last tab
    if (tabs.length === 1) return;
    
    // If closing the active tab, activate another tab
    const tabToClose = tabs.find(tab => tab.id === id);
    const newTabs = tabs.filter(tab => tab.id !== id);
    
    if (tabToClose?.active && newTabs.length > 0) {
      newTabs[0].active = true;
      setCurrentTab(newTabs[0].name);
    }
    
    setTabs(newTabs);
  };
  
  // Add a new tab
  const addNewTab = () => {
    const newId = Math.max(...tabs.map(tab => tab.id)) + 1;
    const newTabName = `untitled-${newId}.${language}`;
    
    // Deactivate all existing tabs
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      active: false,
    }));
    
    // Add the new tab as active
    setTabs([
      ...updatedTabs,
      {
        id: newId,
        name: newTabName,
        language,
        active: true,
      },
    ]);
    
    setCurrentTab(newTabName);
  };
  
  // Language icons mapping
  const getLanguageIcon = (lang: string) => {
    switch (lang) {
      case 'javascript':
        return <span className="text-yellow-500">JS</span>;
      case 'html':
        return <span className="text-orange-500">HTML</span>;
      case 'css':
        return <span className="text-blue-500">CSS</span>;
      case 'python':
        return <span className="text-green-500">PY</span>;
      case 'java':
        return <span className="text-red-500">JAVA</span>;
      case 'cpp':
        return <span className="text-purple-500">C++</span>;
      default:
        return <CodeIcon className="h-4 w-4" />;
    }
  };
  
  // Determine the language based on the active tab's extension
  const getActiveLanguage = () => {
    const activeTab = tabs.find(tab => tab.active);
    if (!activeTab) return language;
    
    const extension = activeTab.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'html':
      case 'css':
      case 'py':
        return extension;
      case 'java':
        return 'java';
      case 'cpp':
      case 'c':
        return 'cpp';
      default:
        return language;
    }
  };
  
  const activeLanguage = getActiveLanguage();
  
  // Render file tree recursively
  const renderFileTree = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <div key={index} style={{ paddingLeft: `${level * 16}px` }}>
        <div className="flex items-center py-1 px-2 hover:bg-accent rounded-md cursor-pointer">
          {item.type === 'folder' ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-500 mr-2"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <span>{item.name}</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500 mr-2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>{item.name}</span>
            </>
          )}
        </div>
        {item.children && renderFileTree(item.children, level + 1)}
      </div>
    ));
  };
  
  // Console output component
  const ConsoleOutput = () => (
    <div className="text-sm font-mono">
      {consoleOutput.map((line, index) => (
        <div 
          key={index} 
          className={`py-1 ${
            line.type === 'error' ? 'text-red-500' :
            line.type === 'warn' ? 'text-yellow-500' :
            line.type === 'info' ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          <span className="text-gray-500">[{line.timestamp}]</span>{' '}
          {line.content}
        </div>
      ))}
    </div>
  );
  
  return (
    <Layout title="Code Editor">
      <Card className={`${fullScreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
        {/* Editor Toolbar */}
        <CardHeader className="border-b p-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <CardTitle className="text-xl">Code Editor</CardTitle>
              <Badge variant="outline" className="ml-2">
                Beta
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
              
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="ghost" size="icon" onClick={() => setFullScreen(!fullScreen)}>
                {fullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 grid grid-cols-12">
          {/* File Tree */}
          {showFileTree && (
            <div className="col-span-12 md:col-span-2 border-r border-border">
              <div className="p-2 border-b flex justify-between items-center">
                <h3 className="font-medium text-sm">Files</h3>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="h-[calc(100vh-15rem)]">
                <div className="p-2">
                  {renderFileTree(fileTree)}
                </div>
              </ScrollArea>
            </div>
          )}
          
          {/* Editor Area */}
          <div className={`col-span-12 ${showFileTree ? 'md:col-span-10' : ''}`}>
            {/* Tabs */}
            <div className="flex border-b overflow-x-auto">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex items-center px-3 py-2 border-r cursor-pointer ${
                    tab.active ? 'bg-background border-b-2 border-b-primary -mb-px' : 'bg-muted/30'
                  }`}
                  onClick={() => handleTabChange(tab.name)}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{getLanguageIcon(tab.language)}</span>
                    <span className="text-sm">{tab.name}</span>
                  </div>
                  <button 
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={(e) => closeTab(tab.id, e)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button 
                className="px-3 py-2 text-muted-foreground hover:text-foreground border-r"
                onClick={addNewTab}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            {/* Code Editor */}
            <div className="relative">
              <pre className="font-mono text-sm p-4 overflow-auto h-[calc(100vh-22rem)]">
                <code>{codeExamples[activeLanguage] || codeExamples.javascript}</code>
              </pre>
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3 mr-1" />
                      Settings
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Font Size</DropdownMenuItem>
                    <DropdownMenuItem>Tab Size</DropdownMenuItem>
                    <DropdownMenuItem>Line Numbers</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Editor Preferences</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Console Output */}
            {showConsole && (
              <div>
                <div className="border-t p-2 flex justify-between items-center bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4" />
                    <h3 className="font-medium text-sm">Console</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => setShowConsole(!showConsole)}
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <ScrollArea className="h-48 p-3 bg-black/80 text-white">
                  <ConsoleOutput />
                </ScrollArea>
              </div>
            )}
          </div>
        </CardContent>
        
        {/* Editor Footer */}
        <CardFooter className="border-t py-2 px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              onClick={() => setShowFileTree(!showFileTree)}
            >
              <FolderTree className="h-4 w-4" />
              {showFileTree ? 'Hide Files' : 'Show Files'}
            </button>
            
            <button
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              onClick={() => setShowConsole(!showConsole)}
            >
              <Terminal className="h-4 w-4" />
              {showConsole ? 'Hide Console' : 'Show Console'}
            </button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Line: 1, Column: 1 | {activeLanguage.charAt(0).toUpperCase() + activeLanguage.slice(1)}
          </div>
        </CardFooter>
      </Card>
    </Layout>
  );
};
