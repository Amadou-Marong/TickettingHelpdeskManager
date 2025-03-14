import { CheckCircle2, Clock, ThumbsUp, Ticket } from "lucide-react";
import Button from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import AnimatedTransition from "../common/AnimatedTransition";

export const StatCard = ({ title, value, description, icon, trend }) => {
  return (
    <Card className="glass-panel glass-panel-hover border">
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
  return (
    <AnimatedTransition>
      <div className="space-y-6 p-6 md:p-8 bg-gray-100 h-screen">
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
                      {/* <Tag className="h-4 w-4 mr-2 text-blue-600" /> */}
                      <span>Hardware Issues</span>
                    </div>
                    <span>38 tickets (27%)</span>
                  </div>
                  {/* <Progress value={27} className="h-2" /> */}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      {/* <Tag className="h-4 w-4 mr-2 text-purple-600" /> */}
                      <span>Software Issues</span>
                    </div>
                    <span>47 tickets (33%)</span>
                  </div>
                  {/* <Progress value={33} className="h-2" /> */}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      {/* <Tag className="h-4 w-4 mr-2 text-green-600" /> */}
                      <span>Network Issues</span>
                    </div>
                    <span>28 tickets (20%)</span>
                  </div>
                  {/* <Progress value={20} className="h-2" /> */}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      {/* <Tag className="h-4 w-4 mr-2 text-amber-600" /> */}
                      <span>Access Requests</span>
                    </div>
                    <span>29 tickets (20%)</span>
                  </div>
                  {/* <Progress value={20} className="h-2" /> */}
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
