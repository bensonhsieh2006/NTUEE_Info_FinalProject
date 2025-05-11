"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import { format } from "date-fns"

import { TodoList } from "@/components/todolist"
import { AddEventPopover } from "@/components/AddEventPopover"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { checkDate } from "@/lib/utils"

function MainPage({
  children,
  modifiers
}: {
  children: React.ReactNode,
  modifiers: any
}) {
  const [pickDate, setPickDate] = React.useState<Date | undefined>(new Date());
  const [eventPageOpen, setEventPageOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const modifierStyles = {
    booked: {
      backgroundColor: "rgb(174, 214, 241)",
      color: "white",
      borderRadius: "50%"
    }
  }
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setPickDate(selectedDate)

    const pickedDate = format(checkDate(selectedDate), "yyyy-MM-dd")
    const params = new URLSearchParams(searchParams);

    params.set("pickedDate", pickedDate!);
    router.push(`${pathname}?${params.toString()}`);

    console.log(pickedDate);

    if (selectedDate) {
      setEventPageOpen(true)
    }
  }


  return(
    <div className="grid grid-flow-col-dense grid-row-2 items-start mx-8">
    <div className="">
        <Popover 
          open={eventPageOpen} 
          onOpenChange={setEventPageOpen}
        >
        <PopoverTrigger>
        </PopoverTrigger>
        <PopoverContent className="w-185 mx-8">
            <div className="space-y-2">

            <h3 className="text-lg">{pickDate ? format(pickDate, "EEEE, MMMM d, yyyy") : "Select a date"}</h3>
            <div className="h-50 p-3 border-t mt-2 overflow-auto">
                <h4 className="text-m font-medium mb-1">Events:</h4>
                {children}
            </div>
            
            <AddEventPopover defaultDate={pickDate}></AddEventPopover>

            <div className="flex justify-end pt-2">
                <Button 
                  variant="outline" 
                  size="sm" onClick={
                    () => setEventPageOpen(false)
                  }
                >
                Close
                </Button>
            </div>
        </div>
        </PopoverContent>
        </Popover>
    </div>
    <div className="">
        <Calendar 
          mode="single" 
          selected={pickDate} 
          onSelect={handleDateSelect} 
          className="rounded-md border shadow w-185" 
          /*components={{
            DayButton
          }} */
          modifiers={modifiers}
          modifiersStyles={modifierStyles}
        />
    </div>
    <div className="row-span-2 grid grid-rows-subgrid">
        <div className="row-start-2">
        <TodoList/>
        
        </div>
    </div>
    </div>
  )
}
  

export {MainPage}