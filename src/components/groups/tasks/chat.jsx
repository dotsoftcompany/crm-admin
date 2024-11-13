import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '@/api/firebase';
import { useMainContext } from '@/context/main-context';
import { Loader, Send } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';

function TaskChat({ task, groupStudents, groupId, taskId, messages }) {
  const { uid, courses, groups, teachers } = useMainContext();
  const group = groups.find((g) => g.id === groupId);

  const teacher = teachers.filter((item) => item.id === group.teacherId)[0]
    ?.fullName;

  const {
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const message = watch('message');

  const saveChatMessage = async (messageData) => {
    try {
      const chatRef = collection(
        db,
        `users/${uid}/groups/${groupId}/tasks/${taskId}/chat`
      );

      await addDoc(chatRef, {
        ...messageData,
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  };

  const getInitials = (fullName) => {
    if (fullName) {
      const nameParts = fullName?.split(' ');

      if (nameParts?.length === 1) {
        return nameParts[0].slice(0, 2).toUpperCase();
      } else {
        return nameParts[0][0]?.toUpperCase() + nameParts[1][0]?.toUpperCase();
      }
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDateWithWeek = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp);
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
        date
      );

      const day = date.getDate();
      let suffix = 'th';
      if (day % 10 === 1 && day !== 11) suffix = 'st';
      if (day % 10 === 2 && day !== 12) suffix = 'nd';
      if (day % 10 === 3 && day !== 13) suffix = 'rd';

      return formattedDate.replace(day, `${day}${suffix}`);
    }
  };

  return (
    <div className="relative border border-border rounded-md my-2 h-screen">
      <div className="w-full p-4 bg-muted rounded-t-md">
        <h4 className="text-sm">
          {`${
            courses.filter((item) => item.id === group.courseId)[0]?.courseTitle
          } #${group?.groupNumber}`}
        </h4>
        <p className="text-muted-foreground text-sm">
          {groupStudents?.length} members
        </p>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
        <div className="p-2 md:p-4">
          {task?.images && task?.images?.length > 0 && (
            <div className="w-full flex items-center justify-center my-3">
              <Badge variant="secondary">
                {formatDateWithWeek(task?.timestamp)}
              </Badge>
            </div>
          )}

          <div>
            {task?.images && task?.images?.length > 0 && (
              <div className="flex flex-col">
                {task?.images?.map(({ url, type, id, name, timestamp }) => (
                  <div
                    key={id}
                    className="flex items-start gap-2 my-1 md:my-2 max-w-md"
                  >
                    <Avatar
                      title={teacher}
                      className="cursor-pointer w-8 h-8 md:w-10 md:h-10"
                    >
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xs md:text-sm font-medium">
                        {getInitials(teacher)}
                      </AvatarFallback>
                    </Avatar>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative"
                    >
                      <div className="pl-2.5 pr-4 pt-1 pb-3 rounded-lg border border-border hover:border-ring duration-200 cursor-pointer bg-muted">
                        <div className='flex items-center justify-between'>
                          <p className="text-xs font-medium pb-1.5 text-blue-500">
                            {teacher}
                          </p>
                          <small className='text-muted-foreground text-xs'>O'qituvchi</small>
                        </div>
                        <div className="flex items-start gap-3">
                          {type === 'application/pdf' ? (
                            <img
                              src="/assets/pdf.jfif"
                              className="w-14 h-14 rounded-md"
                            />
                          ) : (
                            <img
                              className="w-14 h-14 rounded-md object-cover"
                              src={url}
                              alt={name}
                            />
                          )}
                          <div>
                            <h4 className="text-sm font-medium">
                              {type === 'application/pdf'
                                ? 'PDF faylni yangi oynada ochish'
                                : 'Rasmni yangi oynada ochish'}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {name}
                            </p>
                          </div>
                        </div>
                        <small className="text-muted-foreground float-right absolute bottom-1 right-2.5">
                          {formatTime(timestamp)}
                        </small>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto py-4 pt-0">
            {messages.map((msg) => (
              <div className="relative flex items-start gap-2 my-2 max-w-md">
                <Avatar
                  title={msg?.senderName}
                  className="cursor-pointer w-8 h-8 md:w-10 md:h-10"
                >
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs md:text-sm font-medium">
                    {getInitials(msg?.senderName)}
                  </AvatarFallback>
                </Avatar>
                <div className="pl-2.5 pr-4 pt-1 pb-3 rounded-lg border border-border bg-muted relative">
                  <p className="text-xs font-medium text-blue-500">
                    {msg?.senderName}
                  </p>
                  <h4 className="text-sm pt-0 pb-2">{msg.message}</h4>
                  <small className="text-muted-foreground absolute bottom-1 right-2.5 z-10 bg-muted opacity-80">
                    {formatTime(msg.timestamp)}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskChat;
