import { useState } from "react";
import AnimatedTransition from "../common/AnimatedTransition";
import Button from "../components/ui/Button";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  LineChart,
  PieChart,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart as RechartLineChart,
  Line,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";

// Mock data for charts
const ticketsByCategory = [
  { name: "Hardware", value: 28 },
  { name: "Software", value: 45 },
  { name: "Network", value: 18 },
  { name: "Access", value: 34 },
  { name: "Other", value: 12 },
];

const ticketsByStatus = [
  { name: "Open", value: 24 },
  { name: "In Progress", value: 38 },
  { name: "On Hold", value: 12 },
  { name: "Resolved", value: 65 },
  { name: "Escalated", value: 8 },
];

const ticketsByPriority = [
  { name: "Low", value: 35 },
  { name: "Medium", value: 45 },
  { name: "High", value: 15 },
  { name: "Urgent", value: 5 },
];

const timelineData = [
  { name: "Week 1", tickets: 45, resolved: 32 },
  { name: "Week 2", tickets: 52, resolved: 41 },
  { name: "Week 3", tickets: 38, resolved: 35 },
  { name: "Week 4", tickets: 65, resolved: 50 },
  { name: "Week 5", tickets: 48, resolved: 43 },
  { name: "Week 6", tickets: 57, resolved: 52 },
];

const responseTimeData = [
  { name: "Mon", time: 3.2 },
  { name: "Tue", time: 2.8 },
  { name: "Wed", time: 4.1 },
  { name: "Thu", time: 3.5 },
  { name: "Fri", time: 2.5 },
  { name: "Sat", time: 1.8 },
  { name: "Sun", time: 1.2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Reports = () => {
  const { hasPermission } = useAuth();
  const [dateRange, setDateRange] = useState("last30days");

  if (!hasPermission("view:reports")) {
    return (
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold">Unauthorized</h2>
        <p className="text-muted-foreground">
          You don't have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <AnimatedTransition>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Reports & Analytics
            </h2>
            <p className="text-muted-foreground">
              View insights and analytics about your support operations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {/* {dateRange === 'last7days' && 'Last 7 Days'} */}
              {/* {dateRange === 'last30days' && 'Last 30 Days'} */}
              {/* {dateRange === 'last90days' && 'Last 90 Days'} */}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  Total Tickets
                </CardTitle>
                <CardDescription>All time</CardDescription>
              </div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,482</div>
              <div className="flex items-center pt-1 text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                12% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  Avg. Resolution Time
                </CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.8 hours</div>
              <div className="flex items-center pt-1 text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                8% better than target
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  Resolution Rate
                </CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </div>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <div className="flex items-center pt-1 text-sm text-red-600">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                2% from last month
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid md:grid-cols-3 gap-4">
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="perfomance">
              <LineChart className="h-4 w-4 mr-2" />
              Perfomance
            </TabsTrigger>
            <TabsTrigger value="breakdown">
              <PieChart className="h-4 w-4 mr-2" />
              Breakdown
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Ticket volume over time
                </CardTitle>
                <CardDescription>
                  Number of tickets created vs resolved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartLineChart
                      data={timelineData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="tickets"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="Created"
                      />
                      <Line
                        type="monotone"
                        dataKey="resolved"
                        stroke="#82ca9d"
                        name="Resolved"
                      />
                    </RechartLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="perfomance" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average response time</CardTitle>
                <CardDescription>
                  Average time to first response in hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={responseTimeData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        label={{
                          value: "Hours",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <RechartsTooltip />
                      <Bar
                        dataKey="time"
                        fill="#8884d8"
                        name="Response Time (hours)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breakdown" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tickets by Category</CardTitle>
                  <CardDescription>
                    Destribution of tickets across categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPieChart>
                        <Pie
                          data={ticketsByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {ticketsByCategory.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </RechartPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tickets by Status</CardTitle>
                  <CardDescription>
                    Current status of all tickets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPieChart>
                        <Pie
                          data={ticketsByStatus}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {ticketsByStatus.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </RechartPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedTransition>
  );
};

export default Reports;
