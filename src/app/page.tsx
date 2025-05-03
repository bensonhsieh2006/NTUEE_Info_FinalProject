"use client"
 
import * as React from "react"
 
import { Calendar } from "@/components/ui/calendar"
import { TodoList } from "@/components/ui/todolist"
import { MiniCalendar } from "@/components/ui/minicalendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"

import { db } from "@/db"
import { eventTable } from "@/db/schema"

export default function Home() {
  const [pickDate, setPickDate] = React.useState<Date | undefined>(new Date())
  const [eventDate, setEventDate] = React.useState<Date | undefined>(undefined)
  const [eventPageOpen, setEventPageOpen] = React.useState(false)
  const [addEventOpen, setAddEventOpen] = React.useState(false)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setPickDate(selectedDate)
    if (selectedDate) {
      setEventPageOpen(true)
    }
  }

  return (
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
                <p className="text-m text-muted-foreground text-wrap">No events scheduled for this day yooooooooooooooo.</p>
              </div>

              <div className="flex flex-col items-center pt-2">
                <Button size="lg" onClick={() => setAddEventOpen(true)}>
                  Add Event
                </Button>
                <Popover open={addEventOpen} onOpenChange={setAddEventOpen}>
                  <PopoverTrigger>
                  </PopoverTrigger>
                  <PopoverContent className="w-185 text-wrap mx-8">
                    <h1> Adding Event</h1>

                    <div className="pt-2 border-t mt-2">
                      <h1 className="">{eventDate ? format(eventDate, "EEEE, MMMM d, yyyy") : "Select a date"}</h1>
                      <div className="flex justify-center">
                        <MiniCalendar mode="single" selected={eventDate} onSelect={setEventDate}></MiniCalendar>
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button>
                        Add
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setAddEventOpen(false)}>
                        Close
                      </Button>
                    </div>

                  </PopoverContent>
                </Popover>
              </div>

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
