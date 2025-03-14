import React from 'react';
import { 
  AlertCircle, 
  AlertTriangle, 
  ArrowUp, 
  CircleDot 
} from 'lucide-react';
import { Badge } from './Badge';

const priorityConfig = {
  low: {
    label: 'Low',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CircleDot
  },
  medium: {
    label: 'Medium',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: ArrowUp
  },
  high: {
    label: 'High',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: AlertTriangle
  },
  urgent: {
    label: 'Urgent',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: AlertCircle
  }
};

const PriorityBadge = ({ priority, className = '', showIcon = true }) => {
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
