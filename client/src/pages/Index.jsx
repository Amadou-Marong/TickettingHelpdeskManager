
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
// import AnimatedTransition from '@/components/common/AnimatedTransition';
// import Navbar from '@/components/layout/Navbar';
import { ArrowRight, Book, Headset, LightbulbIcon, MessageSquare, Users } from 'lucide-react';
import NavBar from '../components/Layout/NavBar';
import AnimatedTransition from '../common/AnimatedTransition';
import Button from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <AnimatedTransition>
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              HelpDesk Pro
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              A comprehensive platform for managing support tickets, knowledge base, and customer service needs with role-based access control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button size="lg" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button size="lg" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/register')}>
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-300/50 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ticket Management</h3>
              <p className="text-muted-foreground mb-4">
                Create, track, and resolve support tickets with ease. Get real-time updates on ticket status.
              </p>
              <Badge variant="secondary" className="capitalize">For All Roles</Badge>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-300/50 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
              <p className="text-muted-foreground mb-4">
                Access solutions to common problems. Create and manage knowledge articles.
              </p>
              <Badge variant="secondary" className="capitalize">For All Roles</Badge>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-300/50 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-muted-foreground mb-4">
                Assign tickets, collaborate on solutions, and manage team workload efficiently.
              </p>
              <Badge variant="secondary" className="capitalize">For Managers & Admins</Badge>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-md border border-gray-300/20">
              <div className="flex items-center mb-4">
                <Headset className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold">For Support Agents</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Efficiently manage and resolve customer tickets</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Access knowledge base for quick problem resolution</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Collaborate with team members on complex issues</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md border border-gray-300/20">
              <div className="flex items-center mb-4">
                <LightbulbIcon className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold">For Managers & Admins</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Monitor team performance and ticket analytics</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Manage user permissions and team assignments</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Generate comprehensive reports and insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default Index;
