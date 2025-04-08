import React, { useState } from 'react';
// import { mockUsers, User, getAllPermissions, getRolePermissions } from '@/utils/authMockData';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Checkbox } from '@/components/ui/checkbox';
// import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from '@/hooks/use-toast';
import { Search, UserPlus, Trash2, Edit, Key, Shield, AlertTriangle } from 'lucide-react';
import { getAllPermissions, getRolePermissions, mockUsers } from '../data/authMockData';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import AnimatedTransition from '../common/AnimatedTransition';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/Dialog';
// import AnimatedTransition from '@/components/common/AnimatedTransition';
// import UserForm from '@/components/users/UserForm';

const UserManagement = () => {
  const { hasPermission } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    
    toast({
      title: "Role updated",
      description: `User role has been updated to ${newRole}`,
    });
  };

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    
    setUsers(users.filter(user => user.id !== userToDelete.id));
    
    toast({
      title: "User deleted",
      description: "User has been removed from the system",
    });
    
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const openPermissionsDialog = (user) => {
    setSelectedUser(user);
    // Get the permissions for this user's role
    setSelectedPermissions(getRolePermissions(user.role));
    setPermissionsDialogOpen(true);
  };

  const handlePermissionChange = (permission, checked) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permission]);
    } else {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    }
  };

  const savePermissions = () => {
    // In a real application, you would save these permissions to a database
    // For our mock system, we'll just show a toast
    toast({
      title: "Permissions updated",
      description: `Permissions updated for ${selectedUser?.name}`,
    });
    setPermissionsDialogOpen(false);
  };

  const handleAddUser = (data) => {
    const newUser = {
      id: `user-${users.length + 1}`,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    setUsers([...users, newUser]);
    setNewUserDialogOpen(false);
    
    toast({
      title: "User created",
      description: `${newUser.name} has been added as a ${newUser.role}`,
    });
  };

  if (!hasPermission('manage:users')) {
    return (
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold">Unauthorized</h2>
        <p className="text-muted-foreground">
          You don't have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <AnimatedTransition>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
            <p className="text-muted-foreground">
              Manage users and their permissions
            </p>
          </div>
          <Button 
            className="w-full sm:w-auto"
            onClick={() => setNewUserDialogOpen(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users by name, email or role..."
            className="pl-8 w-full max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={user.role}
                        onValueChange={(value) => 
                          handleRoleChange(user.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="employee">Employee</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openPermissionsDialog(user)}
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => confirmDeleteUser(user)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table> */}
        </div>

        {/* User Permissions Dialog */}
        <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                User Permissions
              </DialogTitle>
              <DialogDescription>
                {selectedUser?.name} - {selectedUser?.role}
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-auto py-4">
              <div className="space-y-4">
                {getAllPermissions().map((permission) => (
                  <div className="flex items-start space-x-2" key={permission}>
                    <Checkbox 
                      id={`permission-${permission}`}
                      checked={selectedPermissions.includes(permission)}
                      onCheckedChange={(checked) => 
                        handlePermissionChange(permission, checked === true)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={`permission-${permission}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission}
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {getPermissionDescription(permission)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPermissionsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={savePermissions}>
                Save Permissions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New User Dialog */}
        <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <UserPlus className="h-5 w-5 mr-2" />
                Add New User
              </DialogTitle>
              <DialogDescription>
                Create a new user account with appropriate role and permissions.
              </DialogDescription>
            </DialogHeader>
            {/* <UserForm onSubmit={handleAddUser} /> */}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        {/* <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center text-destructive">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Confirm Deletion
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </div>
    </AnimatedTransition>
  );
};

// Helper function to provide descriptions for permissions
function getPermissionDescription(permission) {
  const descriptions = {
    'view:all_tickets': 'Can view all tickets in the system',
    'create:ticket': 'Can create new tickets',
    'update:any_ticket': 'Can update any ticket',
    'delete:any_ticket': 'Can delete any ticket', 
    'assign:ticket': 'Can assign tickets to others',
    'manage:users': 'Can manage users and permissions',
    'view:dashboard': 'Can view dashboard',
    'view:reports': 'Can view reports',
    'create:knowledge': 'Can create knowledge base articles',
    'edit:knowledge': 'Can edit knowledge base articles',
    'delete:knowledge': 'Can delete knowledge base articles',
    'manage:settings': 'Can manage system settings',
    'view:audit_logs': 'Can view system audit logs',
    'export:data': 'Can export system data',
    'import:data': 'Can import data into the system',
    'manage:automations': 'Can manage workflow automations',
    'view:own_tickets': 'Can view their own tickets',
    'view:assigned_tickets': 'Can view tickets assigned to them',
    'update:own_ticket': 'Can update their own tickets',
    'update:team_ticket': 'Can update tickets for their team',
    'view:user_activity': 'Can view user activity',
    'export:tickets': 'Can export tickets data',
    'comment:ticket': 'Can comment on tickets'
  };
  
  return descriptions[permission] || 'No description available';
}

export default UserManagement;
