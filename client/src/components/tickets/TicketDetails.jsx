import { ArrowLeft, Calendar, CheckCircle, Clock, CornerUpRight, Edit, FileText, MessageSquare, MoreHorizontal, Paperclip, Send, ThumbsUp, User } from "lucide-react";
import AnimatedTransition from "../../common/AnimatedTransition";
import Button from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { format } from "date-fns";
import StatusBadge from "../ui/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Separator } from "../ui/Separator";

const TicketDetails = ({ ticket, comments, canResolve = false }) => {
  const navigate = useNavigate();

  return (
    <AnimatedTransition>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/tickets")}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">
            Ticket #{ticket.id.substring(0, 8)}
          </h2>
          <div className="ml-auto flex space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>

            {/* {canResolve && ( */}
            <Button
              variant="default"
              size="sm"
              // onClick={() => setIsResolvingTicket(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Resolve
            </Button>
            {/* )} */}

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
                      Reported by {ticket.createdBy.name} •{" "}
                      {format(new Date(ticket.createdAt), "PPP")}
                    </CardDescription>
                  </div>
                  <StatusBadge status={ticket.status} className="ml-auto" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{ticket.description}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-wrap gap-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Created: {format(new Date(ticket.createdAt), "PP")}
                  </span>
                </div>
                <div className="flex items-center ml-4">
                  <Clock className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Updated: {format(new Date(ticket.updatedAt), "PP")}
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
                    <Separator />
                    {/* <form onSubmit={handleSubmitComment}> */}
                      <div className="space-y-4">
                        {/* <Textarea
                          placeholder="Add a comment..."
                        //   value={newComment}
                        //   onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[100px] input-field"
                        /> */}
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div className="flex items-center">
                            {canResolve && (
                              <div className="flex items-center mr-4">
                                <input
                                  type="checkbox"
                                  id="private-comment"
                                //   checked={isPrivateComment}
                                //   onChange={() => setIsPrivateComment(!isPrivateComment)}
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
                          {/* <Button type="submit" disabled={!newComment.trim()}> */}
                          <Button type="submit">
                            <Send className="h-4 w-4 mr-2" />
                            {/* {isPrivateComment ? 'Add Note' : 'Send'} */}
                          </Button>
                        </div>
                      </div>
                    {/* </form> */}
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
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default TicketDetails;
