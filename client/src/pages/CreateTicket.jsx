import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/ui/Button";
import AnimatedTransition from "../common/AnimatedTransition";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/HoverCard";
import TicketForm from "../components/tickets/TicketForm";

const CreateTicket = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const canCreateTicket = hasPermission("create:ticket");

  if (!canCreateTicket) {
    return (
      <div className="p-6 md:p-8">
        <div className="max-w-2xl mx-auto glass-panel p-6 border text-center">
          <h2 className="text-2xl font-bold mb-4">Permission Denied</h2>
          <p className="text-muted-foreground mb-6">
            You don't have permission to create tickets.
          </p>
          <Button onClick={() => navigate("/tickets")}>
            Return to Tickets
          </Button>
        </div>
      </div>
    );
  }
  return (
    <AnimatedTransition>
      <div className="p-6 md:p-8">
        <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/tickets')}
              className="h-8 w-8 mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold">Create New Ticket</h2>
          </div>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Ticket Creation Tips</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Use a clear, specific title</p>
                  <p>• Include steps to reproduce the issue</p>
                  <p>• Mention error messages if applicable</p>
                  <p>• Select the appropriate category and priority</p>
                  <p>• Attach screenshots or logs if available</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <TicketForm />
        </div>
    </AnimatedTransition>
  )
};

export default CreateTicket;
