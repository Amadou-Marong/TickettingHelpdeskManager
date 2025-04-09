import {
  Bell,
  ChevronRight,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
  Sidebar,
  User,
  Users,
} from "lucide-react";
import { Input } from "../ui/input";
import Button from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Badge } from "../ui/Badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ModeToggle } from "../theme/ThemeToggle";

const NavBar = ({ onToggle, collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { user, logout, hasPermission } = useAuth();

  const handleToggle = () => {
    setCollapsed(!collapsed);
    onToggle(!collapsed);
  };

  return (
    <nav className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="hidden md:flex items-center gap-6 lg:gap-10 flex-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Sidebar
              onClick={handleToggle}
              className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors"
            />
          </Button>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tickets, users, knowledge base..."
              className="w-full bg-background pl-8 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {user && (
              <Button
                onClick={() => navigate("/create-ticket")}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Plus className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Button>
            {/* <ModeToggle /> */}
            

            {user ? (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {/* <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden border"> */}
                  <User className="h-5 w-5" />
                  {/* </div> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <Badge variant="outline" className="mt-2 w-fit capitalize">
                      {user.role}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/tickets')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Tickets
                </DropdownMenuItem>

                {hasPermission('manage:users') && (
                  <DropdownMenuItem onClick={() => navigate('/user-management')}>
                    <Users className="mr-2 h-4 w-4" />
                    User Management
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            ) : (
              <Button onClick={() => navigate('/login')}>
                Login
              </Button>
            )}

            {/* <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <img
                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
