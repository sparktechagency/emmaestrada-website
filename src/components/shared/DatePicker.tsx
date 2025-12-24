"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { ChangeEvent, ChangeEventHandler } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  value?: string; // ISO string
  onChange?: (value: any | null) => void;
  placeholder?: string;
  disabledDays?: any;
  className?: string;
}

const DatePicker = ({
  value,
  onChange,
  placeholder = "Pick a date",
  disabledDays,
  className,
}: DatePickerProps) => {
  const selectedDate = value ? new Date(value) : undefined;
  const [month, setMonth] = React.useState<Date>(
    selectedDate ?? new Date()
  );

  const handleSelect = (date?: Date) => {
    if (!date) {
      onChange?.(null);
      return;
    }
    onChange?.(date);
  };

  // helper for shadcn Select → DayPicker dropdown
  const handleCalendarChange = (
    value: string | number,
    event: ChangeEventHandler<HTMLSelectElement>
  ) => {
    const newEvent = {
      target: { value: String(value) },
    } as ChangeEvent<HTMLSelectElement>;
    event(newEvent);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-12 justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground mt-2",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0 ">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setMonth}
          disabled={disabledDays}
          captionLayout="dropdown"
          hideNavigation
          components={{
            DropdownNav: (props) => (
              <div className="flex w-full items-center gap-2 px-2 ">
                {props.children}
              </div>
            ),
            Dropdown: (props) => (
              <Select
                value={String(props.value)}
                onValueChange={(value) => {
                  if (props.onChange) {
                    handleCalendarChange(value, props.onChange);
                  }
                }}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {props.options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={String(option.value)}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
