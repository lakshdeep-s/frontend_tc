import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavigationSection from "@/components/landing/NavigationSection";
import Footer from "@/components/landing/FooterSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Llama Research Assistant | Dashboard",
  description: "llama research makes research easier",
};

const loggedInUser = {
  username: 'Lakshdeep',
  isLoggedIn: true
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased dark`}
      >
        <NavigationSection
          isLoggedIn={loggedInUser.isLoggedIn}
          username={loggedInUser.username}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
