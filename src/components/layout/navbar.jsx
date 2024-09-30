import { UserNav } from '@/components/layout/user-nav';
import { SheetMenu } from '@/components/layout/sheet-menu';
import { ThemeToggle } from '../theme-toggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <UserNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
