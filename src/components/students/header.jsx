import React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Calendar,
  Copy,
  IdCard,
  KeyRound,
  MapPin,
  Phone,
  Send,
  User,
  Users,
} from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

function StudentHeader({ student }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const username = student?.email?.replace(/@student\.uz$/, '');
  return (
    <div className="space-y-2 pb-4 w-full border-b border-border">
      <div className="flex items-center gap-2">
        <h1 className="text-xl md:text-2xl font-semibold">
          {student.fullName}
        </h1>
        <Badge variant={student.isPaid ? 'active' : 'inactive'}>
          {student.isPaid ? "To'lov qilgan" : "To'lov qilmagan"}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:gap-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <p className="text-xs md:text-sm">{student.address}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${formatPhoneNumber(student.phoneNumber)}`}
                  className="text-xs md:text-sm hover:underline"
                >
                  {student.phoneNumber}
                </a>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <small className="text-xs">Shaxsiy telefon raqami</small>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <a
                  href={`tel:${student.parentPhoneNumber}`}
                  className="text-xs md:text-sm hover:underline"
                >
                  {student.parentPhoneNumber}
                </a>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <small className="text-xs">Ota-onasini telefon raqami</small>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {student?.telegram && (
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            <a
              href={`https://t.me//${student?.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:underline"
            >
              {student?.telegram}
            </a>
          </div>
        )}
        <div className="flex items-center gap-2">
          <IdCard className="h-4 w-4" />
          <p className="text-xs md:text-sm uppercase">{student.passportId}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <p className="text-xs md:text-sm">{student.bornDate}</p>
        </div>
        {!student.isStudentUpdate && (
          <div className="h-full w-[1px] bg-border">‎</div>
        )}
        {!student.isStudentUpdate && (
          <div
            onClick={() => navigator.clipboard.writeText(username)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <User className="h-4 w-4 group-hover:hidden" />
            <Copy className="h-4 w-4 hidden group-hover:block" />
            <p className="text-xs md:text-sm">@{username}</p>
          </div>
        )}

        {!student.isStudentUpdate && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() =>
                    navigator.clipboard.writeText(student.password)
                  }
                  onDoubleClick={() => setShowPassword((prev) => !prev)}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <KeyRound className="h-4 w-4 group-hover:hidden" />
                  <Copy className="h-4 w-4 hidden group-hover:block" />
                  {showPassword ? (
                    <p className="text-xs md:text-sm">{student.password}</p>
                  ) : (
                    <p className="text-xs md:text-sm">********</p>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                {showPassword ? (
                  <small className="text-xs">
                    {' '}
                    Parolni berkitish uchun <br /> ikki marta bosing!
                  </small>
                ) : (
                  <small className="text-xs leading-3">
                    Parolni ko'rish uchun <br /> ikki marta bosing!
                  </small>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}

export default StudentHeader;
