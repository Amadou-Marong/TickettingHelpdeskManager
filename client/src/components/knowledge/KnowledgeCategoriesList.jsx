
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import { 
  Monitor, 
  HardDrive, 
  Lock, 
  Network, 
  Server, 
  Smartphone, 
  HelpCircle, 
  Settings, 
  FileText 
} from 'lucide-react';

export const categories = [
  {
    id: 'hardware',
    name: 'Hardware Issues',
    icon: HardDrive,
    color: 'bg-red-100 text-red-600',
    count: 24,
    description: 'Troubleshooting physical equipment problems'
  },
  {
    id: 'software',
    name: 'Software Issues',
    icon: Monitor,
    color: 'bg-blue-100 text-blue-600',
    count: 35,
    description: 'Application and operating system support'
  },
  {
    id: 'network',
    name: 'Network Issues',
    icon: Network,
    color: 'bg-green-100 text-green-600',
    count: 18,
    description: 'Connectivity and network infrastructure problems'
  },
  {
    id: 'access',
    name: 'Access Requests',
    icon: Lock,
    color: 'bg-purple-100 text-purple-600',
    count: 27,
    description: 'System access and permission requests'
  },
  {
    id: 'mobile',
    name: 'Mobile Devices',
    icon: Smartphone,
    color: 'bg-yellow-100 text-yellow-600',
    count: 15,
    description: 'Smartphones, tablets, and mobile app support'
  },
  {
    id: 'server',
    name: 'Server Issues',
    icon: Server,
    color: 'bg-indigo-100 text-indigo-600',
    count: 12,
    description: 'Server maintenance and troubleshooting'
  },
  {
    id: 'general',
    name: 'General Queries',
    icon: HelpCircle,
    color: 'bg-orange-100 text-orange-600',
    count: 41,
    description: 'Frequently asked questions and general help'
  },
  {
    id: 'settings',
    name: 'System Settings',
    icon: Settings,
    color: 'bg-gray-100 text-gray-600',
    count: 19,
    description: 'Configuration and settings guidance'
  }
];


const KnowledgeCategoriesList = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Card 
          key={category.id}
          className="cursor-pointer hover:shadow-md transition-shadow border"
          onClick={() => navigate(`/knowledge/category/${category.id}`)}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className={`h-12 w-12 rounded-full ${category.color} flex items-center justify-center mb-4`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-1">{category.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{category.count} articles</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KnowledgeCategoriesList;
