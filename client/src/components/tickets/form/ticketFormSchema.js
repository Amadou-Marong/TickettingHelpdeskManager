
import { z } from 'zod';

export const ticketFormSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }).max(100, {
    message: 'Title must not exceed 100 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }).max(1000, {
    message: 'Description must not exceed 1000 characters.',
  }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  priority: z.string({
    required_error: 'Please select a priority level.',
  }),
  assignTo: z.string().optional(),
  cc: z.string().optional(),
});

// Remove TypeScript type export
