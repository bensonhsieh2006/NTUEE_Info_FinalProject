"use client"
import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import { format } from "date-fns"

import { AddEventPopover } from "@/components/AddEventPopover"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { checkDate } from "@/lib/utils"

function MainPage({
  children,
  eventList
}: {
  children: React.ReactNode,
  eventList: {count: number, eventDate: string}[]
}) {
  const [pickDate, setPickDate] = React.useState<Date | undefined>(new Date());
  const [eventPageOpen, setEventPageOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const modifierStyles = {
    booked: "bg-sky-200/90 rounded-xl after:text-sm after:content-[1] after:absolute after:bottom-1 after:right-0.5"
    /*{

      backgroundColor: "rgb(174, 214, 241)",
      color: "white",
      borderRadius: "50%",

    }*/
  }
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setPickDate(selectedDate)

    const pickedDate = format(checkDate(selectedDate), "yyyy-MM-dd")
    const params = new URLSearchParams(searchParams);

    params.set("pickedDate", pickedDate!);
    router.push(`${pathname}?${params.toString()}`);

    if (selectedDate) {
      setEventPageOpen(true)
    }
    console.log(eventList)
  }


  return(
    <div className="grid grid-flow-col-dense grid-row-2 items-start ml-8 overflow-auto">
      <div className="">
          <Popover 
            open={eventPageOpen} 
            onOpenChange={setEventPageOpen}
          >
          <PopoverTrigger>
          </PopoverTrigger>
          <PopoverContent className="w-185 h-165 mx-8">
              <div className="space-y-2">

              <div className="flex justify-between pt-2">
                  <h3 className="text-3xl font-bold m-2">{pickDate ? format(pickDate, "EEEE, MMMM d, yyyy") : "Select a date"}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" onClick={
                      () => setEventPageOpen(false)
                    }
                  >
                  ❌
                  </Button>
              </div>
              
              <div className="h-120 p-3 border-t mt-2 overflow-auto">
                  <h4 className="text-2xl font-semibold m-2">Events:</h4>
                  {children}
              </div>
              
              <AddEventPopover defaultDate={pickDate}></AddEventPopover>

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
            modifiers={{booked: eventList.map((event) => (new Date (event.eventDate)))}}
            modifiersClassNames={modifierStyles}
          />
      </div>
    </div>
  )
}
  

export {MainPage}