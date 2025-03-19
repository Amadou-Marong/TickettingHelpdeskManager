import React from "react";
import AnimatedTransition from "../common/AnimatedTransition";
import Button from "../components/ui/Button";
import { ArrowDownRight, ArrowUpRight, Calendar, CheckCircle2, Clock, Download, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";

const Reports = () => {
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
                <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
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
                <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
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
                <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
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

      </div>
    </AnimatedTransition>
  );
};

export default Reports;
