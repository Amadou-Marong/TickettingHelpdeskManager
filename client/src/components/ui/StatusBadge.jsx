
import React from 'react';
import { Badge } from './Badge';

const statusConfig = {
  'open': {
    label: 'Open',
    color: 'bg-blue-200 text-blue-800 border-blue-400'
  },
  'in-progress': {
    label: 'In Progress',
    color: 'bg-yellow-200 text-yellow-800 border-yellow-400'
  },
  'on-hold': {
    label: 'On Hold',
    color: 'bg-gray-200 text-gray-800 border-gray-400'
  },
  'resolved': {
    label: 'Resolved',
    color: 'bg-green-200 text-green-800 border-green-400'
  },
  'closed': {
    label: 'Closed',
    color: 'bg-red-200 text-red-800 border-red-400'
  },
  'escalated': {
    label: 'Escalated',
    color: 'bg-orange-200 text-orange-800 border-orange-400'
  }
};

const StatusBadge = ({ status, className }) => {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={`${config.color} font-medium rounded-full py-0.5 px-2.5 ${className}`}
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
