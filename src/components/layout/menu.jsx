import { useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import {
  LogOut,
  Settings,
  Ellipsis,
  SunMoon,
  Sun,
  Moon,
  Monitor,
  UserCircle2,
  ShieldCheck,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { getMenuList } from '@/lib/menu-list';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CollapseMenuButton } from '@/components/layout/collapse-menu-button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import { useTheme } from '@/provider/ThemeProvider';
import { auth } from '@/api/firebase';
import { useEffect, useState } from 'react';
import LogoutAlert from '../dialogs/logout';

export function Menu({ isOpen }) {
  const [openAlert, setOpenAlert] = useState(false);

  const { setTheme } = useTheme();
  let location = useLocation();
  const menuList = getMenuList(location.pathname);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'd') {
        event.preventDefault();
        setTheme('dark');
      }
      if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        setTheme('light');
      }
      if (event.ctrlKey && event.key === 'g') {
        event.preventDefault();
        setTheme('system');
      }
      if (event.ctrlKey && event.key === 'q') {
        event.preventDefault();
        setOpenAlert(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <LogoutAlert
        open={openAlert}
        setOpen={setOpenAlert}
        handleQuit={handleLogout}
      />
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col  h-[calc(100vh-180px)] overflow-x-hidden max-h-[calc(100vh-120px)] overflow-y-auto items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground text-left px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              className={`w-full justify-start h-10 mb-1 ${
                                active
                                  ? 'bg-blue-600 text-white hover:opacity-90 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue0600'
                                  : 'bg-white hover:bg-accent text-primary dark:bg-transparent dark:hover:bg-accent'
                              }`}
                              asChild
                            >
                              <Link to={href}>
                                <span
                                  className={cn(isOpen === false ? '' : 'mr-2')}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    'max-w-[200px] truncate',
                                    isOpen === false
                                      ? '-translate-x-96 opacity-0'
                                      : 'translate-x-0 opacity-100'
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
        </ul>
        <div className="w-full grow flex items-end">
          <TooltipProvider disableHoverableContent>
            <DropdownMenu>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      onClick={() => {}}
                      variant="outline"
                      className="w-full h-10 mt-5 mx-2 justify-start pl-4"
                    >
                      <span className={cn(isOpen === false ? '' : 'mr-2')}>
                        <ShieldCheck size={18} />
                      </span>
                      <p
                        className={cn(
                          'whitespace-nowrap',
                          isOpen === false ? 'opacity-0 hidden' : 'opacity-100'
                        )}
                      >
                        Administratsiya
                      </p>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sozlamalar</TooltipContent>
                )}
              </Tooltip>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {/* <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Sozlamalar</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <SunMoon className="mr-2 h-4 w-4" />
                      <span>Mavzu</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-40">
                        <DropdownMenuItem onClick={() => setTheme('light')}>
                          <Sun className="mr-2 h-4 w-4" />
                          <span>Kunduzgi</span>
                          <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('dark')}>
                          <Moon className="mr-2 h-4 w-4" />
                          <span>Tungi</span>
                          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('system')}>
                          <Monitor className="mr-2 h-4 w-4" />
                          <span>Sistema</span>
                          <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Chiqish</span>
                  <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        </div>
      </nav>
    </ScrollArea>
  );
}
