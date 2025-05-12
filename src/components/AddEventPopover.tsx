"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { MiniCalendar } from "@/components/minicalendar"

import { format } from "date-fns"

import useEvent from "@/hooks/useEvent"

import { checkDate } from "@/lib/utils"

type addEventProps = {
    defaultDate: Date | undefined
}

function AddEventPopover({defaultDate}: addEventProps){

    const [eventDate, setEventDate] = React.useState<Date | undefined>(defaultDate)
    const [addEventOpen, setAddEventOpen] = React.useState(false)
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const {addEvent, loading} = useEvent();

    const handleAddEvent = async (title: string, description: string, date: string) => {
        addEvent({
            eventDate: date,
            title: title,
            description: description})
        setTitle("");
        setDescription("");
    }
    
    return (
        <div className="flex flex-col items-center pt-2">
            <Button size="lg" onClick={() => setAddEventOpen(true)}>
            Add Event
            </Button>

            <Popover open={addEventOpen} onOpenChange={setAddEventOpen}>
                <PopoverTrigger>
                </PopoverTrigger>

                <PopoverContent className="w-185 h-165 text-wrap mx-8 bg-slate-50 shadow-2xl overflow-auto" side="right" align="end">
                    
                    <div className="flex justify-between pt-2">
                        <h1 className="text-3xl font-bold"> Adding Event</h1>       
                        <Button variant="ghost" size="sm" onClick={() => setAddEventOpen(false)}>
                        ❌
                        </Button>
                    </div>
                    <div className="pt-2 border-t mt-2">
                        <h1 className="text-lg font-semibold">Event Date: {eventDate ? format(eventDate, "EEEE, MMMM d, yyyy") : "Select a date"}</h1>
                        <div className="flex justify-center">
                            <MiniCalendar 
                              mode="single" 
                              selected={eventDate} 
                              onSelect={setEventDate}
                              className="shadow m-4 border-gray-200 border-1">
                            </MiniCalendar>
                        </div>
                        <div className="w-29/30">
                            <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (eventDate === undefined){

                                }
                                handleAddEvent(title, description, format(checkDate(eventDate), "yyyy-MM-dd"))
                            }}
                            >
                            <Input 
                                type="text" 
                                placeholder="Event" 
                                value={title} 
                                className="bg-white m-2" 
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Input 
                                type="text" 
                                placeholder="Description" 
                                value={description} 
                                className="bg-white m-2" 
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <div className="flex justify-end">
                                <Button type="submit" disabled={loading}>Add</Button>
                            </div>
                            </form>
                        </div>
                    </div>

                </PopoverContent>
            </Popover>
        </div>
    )
}

export {AddEventPopover}