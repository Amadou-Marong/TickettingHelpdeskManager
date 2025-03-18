import React, { useState } from 'react'
import { toast } from '../ui/UseToast';
import { useNavigate } from 'react-router-dom';
import AnimatedTransition from '../../common/AnimatedTransition';
import { ArrowLeft, Calendar, CheckCircle, Clock, CornerUpRight, Edit, FileText, Lock, MessageSquare, MoreHorizontal, Paperclip, Send, ThumbsUp, User, XCircle } from 'lucide-react';
import Button from '../ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/DropdownMenu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { format } from 'date-fns';
import StatusBadge from '../ui/StatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { Separator } from '../ui/Separator';
import { Textarea } from '../ui/Textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/Dialog'
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import Label from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import PriorityBadge from '../ui/PriorityBadge'

const TicketDetails = ({ ticket, comments, canResolve = false }) => {

  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [isResolvingTicket, setIsResolvingTicket] = useState(false);
  const [resolution, setResolution] = useState({
    type: 'resolved',
    reason: '',
    solution: '',
    followUp: false
  });
  const [isPrivateComment, setIsPrivateComment] = useState(false);
  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Submit comment logic would go here
    toast.success(isPrivateComment 
      ? "Internal note added successfully" 
      : "Comment added successfully");
    setNewComment('');
    setIsPrivateComment(false);
  };
  
  const handleResolveTicket = () => {
    // Resolve ticket logic would go here
    // toast.success(`Ticket ${resolution.type === 'resolved' ? 'resolved' : 'closed'} successfully`);
    toast({
      title: `${resolution.type === 'resolved' ? 'resolved' : 'closed'}`,
      description: `Ticket ${resolution.type === 'resolved' ? 'resolved' : 'closed'} successfully`
    })
    setIsResolvingTicket(false);
    
    // In a real app, we would update the ticket status here
    // and potentially redirect to the tickets list
    setTimeout(() => {
      navigate('/tickets');
    }, 1500);
  };

  return (
    <AnimatedTransition>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/tickets')}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Ticket #{ticket.id.substring(0, 8)}</h2>
          <div className="ml-auto flex space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            
            {canResolve && (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => setIsResolvingTicket(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Resolve
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Assign to me</DropdownMenuItem>
                <DropdownMenuItem>Change priority</DropdownMenuItem>
                <DropdownMenuItem>Change status</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Close ticket
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <Card className="glass-panel border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{ticket.title}</CardTitle>
                    <CardDescription className="mt-1.5">
                      Reported by {ticket.createdBy.name} • {format(new Date(ticket.createdAt), 'PPP')}
                    </CardDescription>
                  </div>
                  <StatusBadge status={ticket.status} className="ml-auto" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {ticket.description}
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-wrap gap-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Created: {format(new Date(ticket.createdAt), 'PP')}
                  </span>
                </div>
                <div className="flex items-center ml-4">
                  <Clock className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Updated: {format(new Date(ticket.updatedAt), 'PP')}
                  </span>
                </div>
              </CardFooter>
            </Card>

            <Tabs defaultValue="comments">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="comments">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comments ({comments.length})
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <Clock className="h-4 w-4 mr-2" />
                  Activity Log
                </TabsTrigger>
                <TabsTrigger value="attachments">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attachments
                </TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className="pt-6">
                <Card className="glass-panel border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Comments</CardTitle>
                    <CardDescription>
                      Communication history for this ticket
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3 pb-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                            <AvatarFallback>
                              {comment.user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{comment.user.name}</span>
                                <span className="text-xs text-muted-foreground">{comment.user.role}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(comment.createdAt), 'PPp')}
                              </span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                            
                            {canResolve && (
                              <div className="flex items-center space-x-3 pt-1">
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  Helpful
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  <CornerUpRight className="h-3 w-3 mr-1" />
                                  Quote
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No comments yet.</p>
                      </div>
                    )}
                    <Separator className="my-4" />
                    <form onSubmit={handleSubmitComment}>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[100px] input-field"
                        />
            
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div className="flex items-center">
                            {canResolve && (
                              <div className="flex items-center mr-4">
                                <input
                                  type="checkbox"
                                  id="private-comment"
                                  checked={isPrivateComment}
                                  onChange={() => setIsPrivateComment(!isPrivateComment)}
                                  className="mr-2"
                                />
                                <label htmlFor="private-comment" className="text-sm flex items-center">
                                  <Lock className="h-3 w-3 mr-1" />
                                  Internal note
                                </label>
                              </div>
                            )}
                            <Button variant="outline" type="button" size="sm">
                              <Paperclip className="h-4 w-4 mr-2" />
                              Attach Files
                            </Button>
                          </div>
                          <Button type="submit" disabled={!newComment.trim()}>
                            <Send className="h-4 w-4 mr-2" />
                            {isPrivateComment ? 'Add Note' : 'Send'}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="activity" className="pt-6">
                <Card className="glass-panel border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Activity Log</CardTitle>
                    <CardDescription>
                      History of actions taken on this ticket
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex space-x-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm">
                              <span className="font-medium">John Doe</span>
                              <span className="text-muted-foreground"> changed status to </span>
                              <span className="font-medium">In Progress</span>
                            </p>
                            <span className="text-xs text-muted-foreground">1 hour ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                          <CornerUpRight className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm">
                              <span className="font-medium">Jane Smith</span>
                              <span className="text-muted-foreground"> escalated this ticket to </span>
                              <span className="font-medium">Support Level 2</span>
                            </p>
                            <span className="text-xs text-muted-foreground">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm">
                              <span className="font-medium">Alex Johnson</span>
                              <span className="text-muted-foreground"> added a comment</span>
                            </p>
                            <span className="text-xs text-muted-foreground">3 hours ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm">
                              <span className="font-medium">System</span>
                              <span className="text-muted-foreground"> created this ticket</span>
                            </p>
                            <span className="text-xs text-muted-foreground">5 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="attachments" className="pt-6">
                <Card className="glass-panel border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Attachments</CardTitle>
                    <CardDescription>
                      Files shared in this ticket
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
                      <p className="text-muted-foreground mt-2">No attachments yet</p>
                      <Button variant="outline" className="mt-4">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="col-span-1 space-y-6">
            <Card className="glass-panel border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Status</p>
                    <StatusBadge status={ticket.status} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Priority</p>
                    <PriorityBadge priority={ticket.priority} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Category</p>
                    <span className="text-sm">{ticket.category}</span>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-1">Assigned To</p>
                    {ticket.assignedTo ? (
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ticket.assignedTo.avatar} alt={ticket.assignedTo.name} />
                          <AvatarFallback>
                            {ticket.assignedTo.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{ticket.assignedTo.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Created By</p>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={ticket.createdBy.avatar} alt={ticket.createdBy.name} />
                        <AvatarFallback>
                          {ticket.createdBy.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{ticket.createdBy.name}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="w-full space-y-2">
                  <Button className="w-full" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </Button>
                  <Button className="w-full">
                    <CornerUpRight className="h-4 w-4 mr-2" />
                    Escalate Ticket
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="glass-panel border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">SLA Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">First Response Due</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(ticket.createdAt.getTime() + 4 * 60 * 60 * 1000), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Resolution Due</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(ticket.createdAt.getTime() + 24 * 60 * 60 * 1000), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">SLA Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Within SLA
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Related Tickets</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <a href="#" className="hover:text-primary transition-colors">
                      #TK-2453: Network connectivity issue
                    </a>
                    <StatusBadge status="resolved" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <a href="#" className="hover:text-primary transition-colors">
                      #TK-1897: Software installation request
                    </a>
                    <StatusBadge status="closed" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <a href="#" className="hover:text-primary transition-colors">
                      #TK-3102: Access permission issue
                    </a>
                    <StatusBadge status="in-progress" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Ticket Resolution Dialog */}
      <Dialog open={isResolvingTicket} onOpenChange={setIsResolvingTicket}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Resolve Ticket #{ticket.id.substring(0, 8)}</DialogTitle>
              <DialogDescription>
                Complete the resolution process for this support ticket.
              </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
            <div className="space-y-2">
                <Label>Resolution Type</Label>
                <RadioGroup 
                  defaultValue="resolved" 
                  value={resolution.type}
                  onValueChange={(value) => setResolution({...resolution, type: value})}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="resolved" id="resolved" />
                    <Label htmlFor="resolved" className="flex items-center cursor-pointer">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Resolved - Issue has been fixed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="closed" id="closed" />
                    <Label htmlFor="closed" className="flex items-center cursor-pointer">
                      <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      Closed - Cannot be resolved or duplicate
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="solution">Resolution Details</Label>
                <Textarea 
                  id="solution"
                  placeholder="Describe how the issue was resolved..."
                  value={resolution.solution}
                  onChange={(e) => setResolution({...resolution, solution: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>
              {resolution.type === 'closed' && (
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Closing</Label>
                  <Select 
                    value={resolution.reason} 
                    onValueChange={(value) => setResolution({...resolution, reason: value})}
                  >
                    <SelectTrigger id="reason">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duplicate">Duplicate ticket</SelectItem>
                      <SelectItem value="irrelevant">Not relevant/Not an issue</SelectItem>
                      <SelectItem value="incomplete">Incomplete information</SelectItem>
                      <SelectItem value="user-fixed">Resolved by user</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="follow-up"
                  checked={resolution.followUp}
                  onChange={() => setResolution({...resolution, followUp: !resolution.followUp})}
                  className="mr-2"
                />
                <Label htmlFor="follow-up" className="cursor-pointer">
                  Schedule follow-up for this ticket
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResolvingTicket(false)}>
              Cancel
            </Button>
            <Button onClick={handleResolveTicket} disabled={!resolution.solution}>
              {resolution.type === 'resolved' ? 'Resolve Ticket' : 'Close Ticket'}
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
      
    </AnimatedTransition>
  )
}

export default TicketDetails