import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FileText,
  MessageSquare,
  Search,
  ThumbsUp,
  AlertTriangle,
  ArrowUpCircle,
  Edit,
  Save,
} from "lucide-react";

import { mockComments, mockKnowledgeArticles, mockTickets } from "../data/mockData";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { useToast } from "../hooks/useToast";
import NotFound from "./NotFound";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import TicketDetails from "../components/tickets/TicketDetails";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { Textarea } from "../components/ui/Textarea";
import { Alert, AlertDescription } from "../components/ui/Alert";

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(
    mockTickets.find((ticket) => ticket.id === id)
  );
  const { user, hasPermission } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(ticket?.title || "");
  const [editedDescription, setEditedDescription] = useState(
    ticket?.description || ""
  );

  const [editedCategory, setEditedCategory] = useState(ticket?.category || 'general');

  const [editedPriority, setEditedPriority] = useState(
    ticket?.priority || "medium"
  );
  const [escalateDialogOpen, setEscalateDialogOpen] = useState(false);
  const [escalationReason, setEscalationReason] = useState("");

  
  if (!ticket) return <NotFound />;

  // Check if user has permission to view this ticket
  const canViewTicket =
    user &&
    (hasPermission("view:all_tickets") ||
      (hasPermission("view:own_tickets") && ticket.createdBy.id === user.id) ||
      user.id === ticket.assignedTo?.id);

  // Check if user has permission to resolve the ticket
  const canResolveTicket =
    user &&
    (hasPermission("update:any_ticket") ||
      (hasPermission("update:team_ticket") && user.role === "manager") ||
      (hasPermission("update:own_ticket") &&
        user.id === ticket.assignedTo?.id));

  // Check if user can escalate tickets
  const canEscalateTicket =
    user &&
    (hasPermission("update:any_ticket") ||
      hasPermission("update:team_ticket") ||
      (hasPermission("update:own_ticket") &&
        (user.id === ticket.assignedTo?.id ||
          user.id === ticket.createdBy.id)));

    if (!canViewTicket) {
      return (
        <div className="p-6 md:p-8">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You don't have permission to view this ticket.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

  const handleSaveEdit = () => {
    setTicket({
      ...ticket,
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
    });
    setEditDialogOpen(false);
    toast({
      title: "Ticket updated",
      description: "The ticket details have been updated.",
    });
  };

  const handleEscalateTicket = () => {
    setTicket({ ...ticket, priority: "high" });
    setEscalateDialogOpen(false);
    toast({
      title: "Ticket escalated",
      description: "The ticket has been escalated to high priority.",
    });
  };

  // Filter comments related to this ticket
  const ticketComments = mockComments
    .filter((comment) => comment.ticketId === id)
    .map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: new Date(comment.createdAt),
      user: comment.user,
    }));


     // Filter knowledge articles related to the ticket keywords
  const relatedArticles = ticket 
  ? mockKnowledgeArticles.filter(article => {
      // Check if ticket keywords are found in the article
      const matchesTitle = article.title.toLowerCase().includes(ticket.title.toLowerCase());
      const matchesCategory = article.category.toLowerCase() === ticket.category.toLowerCase();
      const matchesContent = ticket.description && article.content.toLowerCase().includes(ticket.description.toLowerCase());
      
      return matchesTitle || matchesCategory || matchesContent;
    })
  : [];

     // Filter articles based on search query
  const filteredArticles = searchQuery.trim() 
  ? mockKnowledgeArticles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : relatedArticles;


  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/tickets")}
              >
                Back to Tickets
              </Button>
            </div>
            <div className="flex gap-2">
              {canResolveTicket && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditDialogOpen(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              )}
              {canEscalateTicket && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEscalateDialogOpen(true)}
                >
                  <ArrowUpCircle className="h-4 w-4 mr-2" />
                  Escalate
                </Button>
              )}
            </div>
          </div>

          <TicketDetails
            ticket={{
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
              commentsCount: ticket.commentsCount,
            }}
            comments={ticketComments}
            canResolve={canResolveTicket}
          />
        </div>
        
         {/* Resolution Resources Section - Only visible for support agents */}
         {(canResolveTicket || user?.role === 'admin' || user?.role === 'manager') && (
          <div className="lg:w-96">
            <Card className="border sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Resolution Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Search knowledge base..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Related Articles
                  </h4>
                  
                  {filteredArticles.length > 0 ? (
                    <ul className="space-y-3">
                      {filteredArticles.map(article => (
                        <li key={article.id} className="border-b pb-3 last:border-b-0">
                          <a 
                            href={`/knowledge/${article.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:text-blue-600 transition-colors"
                          >
                            {article.title}
                          </a>
                          <p className="text-xs text-muted-foreground mt-1">
                            {article.content.substring(0, 60)}...
                          </p>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span>{article.helpfulCount} found helpful</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">No related articles found</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Common Resolutions</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                        <span className="text-xs">1</span>
                      </div>
                      <span>Check system requirements and compatibility</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                        <span className="text-xs">2</span>
                      </div>
                      <span>Restart the application or device</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                        <span className="text-xs">3</span>
                      </div>
                      <span>Verify user permissions and access rights</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
        
        {/* Edit Ticket Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit className="h-5 w-5 mr-2" />
              Edit Ticket Details
            </DialogTitle>
            <DialogDescription>
              Make changes to the ticket information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                value={editedTitle} 
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                value={editedDescription} 
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                <Select 
                  value={editedPriority} 
                  onValueChange={(value) => setEditedPriority(value)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select 
                  value={editedCategory} 
                  onValueChange={setEditedCategory}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                    <SelectItem value="access">Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Escalate Ticket Dialog */}
      <Dialog open={escalateDialogOpen} onOpenChange={setEscalateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ArrowUpCircle className="h-5 w-5 mr-2" />
              Escalate Ticket
            </DialogTitle>
            <DialogDescription>
              Provide a reason for escalating this ticket
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium">Escalation Reason</label>
              <Textarea 
                id="reason" 
                value={escalationReason} 
                onChange={(e) => setEscalationReason(e.target.value)}
                placeholder="Please explain why this ticket needs to be escalated..."
                rows={4}
              />
            </div>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Escalating this ticket will set its priority to high and bring it to the attention of managers.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEscalateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEscalateTicket}>
              <ArrowUpCircle className="h-4 w-4 mr-2" />
              Escalate Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default TicketDetail;
