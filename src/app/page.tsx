"use client"
 
import * as React from "react"
 
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [open, setOpen] = React.useState(false)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setOpen(true)
    }
  }

  return (
    <div className="items-center">
      <div className="relative z-0">
        <Calendar mode="single" selected={date} onSelect={handleDateSelect} className="rounded-md border shadow" />
          <div className="z-100">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <span></span>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h3 className="font-medium">{date ? format(date, "MMMM d, yyyy") : "Select a date"}</h3>
                <p className="text-sm text-muted-foreground">You selected {date ? format(date, "EEEE") : "no date"}.</p>
                <div className="pt-2 border-t mt-2">
                  <h4 className="text-sm font-medium mb-1">Events:</h4>
                  <p className="text-xs text-muted-foreground">No events scheduled for this day.</p>
                </div>
                <div className="flex justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

    </div>
  )
}
