import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Database, MessagesSquare, FileText, ClipboardCheck, BarChart3, BookOpen, Rocket } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lead Gen Operator System",
  description: "Decision assistant and learning engine for lead generation operators.",
};

const navItems = [
  { href: "/execute", label: "Daily System", icon: Rocket },
  { href: "/", label: "Dashboard", icon: Database },
  { href: "/assistant", label: "Deal Assistant", icon: MessagesSquare },
  { href: "/scripts", label: "Conversation OS", icon: FileText },
  { href: "/qualify", label: "Qualification", icon: ClipboardCheck },
  { href: "/feedback", label: "Feedback Log", icon: BarChart3 },
  { href: "/playbook", label: "Playbook", icon: BookOpen },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <div className="flex min-h-screen w-full flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4">
              <div className="flex items-center gap-2 font-semibold">
                <span className="text-lg">⚙️</span>
                <span className="hidden sm:inline-block">Lead Gen Operator</span>
              </div>
            </div>
          </header>

          <div className="flex flex-1">
            {/* Sidebar (Desktop) */}
            <aside className="hidden w-60 shrink-0 border-r md:block">
              <nav className="flex flex-col gap-1 p-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 flex-col bg-muted/20 p-4 md:p-8 pb-20 md:pb-8">
              {children}
            </main>
          </div>
          
          {/* Mobile Bottom Nav */}
          <nav className="md:hidden fixed bottom-0 w-full border-t bg-background flex justify-around p-2 z-40">
             {navItems.slice(0, 5).map((item) => (
               <Link key={item.href} href={item.href} className="flex flex-col items-center text-xs text-muted-foreground hover:text-foreground">
                 <item.icon className="h-5 w-5 mb-1" />
                 {item.label.split(" ")[0]}
               </Link>
             ))}
          </nav>
        </div>
      </body>
    </html>
  );
}