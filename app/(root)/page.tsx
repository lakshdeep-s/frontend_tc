import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import ServiceSection from '@/components/landing/ServiceSection';
import Footer from '@/components/landing/FooterSection';
import NavigationSection from '@/components/landing/NavigationSection';

const loggedInUser = {
  username: 'Lakshdeep',
  isLoggedIn: true
}

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <NavigationSection isLoggedIn={loggedInUser.isLoggedIn} username={loggedInUser.username}/>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
          <div className="container flex flex-col items-center text-center gap-8 md:gap-12">
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Streamline Your Research Process with Llama
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Collect, organize, and create reports from your research data with ease.
                Let Llama Research Assistant transform your research workflow.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
              {/* <Button size="lg" variant="outline" asChild>
                <Link href="/demo">See Demo</Link>
              </Button> */}
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/20 via-background/60 to-background pointer-events-none" />
        </section>

        {/* Services Section */}
        <ServiceSection />

        {/* CTA Section */}
        <section className="w-full py-16 bg-primary text-primary-foreground">
          <div className="container flex flex-col items-center text-center gap-8">
            <h2 className="text-3xl font-bold tracking-tight">Ready to Transform Your Research Process?</h2>
            <p className="text-lg max-w-2xl">
              Join thousands of researchers who've simplified their workflow with Llama Research Assistant
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth">Get Researching</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;