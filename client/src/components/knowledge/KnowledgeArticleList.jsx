
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, MessageSquare, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';

const KnowledgeArticleList = ({ articles }) => {
  const navigate = useNavigate();

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
        <h3 className="mt-4 text-lg font-medium">No articles found</h3>
        <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <Card 
          key={article.id} 
          className="cursor-pointer hover:shadow-md transition-shadow border"
          onClick={() => navigate(`/knowledge/${article.id}`)}
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <Badge className="mb-2">{article.category}</Badge>
              <span className="text-xs text-muted-foreground">
                {format(new Date(article.updatedAt), 'MMM d, yyyy')}
              </span>
            </div>
            <CardTitle className="text-lg">{article.title}</CardTitle>
            <CardDescription>
              {article.content.substring(0, 100)}...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{article.author.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{article.helpfulCount}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{article.commentsCount}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default KnowledgeArticleList;
