
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

const TicketFormButtons = ({ isSubmitting = false }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end gap-3 pt-4 border-t">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate('/tickets')}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
      </Button>
    </div>
  );
};

export default TicketFormButtons;
