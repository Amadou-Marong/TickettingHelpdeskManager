import { useState } from "react";
import AnimatedTransition from "../../common/AnimatedTransition";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "../ui/Tabs";
import Button from "../ui/Button";
import TicketCard from "./TicketCard";
import { ChevronDown, Filter, Plus, Search } from "lucide-react";
// import Input from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { Input } from "../ui/input";

const TicketList = ({ tickets, onCreateTicket }) => {
  const [selectedTab, setSelectedTab] = useState("all");

  // filter tickets based on selected tab
  const filteredTickets = tickets.filter((ticket) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "open") return ticket.status === "open";
    if (selectedTab === "in-progress") return ticket.status === "in-progress";
    if (selectedTab === "on-hold") return ticket.status === "on-hold";
    if (selectedTab === "escalated") return ticket.status === "escalated";
    if (selectedTab === "closed")
      return ticket.status === "closed" || ticket.status === "resolved";
    return true;
  });

  return (
    <AnimatedTransition>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
            <p className="text-gray-500">Here's a list of all your tickets.</p>
          </div>
          <Button onClick={onCreateTicket}>
            <Plus className="mr-2 h-4 w-4" /> Create New Ticket
          </Button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full sm:w-auto flex-1 max-w-lg">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search tickets by ID, title, or description..."
              className="pl-8 w-full"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>Low Priority</DropdownMenuItem>
                <DropdownMenuItem>Medium Priority</DropdownMenuItem>
                <DropdownMenuItem>High Priority</DropdownMenuItem>
                <DropdownMenuItem>Urgent Priority</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Select>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="escalated">Escalated</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="ticket-grid">
              {filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
            {filteredTickets.length === 0 && (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No tickets found.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="open" className="mt-6">
            <div className="ticket-grid">
              {filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
            {filteredTickets.length === 0 && (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No open tickets found.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-6">
            <div className="ticket-grid">
              {filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
            {filteredTickets.length === 0 && (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No in-progress tickets found.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="escalated" className="mt-6">
            <div className="ticket-grid">
              {filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
            {filteredTickets.length === 0 && (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No escalated tickets found.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="closed" className="mt-6">
            <div className="ticket-grid">
              {filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
            {filteredTickets.length === 0 && (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No closed tickets found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

      </div>
    </AnimatedTransition>
  );
};

export default TicketList;
