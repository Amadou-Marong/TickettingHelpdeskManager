
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/input';
import { BookOpen, FileText, FolderOpen, ListFilter, Plus, Search, Tag } from 'lucide-react';
import AnimatedTransition from '../common/AnimatedTransition';
// import KnowledgeArticleList from '../components/knowledge/KnowledgeArticleList';
// import KnowledgeCategoriesList from '../components/knowledge/KnowledgeCategoriesList';
import { mockKnowledgeArticles } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import KnowledgeArticleList from '../components/knowledge/KnowledgeArticleList';
import KnowledgeCategoriesList from '../components/knowledge/KnoledgeCategoriesList';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('articles');
  
  const filteredArticles = searchQuery.trim() 
    ? mockKnowledgeArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : mockKnowledgeArticles;

  return (
    <div className="p-6 md:p-8">
      <AnimatedTransition>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Knowledge Base</h2>
              <p className="text-muted-foreground">
                Find solutions, guides, and answers to common questions
              </p>
            </div>
            <Button onClick={() => window.location.href = '/create-article'} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search for articles, guides, or keywords..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="articles" value={activeTab} onValueChange={setActiveTab} className='w-full'>
            <TabsList className="w-full grid md:grid-cols-3 gap-4">
              <TabsTrigger value="articles" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center">
                <FolderOpen className="h-4 w-4 mr-2" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Popular
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center justify-between my-4">
              <div className="text-sm text-muted-foreground">
                {searchQuery ? `${filteredArticles.length} results found` : 
                  activeTab === 'articles' ? `${mockKnowledgeArticles.length} articles` : 
                  activeTab === 'categories' ? '8 categories' : 
                  '10 popular articles'}
              </div>
              <Button variant="outline" size="sm" className="flex items-center">
                <ListFilter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <TabsContent value="articles" className="min-h-[300px]">
              <KnowledgeArticleList articles={filteredArticles} />
            </TabsContent>
            
            <TabsContent value="categories" className="min-h-[300px]">
              <KnowledgeCategoriesList />
            </TabsContent>
            
            <TabsContent value="popular" className="min-h-[300px]">
              <KnowledgeArticleList articles={filteredArticles.slice(0, 5)} />
            </TabsContent>
          </Tabs>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default KnowledgeBase;
