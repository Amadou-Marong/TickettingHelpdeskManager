import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
// import AnimatedTransition from '@/components/common/AnimatedTransition';
// import KnowledgeArticleList from '@/components/knowledge/KnowledgeArticleList';
// import { mockKnowledgeArticles } from '@/utils/mockData';
import { useTheme } from 'next-themes';
import Button from '../components/ui/Button';
import { mockKnowledgeArticles } from '../data/mockData';
import AnimatedTransition from '../common/AnimatedTransition';
import { Input } from '../components/ui/input';
import KnowledgeArticleList from '../components/knowledge/KnowledgeArticleList';
import { categories } from '../components/knowledge/KnowledgeCategoriesList';

const KnowledgeCategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    // Log information for debugging
    console.log("Component rendered with categoryId:", categoryId);
    console.log("Available categories:", categories);
  }, [categoryId]);
  
  // Find the category from the list - ensure we're using case-insensitive comparison
  const category = categories.find(
    cat => cat.id.toLowerCase() === (categoryId || '').toLowerCase()
  );
  
  console.log("Found category:", category);
  
  if (!category) {
    return (
      <div className="p-6 md:p-8">
        <div className="max-w-3xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold mt-4">Category Not Found</h2>
          <p className="text-muted-foreground mt-2">The category you're looking for doesn't exist.</p>
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
  
  // Filter articles by category and search query
  const filteredArticles = mockKnowledgeArticles
    .filter(article => article.category.toLowerCase() === category.id.toLowerCase())
    .filter(article => 
      searchQuery.trim() === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  console.log("Filtered articles:", filteredArticles);

  return (
    <div className="p-6 md:p-8">
      <AnimatedTransition>
        <div className="space-y-6">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/knowledge')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Knowledge Base
            </Button>
            
            <div className="flex flex-col">
              <div className={`h-12 w-12 rounded-full ${category.color} flex items-center justify-center mb-4`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
              <p className="text-muted-foreground">
                {category.description}
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder={`Search in ${category.name}...`}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="text-sm text-muted-foreground mb-4">
            {filteredArticles.length} articles in this category
          </div>
          
          {filteredArticles.length > 0 ? (
            <KnowledgeArticleList articles={filteredArticles} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No articles found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default KnowledgeCategoryDetail;
