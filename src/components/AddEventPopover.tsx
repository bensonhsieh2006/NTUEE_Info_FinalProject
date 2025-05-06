"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { MiniCalendar } from "@/components/minicalendar"

import { format } from "date-fns"

import useAddEvent from "@/hooks/useAddEvent"

type addEventProps = {
    defaultDate: Date | undefined
}

function AddEventPopover({defaultDate}: addEventProps){

    const [eventDate, setEventDate] = React.useState<Date | undefined>(defaultDate)
    const [addEventOpen, setAddEventOpen] = React.useState(false)
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const {addEvent, loading} = useAddEvent();

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

                <PopoverContent className="w-185 text-wrap mx-8 bg-gray-50">
                    <h1> Adding Event</h1>

                    <div className="pt-2 border-t mt-2">
                        <h1 className="">{eventDate ? format(eventDate, "EEEE, MMMM d, yyyy") : "Select a date"}</h1>
                        <div className="flex justify-center">
                            <MiniCalendar mode="single" selected={eventDate} onSelect={setEventDate}></MiniCalendar>
                        </div>
                        <div className="w-full">
                            <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddEvent(title, description, format(eventDate, "yyyy-MM-dd"))
                            }}
                            >
                            <Input 
                                type="text" 
                                placeholder="Title" 
                                value={title} 
                                className="bg-white" 
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Input 
                                type="text" 
                                placeholder="Description" 
                                value={description} 
                                className="bg-white" 
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Button type="submit" disabled={loading}>Add</Button>
                            </form>
                        </div>
                    </div>

                    <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={() => setAddEventOpen(false)}>
                        Close
                    </Button>
                    </div>

                </PopoverContent>
            </Popover>
        </div>
    )
}

export {AddEventPopover}