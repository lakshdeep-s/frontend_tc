'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Plus, X } from 'lucide-react';

interface IdeaExplorerProps {}

const IdeaExplorer = ({}: IdeaExplorerProps) => {
  const [topic, setTopic] = useState('');
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const addKeyword = () => {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
      setKeywords([...keywords, keyword.trim()]);
      setKeyword('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((k) => k !== keywordToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keyword.trim()) {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Please provide a research topic');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/api/explorer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          keywords,
          additionalInfo
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Error fetching results. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Idea Explorer</CardTitle>
            <CardDescription>
              Gather research information about any topic to fuel your creative process
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Topic Input */}
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-sm font-medium">
                    Research Topic
                  </Label>
                  <Input
                    id="topic"
                    placeholder="Enter your research topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                {/* Keywords Input */}
                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-sm font-medium">
                    Keywords
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="keywords"
                      placeholder="Add relevant keywords"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-grow"
                    />
                    <Button 
                      type="button" 
                      onClick={addKeyword} 
                      variant="outline"
                      size="icon"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {keywords.map((kw) => (
                        <Badge key={kw} className="pl-2 pr-1 py-1 flex items-center gap-1">
                          {kw}
                          <button 
                            type="button" 
                            onClick={() => removeKeyword(kw)}
                            className="ml-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Additional Info */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-sm font-medium">
                    Additional Information
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Add any other relevant information that might help with your research"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="min-h-32"
                  />
                </div>
                
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
              </div>
              
              <Button
                type="submit"
                className="mt-6 w-full flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Researching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Start Research
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          
          {results && (
            <CardFooter className="flex flex-col">
              <div className="w-full border-t pt-4">
                <h3 className="font-semibold text-lg mb-2">Research Results</h3>
                <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default IdeaExplorer;