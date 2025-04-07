
import React from 'react';
import TicketAttachments from '../TicketAttachments';

const TicketAttachmentSection = ({ ticketId }) => {
  return (
    <div className="space-y-4 pt-4 border-t">
      <h3 className="text-lg font-medium">Attachments</h3>
      <TicketAttachments ticketId={ticketId} />
    </div>
  );
};

export default TicketAttachmentSection;
