import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Ticket,
  Users,
  BarChart3,
  Settings,
  FileText,
  HelpCircle,
  MessageSquare,
  Tag,
  ChevronRight,
  ChevronLeft,
  User,
  PenSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { hasPermission } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Tickets', path: '/tickets', icon: Ticket },
    hasPermission('view:user_activity') && { name: 'Users', path: '/users', icon: Users },
    hasPermission('view:reports') && { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'Knowledge Base', path: '/knowledge', icon: FileText },
  ].filter(Boolean);

  const secondaryItems = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help & Support', path: '/help', icon: HelpCircle },
  ];

  return (
    <div 
      className={`h-screen fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out flex flex-col border-r bg-sidebar/90 backdrop-blur-md ${collapsed ? 'w-[70px]' : 'w-[250px]'}`}
    >
      <div className="flex items-center justify-between p-4 h-16">
        {!collapsed ? (
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="font-medium text-lg">TicketFlow</span>
          </Link>
        ) : (
          <div className="mx-auto h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
        )}
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <TooltipProvider key={item.name} delayDuration={collapsed ? 100 : 1000}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <div 
                      className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${location.pathname.startsWith(item.path) ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'} ${collapsed ? 'justify-center' : ''}`}
                    >
                      <item.icon className={`h-5 w-5 ${collapsed ? 'mr-0' : 'mr-3'}`} />
                      {!collapsed && <span>{item.name}</span>}
                    </div>
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;