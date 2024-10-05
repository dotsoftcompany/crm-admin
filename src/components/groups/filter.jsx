import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Settings2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

function FilterGroups({
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
    <div className="flex items-center gap-2">
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
  );
}

export default FilterGroups;
