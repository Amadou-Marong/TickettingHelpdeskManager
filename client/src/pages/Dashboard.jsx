import { BarChart3, CheckCircle2, Clock, Tag, ThumbsUp, Ticket, User } from "lucide-react";
import Button from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import AnimatedTransition from "../common/AnimatedTransition";
import { Progress } from "../components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import StatusBadge from "../components/ui/StatusBadge";
import { mockTickets } from "../data/mockData";
import TicketCard from "../components/tickets/TicketCard";
import { useNavigate } from "react-router-dom";



export const StatCard = ({ title, value, description, icon, trend }) => {
  return (
    <Card className="glass-panel glass-panel-hover border hover:shadow-md hover:shadow-blue-500/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div
            className={`flex items-center mt-2 text-xs ${
              trend.positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
            <span className="text-muted-foreground ml-1">vs last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

    const recentTickets = mockTickets.slice(0, 3).map((ticket) => ({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        category: ticket.category,
        createdAt: new Date(ticket.createdAt),
        updatedAt: new Date(ticket.updatedAt),
        assignedTo: ticket.assignedTo,
        createdBy: ticket.createdBy,
        commentsCount: ticket.commentsCount
    }));

  return (
    <AnimatedTransition>
      {/* <div className="space-y-6 p-6 md:p-8 bg-gray-100 h-full"> */}
      <div className="space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your support system.
            </p>
          </div>
          {/* <Button onClick={() => navigate('/create-ticket')}>Create New Ticket</Button> */}
          <Button>Create New Ticket</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Tickets"
            value="142"
            description="Active tickets in the system"
            icon={<Ticket className="h-5 w-5" />}
            trend={{
              value: "12%",
              positive: true,
            }}
          />
          <StatCard
            title="Open Tickets"
            value="37"
            description="Tickets awaiting first response"
            icon={<Clock className="h-5 w-5" />}
            trend={{
              value: "5%",
              positive: false,
            }}
          />
          <StatCard
            title="Resolved Today"
            value="24"
            description="Tickets closed in the last 24h"
            icon={<CheckCircle2 className="h-5 w-5" />}
            trend={{
              value: "18%",
              positive: true,
            }}
          />
          <StatCard
            title="Customer Satisfaction"
            value="96%"
            description="Based on ticket feedback"
            icon={<ThumbsUp className="h-5 w-5" />}
            trend={{
              value: "2%",
              positive: true,
            }}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-7">
          <Card className="glass-panel border md:col-span-4">
            <CardHeader>
              <CardTitle>Ticket Overview</CardTitle>
              <CardDescription>
                Distribution of tickets by status
              </CardDescription>
            </CardHeader>
            <CardContent>
            <Tabs defaultValue="week">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                  </TabsList>
                  <div className="text-sm text-gray-500">
                    <BarChart3 className="h-4 w-4 inline mr-1" />
                    Statistics
                  </div>
                </div>
                <TabsContent value="day" className="mt-6">
                  <div className="h-[260px] flex items-center justify-center">
                    <div className="w-full max-w-3xl space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="open" className="mr-2" />
                            <span>Open</span>
                          </div>
                          <span>15 tickets (25%)</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="in-progress" className="mr-2" />
                            <span>In Progress</span>
                          </div>
                          <span>28 tickets (47%)</span>
                        </div>
                        <Progress value={47} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="on-hold" className="mr-2" />
                            <span>On Hold</span>
                          </div>
                          <span>8 tickets (13%)</span>
                        </div>
                        <Progress value={13} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="escalated" className="mr-2" />
                            <span>Escalated</span>
                          </div>
                          <span>5 tickets (8%)</span>
                        </div>
                        <Progress value={8} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="resolved" className="mr-2" />
                            <span>Resolved</span>
                          </div>
                          <span>4 tickets (7%)</span>
                        </div>
                        <Progress value={7} className="h-2" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="week" className="mt-6">
                  <div className="h-[260px] flex items-center justify-center">
                    <div className="w-full max-w-3xl space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="open" className="mr-2" />
                            <span>Open</span>
                          </div>
                          <span>37 tickets (26%)</span>
                        </div>
                        <Progress value={26} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="in-progress" className="mr-2" />
                            <span>In Progress</span>
                          </div>
                          <span>63 tickets (44%)</span>
                        </div>
                        <Progress value={44} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="on-hold" className="mr-2" />
                            <span>On Hold</span>
                          </div>
                          <span>12 tickets (8%)</span>
                        </div>
                        <Progress value={8} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="escalated" className="mr-2" />
                            <span>Escalated</span>
                          </div>
                          <span>16 tickets (11%)</span>
                        </div>
                        <Progress value={11} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="resolved" className="mr-2" />
                            <span>Resolved</span>
                          </div>
                          <span>14 tickets (10%)</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="month" className="mt-6">
                  <div className="h-[260px] flex items-center justify-center">
                    <div className="w-full max-w-3xl space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="open" className="mr-2" />
                            <span>Open</span>
                          </div>
                          <span>83 tickets (19%)</span>
                        </div>
                        <Progress value={19} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="in-progress" className="mr-2" />
                            <span>In Progress</span>
                          </div>
                          <span>142 tickets (33%)</span>
                        </div>
                        <Progress value={33} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="on-hold" className="mr-2" />
                            <span>On Hold</span>
                          </div>
                          <span>38 tickets (9%)</span>
                        </div>
                        <Progress value={9} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="escalated" className="mr-2" />
                            <span>Escalated</span>
                          </div>
                          <span>24 tickets (6%)</span>
                        </div>
                        <Progress value={6} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status="resolved" className="mr-2" />
                            <span>Resolved</span>
                          </div>
                          <span>145 tickets (34%)</span>
                        </div>
                        <Progress value={34} className="h-2" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="glass-panel border md:col-span-3">
            <CardHeader>
              <CardTitle>Ticket Categories</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 mt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-blue-600" />
                      <span>Hardware Issues</span>
                    </div>
                    <span>38 tickets (27%)</span>
                  </div>
                  <Progress value={27} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-purple-600" />
                      <span>Software Issues</span>
                    </div>
                    <span>47 tickets (33%)</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-green-600" />
                      <span>Network Issues</span>
                    </div>
                    <span>28 tickets (20%)</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-amber-600" />
                      <span>Access Requests</span>
                    </div>
                    <span>29 tickets (20%)</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-12">
          <Card className="glass-panel border md:col-span-8">
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>
                Recently created or updated tickets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button 
                  variant="outline"
                  className="text-black" 
                  onClick={() => navigate('/tickets')}
                >
                  View All Tickets
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-panel border md:col-span-4">
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Support agent statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">Support Level 2</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">24 tickets</p>
                    <p className="text-xs text-green-600">95% satisfaction</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Jane Smith</p>
                      <p className="text-xs text-muted-foreground">Support Level 3</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">18 tickets</p>
                    <p className="text-xs text-green-600">98% satisfaction</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alex Johnson</p>
                      <p className="text-xs text-muted-foreground">Support Level 1</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">31 tickets</p>
                    <p className="text-xs text-green-600">92% satisfaction</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sarah Lee</p>
                      <p className="text-xs text-muted-foreground">Support Level 2</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">15 tickets</p>
                    <p className="text-xs text-green-600">97% satisfaction</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Dashboard;
