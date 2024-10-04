import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/layout/menu';
import { SidebarToggle } from '@/components/layout/sidebar-toggle';
import { useMainContext } from '@/context/main-context';
import { Link } from 'react-router-dom';

export function Sidebar() {
  const { isOpen, setIsOpen } = useMainContext();

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 border-r -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        isOpen === false ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative h-screen flex flex-col px-3 py-4 overflow-y-auto  dark:shadow-zinc-800">
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            isOpen === false ? 'translate-x-1' : 'translate-x-0'
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <h1
              className={cn(
                'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
                isOpen === false
                  ? '-translate-x-96 opacity-0 hidden'
                  : 'translate-x-0 opacity-100'
              )}
            >
              CRM Logo
            </h1>
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
