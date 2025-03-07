import { User } from '@/types';
import React from 'react';
import Footer from '@/components/landing/FooterSection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileSearch, FileText, Lightbulb, Search } from "lucide-react";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardPageProps {
  // 
}

const DashboardPage = ({} : DashboardPageProps) => {
  const user: User = {
    username: "Lakshdeep Singh",
    email: "lakshdeep.code@gmail.com"
  };

  const getUserInitials = (username: string) => {
    return username
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className='h-full flex flex-col'>
      <div className="flex flex-col flex-1 px-6">
        <div className="container py-8">
          {/* Welcome Section */}
          <div className='mb-10'>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome, {user.username}</h1>
            <p className="text-muted-foreground">What would you like to do today? Get started with some actions below.</p>
          </div>

          {/* Action Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-6">Research Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <Lightbulb className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Idea Explorer</CardTitle>
                  <CardDescription>
                    Generate background research on any topic or idea
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Gather comprehensive background information about any project, idea, or topic using our AI-powered search feature.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard/idea-explorer">
                      Start Exploring
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <FileSearch className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Paper Analyzer</CardTitle>
                  <CardDescription>
                    Extract insights from academic papers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Upload research papers (PDF) and get AI-generated summaries, key findings, and critical analysis in minutes.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard/paper-analyzer">
                      Analyze Paper
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Research Compiler</CardTitle>
                  <CardDescription>
                    Create comprehensive research reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Conduct systematic research about a topic, gather relevant papers, and compile a professional PDF report with organized findings.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard/research-compiler">
                      Generate Report
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Recent Activity Section */}
          {/* <section className="mb-10">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <div className="bg-muted rounded-lg p-6">
              <div className="flex justify-center items-center h-32 text-center">
                <p className="text-muted-foreground">You haven't created any research projects yet. Get started with one of the tools above!</p>
              </div>
            </div>
          </section> */}

          {/* Quick Stats */}
          {/* <section className="mb-10">
            <h2 className="text-xl font-semibold mb-6">Your Research Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">Projects Created</p>
                    <p className="text-4xl font-bold">0</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">Papers Analyzed</p>
                    <p className="text-4xl font-bold">0</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">Topics Explored</p>
                    <p className="text-4xl font-bold">0</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">Reports Generated</p>
                    <p className="text-4xl font-bold">0</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;