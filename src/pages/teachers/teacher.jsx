import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { Dot, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import TeacherHeader from '@/components/teachers/teacher-header';
import { teachers } from '@/lib/fake-data/teachers';
import cardData from '@/lib/data';
import BreadcrumbComponent from '@/components/breadcrumb';

const Teacher = () => {
  const [openAddGroupDialog, setOpenAddGroupDialog] = useState(false);
  const { teacherId } = useParams();

  const teacher = teachers.find((t) => t.id === parseInt(teacherId));

  if (!teacher) {
    return (
      <div className="px-4 lg:px-8 mx-auto py-4">
        <h2 className="text-2xl font-bold tracking-tight">404 error</h2>
        <p className="text-muted-foreground">
          Siz qidirayotgan guruh topilmadi!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 lg:px-8 mt-4">
        <BreadcrumbComponent
          title="O'qituvchilar ro'yxati"
          titleLink="/teachers"
          subtitle="John Doe"
        />
        <TeacherHeader teacher={teacher} />
      </div>

      <div className="px-4 lg:px-8 mx-auto flex items-center justify-between py-4">
        <Input className="max-w-sm" placeholder="Guruhlarni qidirish" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              Filtrlash
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem className="capitalize" checked={true}>
              nimadir
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-4 lg:px-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((card) => (
          <Link key={card.id} to={`/groups/${card.id}`}>
            <Card key={card.id} className="cursor-pointer hover:shadow">
              <div className="p-4 pb-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant={card.days === 'odd' ? 'odd' : 'even'}>
                            {card.time}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-xs font-medium text-accent-foreground">
                            {card.days === 'odd'
                              ? 'Du - Chor - Jum'
                              : 'Se - Pay - Shan'}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Badge variant={card.status ? 'active' : 'inactive'}>
                      {card.status ? 'Aktiv' : 'Tugatildi'}
                    </Badge>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg lg:text-xl font-semibold">
                      {card.title}
                    </h2>
                    <span className="text-base text-muted-foreground">
                      {card.code}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <div className="flex items-center -space-x-3">
                      {card.avatars.map((avatar, index) => (
                        <Avatar key={index} className="h-6 w-6 shadow border">
                          <AvatarImage src={avatar.src} alt={avatar.alt} />
                          <AvatarFallback>{avatar.fallback}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Badge
                      className="text-sm px-2 font-medium"
                      variant="secondary"
                    >
                      Talabalar: {card.students}ta
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 px-4 mt-4 border-t border-border">
                <div className="flex items-center gap-2 w-52">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={card.teacher.avatar}
                      alt={card.teacher.name}
                    />
                    <AvatarFallback>{card.teacher.fallback}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium truncate">
                    {card.teacher.name}
                  </span>
                </div>
                <small className="text-sm px-2 font-medium text-muted-foreground">
                  {card.date}
                </small>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Teacher;
