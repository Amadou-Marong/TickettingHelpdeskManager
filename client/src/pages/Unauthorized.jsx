
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import AnimatedTransition from '../common/AnimatedTransition';
import Button from '../components/ui/Button';
// import AnimatedTransition from '@/components/common/AnimatedTransition';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <ShieldAlert className="h-20 w-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page. Please contact your administrator
            if you believe this is a mistake.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate(-1)}>Go Back</Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Unauthorized;
