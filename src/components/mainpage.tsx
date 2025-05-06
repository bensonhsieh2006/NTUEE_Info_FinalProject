"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { TodoList } from "@/components/todolist"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { AddEventPopover } from "@/components/AddEventPopover"

function MainPage() {
  const [pickDate, setPickDate] = React.useState<Date | undefined>(new Date())
  const [eventPageOpen, setEventPageOpen] = React.useState(false)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setPickDate(selectedDate)
    if (selectedDate) {
      setEventPageOpen(true)
    }
  }


  return(
    <div className="grid grid-flow-col-dense grid-row-2 items-start mx-8">
    <div className="">
        <Popover open={eventPageOpen} onOpenChange={setEventPageOpen}>
        <PopoverTrigger>
        </PopoverTrigger>
        <PopoverContent className="w-185 mx-8">
            <div className="space-y-2">

            <h3 className="text-lg">{pickDate ? format(pickDate, "EEEE, MMMM d, yyyy") : "Select a date"}</h3>
            <h3 className="text-lg">{pickDate ? format(pickDate, "yyyy-MM-dd") : "Select a date"}</h3>
            <div className="pt-2 border-t mt-2">
                <h4 className="text-m font-medium mb-1">Events:</h4>
            </div>

            <AddEventPopover defaultDate={pickDate}></AddEventPopover>

            <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm" onClick={() => setEventPageOpen(false)}>
                Close
                </Button>
            </div>
        </div>
        </PopoverContent>
        </Popover>
    </div>
    <div className="">
        <Calendar mode="single" selected={pickDate} onSelect={handleDateSelect} className="rounded-md border shadow w-185" />
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