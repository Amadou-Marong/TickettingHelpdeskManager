
export const mockUsers = [
    {
      id: 'user-1',
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      department: 'IT',
    },
    {
      id: 'user-2',
      email: 'manager@example.com',
      password: 'manager123',
      name: 'Manager User',
      role: 'manager',
      department: 'Support',
    },
    {
      id: 'user-3',
      email: 'employee@example.com',
      password: 'employee123',
      name: 'Employee User',
      role: 'employee',
      department: 'Customer Support',
    },
  ];
  
  // Define permissions for each role
  export const rolePermissions = {
    admin: [
      'view:all_tickets',
      'create:ticket',
      'update:any_ticket',
      'delete:any_ticket',
      'assign:ticket',
      'manage:users',
      'view:dashboard',
      'view:reports',
      'create:knowledge',
      'edit:knowledge',
      'delete:knowledge',
      'manage:settings',
      'view:audit_logs',
      'export:data',
      'import:data',
      'manage:automations'
    ],
    manager: [
      'view:all_tickets',
      'create:ticket',
      'update:team_ticket',
      'assign:ticket',
      'view:dashboard',
      'view:reports',
      'create:knowledge',
      'edit:knowledge',
      'view:user_activity',
      'export:tickets'
    ],
    employee: [
      'view:own_tickets',
      'view:assigned_tickets',
      'create:ticket',
      'update:own_ticket',
      'view:dashboard',
      'view:knowledge',
      'comment:ticket'
    ],
  };
  
  // Helper function to check if a user has a specific permission
  export const hasPermission = (role, permission) => {
    return rolePermissions[role]?.includes(permission) || false;
  };
  
  // Helper function to get all permissions for a role
  export const getRolePermissions = (role) => {
    return rolePermissions[role] || [];
  };
  
  // Helper function to get all available permissions
  export const getAllPermissions = () => {
    const allPermissions = new Set();
    
    Object.values(rolePermissions).forEach(permissions => {
      permissions.forEach(permission => allPermissions.add(permission));
    });
    
    return Array.from(allPermissions).sort();
  };
  