import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, FileText, FolderOpen, Library, Brain } from "lucide-react";

const ServiceSection = () => {
  return (
    <section id="features" className="w-full py-16 bg-muted/50 px-6">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Powerful Research Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how Llama Research Assistant can transform your research workflow
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <Card>
            <CardHeader>
              <Search className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Advanced Data Collection</CardTitle>
              <CardDescription>
                Gather information from various sources in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Llama intelligently collects and organizes research data from multiple sources, saving you hours of manual work.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <FolderOpen className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Smart Organization</CardTitle>
              <CardDescription>
                Categorize and structure your research data effortlessly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our AI-powered tools help you organize information logically, making it easy to find what you need when you need it.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <FileText className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Automated Documentation</CardTitle>
              <CardDescription>
                Create professional reports with minimal effort
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Generate comprehensive reports and documentation from your research data with just a few clicks.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Library className="h-6 w-6 text-primary mb-2" />
              <CardTitle>AI-Powered Research Library</CardTitle>
              <CardDescription>
                Build an intelligent knowledge repository
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Maintain a searchable database of your research with AI analysis that identifies patterns and uncovers hidden connections in your data.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ServiceSection;