import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CornerUpRight, 
  MessageSquare, 
  User 
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import PriorityBadge from '../ui/PriorityBadge';
import StatusBadge from '../ui/StatusBadge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { formatDistanceToNow } from 'date-fns';

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  const formattedDate = formatDistanceToNow(new Date(ticket.createdAt), {
    addSuffix: true,
  });

  return (
    <Card 
      className="glass-panel glass-panel-hover overflow-hidden cursor-pointer transform transition-all hover:-translate-y-1 border"
      onClick={() => navigate(`/tickets/`)}
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-medium text-base line-clamp-1">{ticket.title}</h3>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <span>#{ticket.id.substring(0, 8)}</span>
            {ticket.status === 'escalated' && (
              <div className="flex items-center text-status-escalated ml-1">
                <CornerUpRight className="h-3 w-3 mr-0.5" />
                <span>Escalated</span>
              </div>
            )}
          </div>
        </div>
        <PriorityBadge priority={ticket.priority} className="ml-auto" />
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
          {ticket.description}
        </p>
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t border-gray-300 bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-2 mt-4">
          <StatusBadge status={ticket.status} />
          <div className="flex items-center text-xs text-gray-600">
            <MessageSquare className="h-3 w-3 mr-1" />
            {ticket.commentsCount}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {ticket.assignedTo ? (
            <Avatar className="h-6 w-6">
              <AvatarImage src={ticket.assignedTo.avatar} alt={ticket.assignedTo.name} />
              <AvatarFallback className="text-xs">
                {ticket.assignedTo.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex items-center text-xs text-muted-foreground">
              <User className="h-3 w-3 mr-1" />
              <span>Unassigned</span>
            </div>
          )} 
          
          <div className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
