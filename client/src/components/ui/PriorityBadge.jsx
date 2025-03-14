import React from 'react';
// import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  AlertTriangle, 
  ArrowUp, 
  CircleDot 
} from 'lucide-react';
import { Badge } from './Badge';

const priorityConfig = {
  'low': {
    label: 'Low',
    color: 'bg-ticket-low/15 text-ticket-low border-ticket-low/20',
    icon: CircleDot
  },
  'medium': {
    label: 'Medium',
    color: 'bg-ticket-medium/15 text-ticket-medium border-ticket-medium/20',
    icon: ArrowUp
  },
  'high': {
    label: 'High',
    color: 'bg-ticket-high/15 text-ticket-high border-ticket-high/20',
    icon: AlertTriangle
  },
  'urgent': {
    label: 'Urgent',
    color: 'bg-ticket-urgent/15 text-ticket-urgent border-ticket-urgent/20',
    icon: AlertCircle
  }
};

const PriorityBadge = ({ priority, className, showIcon = true }) => {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  
  return (
    <Badge 
      variant="outline" 
      className={`${config.color} font-medium rounded-full py-0.5 px-2.5 ${className}`}
    >
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {config.label}
    </Badge>
  );
};

export default PriorityBadge;
