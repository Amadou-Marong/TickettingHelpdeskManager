import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicketDetails from '@/components/tickets/TicketDetails';
import { mockTickets, mockComments, mockKnowledgeArticles, Ticket } from '@/utils/mockData';
import NotFound from './NotFound';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(mockTickets.find(ticket => ticket.id === id));
  const { user, hasPermission } = useAuth();
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

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Button variant="outline" size="sm" onClick={() => navigate('/tickets')}>Back to Tickets</Button>
          <TicketDetails ticket={ticket} />
        </div>
        <Card className="border sticky top-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><FileText className="h-5 w-5 mr-2" /> Resolution Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="Search knowledge base..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="space-y-4">
              {mockKnowledgeArticles.filter(article => article.title.includes(searchQuery)).map(article => (
                <div key={article.id} className="border-b pb-3">
                  <a href={`/knowledge/${article.id}`} className="text-sm font-medium hover:text-primary">{article.title}</a>
                  <p className="text-xs mt-1">{article.content.substring(0, 60)}...</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketDetail;
