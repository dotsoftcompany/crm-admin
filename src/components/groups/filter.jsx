import React from 'react';
import { Link } from 'react-router-dom';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Settings2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function FilterGroups({
  url,
  title,
  searchTerm,
  setSearchTerm,
  filterOption,
  setFilterOption,
}) {
  const getPlaceholder = () => {
    switch (filterOption) {
      case 'title':
        return "Guruh nomi bo'yicha qidirish...";
      case 'teacher':
        return "Ustoz bo'yicha qidirish...";
      default:
        return 'Qidirish...';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-3 w-full">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm"
          placeholder={getPlaceholder()}
        />
        <Select
          // defaultValue="title"
          onValueChange={(val) => setFilterOption(val)}
        >
          <SelectTrigger isChevron={false} className="w-fit">
            <Settings2 className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Guruh nomi</SelectItem>
            <SelectItem value="teacher">Ustoz bo'yicha</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Link to={url}>
        <Button
          variant="secondary"
          className="hidden md:flex items-center gap-1.5 h-9 dark:bg-primary dark:text-black"
        >
          <PlusCircle className="w-4 h-4 -ml-1" />
          <span>{title}</span>
        </Button>
      </Link>
    </div>
  );
}

export default FilterGroups;
