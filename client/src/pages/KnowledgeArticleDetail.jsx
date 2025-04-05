import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  ThumbsUp, 
  Share2, 
  Printer, 
  Eye, 
  Clock, 
  FileText, 
  MessageSquare,
  Send,
  Tag
} from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import AnimatedTransition from '@/components/common/AnimatedTransition';
// import { mockKnowledgeArticles } from '@/utils/mockData';
import { format } from 'date-fns';
import { mockKnowledgeArticles } from '../data/mockData';
import Button from '../components/ui/Button';
import AnimatedTransition from '../common/AnimatedTransition';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Textarea } from '../components/ui/Textarea';

const KnowledgeArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  
  const article = mockKnowledgeArticles.find(article => article.id === id);
  
  if (!article) {
    return (
      <div className="p-6 md:p-8">
        <div className="max-w-3xl mx-auto text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
          <h2 className="text-2xl font-bold mt-4">Article Not Found</h2>
          <p className="text-muted-foreground mt-2">The article you're looking for doesn't exist or has been removed.</p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/knowledge')}
            className="mt-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Base
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Logic to submit comment would go here
    setNewComment('');
  };

  return (
    <div className="p-6 md:p-8">
      <AnimatedTransition>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/knowledge')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Knowledge Base
            </Button>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Badge className="mb-2">{article.category}</Badge>
                <h1 className="text-3xl font-bold">{article.title}</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Helpful
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
            
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <div className="flex items-center mr-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>Updated {format(new Date(article.updatedAt), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center mr-4">
                <Eye className="h-4 w-4 mr-1" />
                <span>{article.viewCount} views</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{article.helpfulCount} found helpful</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="prose max-w-none">
                <div className="article-content bg-white p-6 rounded-lg border border-gray-300 mb-8">
                  <div className="mb-6">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="flex items-center mr-2">
                      <Tag className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Tags:</span>
                    </div>
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Comments ({article.commentsCount})</h3>
                  </div>
                  
                  <Card className="mb-6 border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">John Doe</div>
                          <div className="text-xs text-muted-foreground">2 days ago</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">This article was very helpful. I was able to resolve my issue with these instructions.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="mb-6 border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Jane Smith</div>
                          <div className="text-xs text-muted-foreground">1 week ago</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Could you add more details on step 3? I'm having trouble with that specific part.</p>
                    </CardContent>
                  </Card>
                  
                  <form onSubmit={handleSubmitComment}>
                    <h4 className="font-medium mb-2">Add a Comment</h4>
                    <Textarea 
                      placeholder="Write your comment here..." 
                      className="mb-3"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button type="submit" disabled={!newComment.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block w-64">
              <div className="sticky top-6">
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-lg">Author</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={article.author.avatar} alt={article.author.name} />
                        <AvatarFallback>{article.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{article.author.name}</div>
                        <div className="text-xs text-muted-foreground">Support Specialist</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 text-sm">
                      {mockKnowledgeArticles.slice(0, 3).map(relatedArticle => (
                        <li key={relatedArticle.id}>
                          <a 
                            href={`/knowledge/${relatedArticle.id}`}
                            className="hover:text-primary transition-colors block"
                          >
                            {relatedArticle.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default KnowledgeArticleDetail;
