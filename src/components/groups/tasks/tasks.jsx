import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '@/api/firebase';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useMainContext } from '@/context/main-context';

function Tasks({ groupId }) {
  const { uid } = useMainContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(null);

  const fetchTasks = async () => {
    try {
      const ref = collection(db, `users/${uid}/groups/${groupId}/tasks`);
      const querySnapshot = await getDocs(ref);

      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(taskList);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [uid, groupId]);

  function formatDate(timestamp) {
    const { seconds, nanoseconds } = timestamp;
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    return format(date, 'dd.MM.yy');
  }

  return (
    <div className="space-y-2 pt-2">
      <div className="relative">
        <Input
          className="peer pe-9 ps-9 w-full lg:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Vazifalarni qidirish..."
          type="search"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[50rem] w-full">
          <TableCaption
            className={
              loading && !tasks.length
                ? 'bg-muted/50 py-4 rounded-b-md'
                : 'py-4'
            }
          >
            {(loading && 'Loading...') || (!tasks.length && 'No result.')}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-80 rounded-tl-md">Title</TableHead>
              <TableHead className="text-center">Due date</TableHead>
              <TableHead className="text-center">Attachments</TableHead>
              <TableHead className="text-center">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow>
                <Link to={`/groups/${groupId}/task/${task.id}`}>
                  <TableCell className="w-80">
                    <h1 className="text-base font-medium w-80 truncate">
                      {task.title}
                    </h1>
                    <p className="text-sm text-muted-foreground w-80 truncate">
                      {task.description}
                    </p>
                  </TableCell>
                </Link>
                <TableCell className="text-center">
                  {formatDate(task.due)}
                </TableCell>
                <TableCell className="text-center">
                  {task?.images ? task?.images?.length : 0} attachments
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <Link to={`/groups/${groupId}/task/${task.id}`}>
                    <Button variant="link">
                      <Eye className="w-5 h-5" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Tasks;
