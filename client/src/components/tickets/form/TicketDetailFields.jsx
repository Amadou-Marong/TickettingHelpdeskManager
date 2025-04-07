
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../../ui/Form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/Textarea';

const TicketDetailsFields = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input 
                placeholder="Briefly describe the issue" 
                {...field} 
                className="input-field"
              />
            </FormControl>
            <FormDescription>
              A clear and concise summary of the issue.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Provide details about your issue..." 
                {...field} 
                rows={5}
                className="input-field resize-none"
              />
            </FormControl>
            <FormDescription>
              Include relevant details, steps to reproduce, error messages, etc.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TicketDetailsFields;
