import * as React from "react";
import Input from "../input/input";
import SearchIcon from "../icons/search-icon";
import { cn } from "../../utils/helpers";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** classname for styling container */
  containerClass?: string;
  className?: string;
}

/**
 * Input component used primarily for search, comes with a search icon
 */

export function SearchInput({
  containerClass,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div
      className={cn(
        "h-32 max-w-full bg-[#F5F6FA] border-0.2 border-strokedark shadow-active px-16 flex items-center gap-x-8 rounded-r8 has-[:focus-visible]:border-primary",
        containerClass
      )}
    >
      <SearchIcon />
      <Input
        className={cn(
          "border-none bg-[#F5F6FA] shadow-none p-0 placeholder:text-sm text-sm w-full h-auto !rounded-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
