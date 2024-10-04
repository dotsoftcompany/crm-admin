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

function FilterCourses({
  searchTerm,
  setSearchTerm,
  filterOption,
  setFilterOption,
}) {
  const getPlaceholder = () => {
    switch (filterOption) {
      case 'title':
        return "Kurs nomi bo'yicha qidirish...";
      case 'description':
        return "Kurs tavsifi bo'yicha qidirish...";
      case 'price':
        return "Kurs narxi bo'yicha qidirish...";
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
          <SelectItem value="title">Nomi</SelectItem>
          <SelectItem value="description">Tavsifi</SelectItem>
          <SelectItem value="price">Narxi</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterCourses;
