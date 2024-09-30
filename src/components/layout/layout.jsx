import { useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { useMainContext } from '@/context/main-context';
import { Navbar } from './navbar';

export default function DashboardLayout({ children }) {
  const { isOpen } = useMainContext();
  let location = useLocation();

  return (
    <>
      <Sidebar />
      <nav
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !isOpen ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Navbar />
      </nav>
      <main
        className={cn(
          'min-h-screen transition-[margin-left] ease-in-out duration-300',
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
