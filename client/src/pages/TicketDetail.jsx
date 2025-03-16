import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import TicketDetails from '@/components/tickets/TicketDetails';
// import { mockTickets, mockComments, mockKnowledgeArticles, Ticket } from '@/utils/mockData';
// import NotFound from './NotFound';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  MessageSquare, 
  Search, 
  ThumbsUp, 
  AlertTriangle, 
  ArrowUpCircle,
  Edit,
  Save
} from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Input } from '@/components/ui/input';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';
// import { Dialog, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockComments, mockTickets } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useToast } from '../hooks/useToast';
import NotFound from './NotFound';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import TicketDetails from '../components/tickets/TicketDetails';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(mockTickets.find(ticket => ticket.id === id));
  const { user, hasPermission } = useAuth()
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(ticket?.title || '');
  const [editedDescription, setEditedDescription] = useState(ticket?.description || '');
  const [editedPriority, setEditedPriority] = useState(ticket?.priority || 'medium');
  const [escalateDialogOpen, setEscalateDialogOpen] = useState(false);
  const [escalationReason, setEscalationReason] = useState('');

  if (!ticket) return <NotFound />;

  // Check if user has permission to view this ticket
  const canViewTicket = 
    user && (
      hasPermission('view:all_tickets') || 
      (hasPermission('view:own_tickets') && ticket.createdBy.id === user.id) ||
      (user.id === ticket.assignedTo?.id)
    );

  // Check if user has permission to resolve the ticket
  const canResolveTicket = 
    user && (
      hasPermission('update:any_ticket') || 
      (hasPermission('update:team_ticket') && user.role === 'manager') ||
      (hasPermission('update:own_ticket') && user.id === ticket.assignedTo?.id)
    );
    
  // Check if user can escalate tickets
  const canEscalateTicket =
    user && (
      hasPermission('update:any_ticket') ||
      hasPermission('update:team_ticket') ||
      (hasPermission('update:own_ticket') && 
        (user.id === ticket.assignedTo?.id || user.id === ticket.createdBy.id))
    );

//   if (!canViewTicket) {
//     return (
//       <div className="p-6 md:p-8">
//         <Alert variant="destructive" className="mb-4">
//           <AlertTriangle className="h-4 w-4" />
//           <AlertDescription>
//             You don't have permission to view this ticket.
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

  const handleSaveEdit = () => {
    setTicket({ ...ticket, title: editedTitle, description: editedDescription, priority: editedPriority });
    setEditDialogOpen(false);
    toast({ title: "Ticket updated", description: "The ticket details have been updated." });
  };

  const handleEscalateTicket = () => {
    setTicket({ ...ticket, priority: 'high' });
    setEscalateDialogOpen(false);
    toast({ title: "Ticket escalated", description: "The ticket has been escalated to high priority." });
  };

  // Filter comments related to this ticket
  const ticketComments = mockComments.filter(comment => comment.ticketId === id).map(comment => ({
    id: comment.id,
    content: comment.content,
    createdAt: new Date(comment.createdAt),
    user: comment.user
  }));


  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/tickets')}
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
              commentsCount: ticket.commentsCount
            }}
            comments={ticketComments}
            canResolve={canResolveTicket}
          />
        </div>
        <Card className="border sticky top-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><FileText className="h-5 w-5 mr-2" /> Resolution Resources</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <Input placeholder="Search knowledge base..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="space-y-4">
              {mockKnowledgeArticles.filter(article => article.title.includes(searchQuery)).map(article => (
                <div key={article.id} className="border-b pb-3">
                  <a href={`/knowledge/${article.id}`} className="text-sm font-medium hover:text-primary">{article.title}</a>
                  <p className="text-xs mt-1">{article.content.substring(0, 60)}...</p>
                </div>
              ))}
            </div> */}
          </CardContent>
        </Card>
      </div>
  );
};

export default TicketDetail;
