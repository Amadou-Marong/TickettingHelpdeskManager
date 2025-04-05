import { BarChart3, ChevronLeft, ChevronRight, FileText, HelpCircle, Home, MessageSquare, PanelRight, Settings, Ticket, User } from "lucide-react";
import { useState } from "react"
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/Tooltip";

const Sidebar = ({onToggle, collapsed}) => {
    // const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    // const handleToggle = () => {
    //     setCollapsed(!collapsed)
    //     onToggle(!collapsed)
    // }


    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Tickets', path: '/tickets', icon: Ticket },
        { name: 'Users', path: '/users', icon: User },
        { name: 'Reports', path: '/reports', icon: BarChart3 },
        { name: 'Knowledge Base', path: '/knowledge', icon: FileText },
    ];

    const secondaryItems = [
        { name: 'Settings', path: '/settings', icon: Settings },
        { name: 'Help and Support', path: '/help', icon: HelpCircle },
    ];

    return (
        <aside 
            className={`min-h-screen fixed inset-y-15 left-0 z-40 transition-all duration-300 ease-in-out flex flex-col border-r border-gray-300 bg-gray-50 ${collapsed ? 'w-[70px]' : 'w-[200px]'}`}
        >
            <div className="flex items-center justify-between p-4 h-16 relative">
                {!collapsed ? (
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium text-lg text-gray-900">TicketFlow</span>
                    </Link>
                ) : (
                    <div className="mx-auto h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                )}
                {/* <Button variant="ghost" size="icon" className="absolute top-1 right-[-37px]" onClick={handleToggle}> */}
                    {/* {collapsed ? <ChevronRight className="h-5 w-5 text-gray-600" /> : <ChevronLeft className="h-5 w-5 text-gray-600" />} */}
                    {/* {collapsed ? <PanelRight className="h-5 w-5 text-gray-600" /> : <ChevronLeft className="h-5 w-5 text-gray-600" />} */}
                {/* </Button> */}
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3">
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <TooltipProvider key={item.name} delayDuration={collapsed ? 100 : 1000}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link to={item.path}>
                                        <div 
                                            className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 
                                            ${location.pathname.startsWith(item.path) ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'}
                                            ${collapsed ? 'justify-center' : ''}`}
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
        </aside>
    );
}

export default Sidebar;
