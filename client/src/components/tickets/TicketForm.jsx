
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from '../ui/Form';
import AnimatedTransition from '../../common/AnimatedTransition';
import { ticketFormSchema } from './form/ticketFormSchema';
import TicketDetailsFields from './form/TicketDetailFields';
import TicketCategoryFields from './form/TicketCategoryFields';
import TicketMetadataFields from './form/TicketMetaDataFields';
import TicketAttachmentSection from './form/TicketAttachmentSection';
import TicketFormButtons from './form/TicketFormButtons';


const TicketForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      priority: '',
      assignTo: '',
      cc: '',
    },
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      // Display success message
      toast.success('Ticket created successfully!');
      
      // If onSubmit is provided, call it
      if (onSubmit) {
        onSubmit(values);
      } else {
        // Navigate back to tickets page after a short delay
        setTimeout(() => {
          navigate('/tickets');
        }, 1000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedTransition>
      <div className="max-w-2xl mx-auto glass-panel p-6 border">
        <h2 className="text-2xl font-bold mb-6">Create New Ticket</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <TicketDetailsFields form={form} />
            <TicketCategoryFields form={form} />
            <TicketMetadataFields form={form} />
            <TicketAttachmentSection ticketId="new" />
            <TicketFormButtons isSubmitting={isSubmitting} />
          </form>
        </Form>
      </div>
    </AnimatedTransition>
  );
};

export default TicketForm;
