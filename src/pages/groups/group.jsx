// src/pages/group.jsx
import { useParams } from 'react-router-dom';
import { cardData } from '@/lib/data';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { BookUser, Dot, Settings2 } from 'lucide-react';
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
import { DataTable } from '@/components/ui/data-table';

const Group = () => {
  const { groupId } = useParams();

  const group = cardData.find((g) => g.id === parseInt(groupId));

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div>
      <div className="px-[2rem] bg-background space-y-2 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  className="md:text-sm"
                  variant={group.days === 'odd' ? 'odd' : 'even'}
                >
                  {group.time}
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs font-medium text-accent-foreground">
                  {group.days === 'odd' ? 'Du - Chor - Jum' : 'Se - Pay - Shan'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Badge
            variant={group.status ? 'active' : 'inactive'}
            className="md:text-sm"
          >
            {group.status ? 'Aktiv' : 'Tugatildi'}
          </Badge>
        </div>
        <div className="flex items-end gap-2">
          <h1 className="text-xl md:text-2xl font-semibold">{group.title}</h1>
          <span className="text-base text-muted-foreground">{group.code}</span>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-base text-muted-foreground">Guruh yaratildi: </p>
          <Badge className="md:text-sm" variant="secondary">
            {group.date}
          </Badge>
        </div>
        <div className="hidden flex items-center mb-4">
          <h2 className="text-lg font-semibold">Students: {group.students}</h2>
          <div className="flex items-center ml-2">
            {group.avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar.src}
                alt={avatar.alt}
                className="h-8 w-8 rounded-full border-2 border-white -ml-2"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center p-1 pr-3 rounded-md cursor-pointer hover:bg-accent w-fit">
          <img
            src={group.teacher.avatar}
            alt={group.teacher.name}
            className="h-10 w-10 rounded-full border-2 border-white"
          />
          <span className="ml-2 font-medium">{group.teacher.name}</span>
        </div>
        <div className="hidden flex items-center justify-between border-t pt-4">
          <div className="flex items-center">
            <img
              src={group.teacher.avatar}
              alt={group.teacher.name}
              className="h-10 w-10 rounded-full border-2 border-white"
            />
            <span className="ml-2 font-medium">{group.teacher.name}</span>
          </div>
          <small className="text-sm text-gray-500">{group.date}</small>
        </div>
      </div>

      <div className="container mx-auto space-y-2">
        <DataTable>
          <Button>O'quvchi qo'shish</Button>
        </DataTable>
      </div>
    </div>
  );
};

export default Group;
