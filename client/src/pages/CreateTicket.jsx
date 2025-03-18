import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/ui/Button";
import AnimatedTransition from "../common/AnimatedTransition";

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
        
      </div>
    </AnimatedTransition>
  )
};

export default CreateTicket;
