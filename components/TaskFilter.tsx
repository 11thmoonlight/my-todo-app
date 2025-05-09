"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface TaskFiltersProps {
  onSearchChange: (value: string) => void;
  onDoneFilterChange: (value: "all" | "done" | "not_done") => void;
  onSortChange: (value: "asc" | "desc") => void;
}

export default function TaskFilters({
  onSearchChange,
  onDoneFilterChange,
  onSortChange,
}: TaskFiltersProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearchChange(val);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 items-center md:items-center mb-6">
      <Input
        type="text"
        placeholder="🔍 Search in title, description, ..."
        value={searchValue}
        onChange={handleSearch}
        className="border px-3 py-2 rounded-md text-sm max-w-[350px]"
      />
      <div className="flex gap-4 w-full">
        <Select
          onValueChange={(value) =>
            onDoneFilterChange(value as "all" | "done" | "not_done")
          }
        >
          <SelectTrigger className="border px-3 py-2 rounded-md text-sm w-1/2 sm:w-fit">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="not_done">Not Done</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => onSortChange(value as "asc" | "desc")}
        >
          <SelectTrigger className="border px-3 py-2 rounded-md text-sm w-1/2 sm:w-fit">
            <SelectValue placeholder="Oldest First" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Oldest First</SelectItem>
            <SelectItem value="desc">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
