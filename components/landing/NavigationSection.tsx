// NavigationSection.jsx
import { SiOllama } from 'react-icons/si'; // Assuming you're using react-icons for SiOllama
import Link from 'next/link'; // If using Next.js, otherwise use your preferred Link component
import { Button } from '@/components/ui/button'; // Adjust path based on your project structure

interface NavigationProps {
  isLoggedIn: boolean
  username: string
}

const NavigationSection = ({ username, isLoggedIn }: NavigationProps) => {
  return (
    <header className="px-4 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="border bg-blue-500 border-white rounded-md p-2">
            <SiOllama className="h-6 w-6 text-primary" />
          </span>
          <span className="text-xl font-bold tracking-tight">Llama Research</span>
        </div>

        <div className='flex gap-5 item-center justify-between'>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            {/* <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link> */}
            {
              isLoggedIn ? 
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link> : 
              ''
            }
          </nav>

          <div className="flex items-center gap-4">
            {/* <Button size="sm" asChild>
              <Link href="/auth">Login</Link>
            </Button> */}
            {
              isLoggedIn ? 
                <span className='bg-blue-500 w-6 h-6 rounded-md p-4 border-2 border-white flex items-center justify-center text-lg'>
                  {
                    username.charAt(0)
                  }
                </span>
              :
                <Button size="sm" asChild>
                  <Link href="/auth">Login</Link>
                </Button>

            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationSection;