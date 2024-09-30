'use client';

import { cn } from '@/lib/utils';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { useMainContext } from '@/context/main-context';
import { Navbar } from './navbar';

export default function DashboardLayout({ children }) {
  const { isOpen } = useMainContext();

  return (
    <>
      <Sidebar />
      <nav
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !isOpen ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Navbar title={window.location.pathname} />
      </nav>
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
          !isOpen ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !isOpen ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
