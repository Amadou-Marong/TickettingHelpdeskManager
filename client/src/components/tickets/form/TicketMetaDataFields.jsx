
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../../ui/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/Select';
import { Input } from '../../ui/input';

const TicketMetadataFields = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="assignTo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Assign To (Optional)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="input-field">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
                <SelectItem value="alex">Alex Johnson</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Leave empty for automatic assignment.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="cc"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CC (Optional)</FormLabel>
            <FormControl>
              <Input 
                placeholder="Email addresses separated by commas" 
                {...field} 
                className="input-field"
              />
            </FormControl>
            <FormDescription>
              Notify others about this ticket.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TicketMetadataFields;
