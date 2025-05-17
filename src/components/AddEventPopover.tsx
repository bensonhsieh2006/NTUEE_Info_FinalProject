"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { MiniCalendar } from "@/components/minicalendar"
import ColorSelect from "@/components/ColorSelect"
import TimeSelect from "./TimeSelect"

import { toast } from "sonner"

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
    const [colorValue, setColorValue] = React.useState("")
    const [startHour, setStartHour] = React.useState(0)
    const [startMin, setStartMin] = React.useState(0)
    const [endHour, setEndHour] = React.useState(0)
    const [endMin, setEndMin] = React.useState(0)

    const {addEvent, loading} = useEvent();

    const handleAddEvent = async (title: string, description: string, date: string, colorValue: string, startHour: number, startMin: number, endHour: number, endMin: number, resDate: string) => {
        addEvent({
            eventDate: date,
            title: title,
            description: description,
            colorValue: colorValue,
            startHour: startHour,
            startMin: startMin,
            endHour: endHour,
            endMin: endMin})

        toast(() => (
            <div className="font-bold text-base">
                {"📅 \""+ title + "\" event is added in " + resDate + "!"}
            </div>
            ),
            {style: {backgroundColor: "#ebe9eb"}}
        );

        setTitle("");
        setDescription("");
        setColorValue("");
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
                                handleAddEvent(title, description, format(checkDate(eventDate), "yyyy-MM-dd"), colorValue, startHour, startMin, endHour, endMin, format(checkDate(eventDate), "yyyy/MM/dd"), )
                            }}
                            >

                            <div>
                                <TimeSelect 
                                  onStartHourChange={(newStartHour: number) => (setStartHour(newStartHour))}
                                  onStartMinuteChange={(newStartMinute: number) => (setStartMin(newStartMinute))}
                                  onEndHourChange={(newEndHour: number) => (setEndHour(newEndHour))}
                                  onEndMinuteChange={(newEndMinute: number) => (setEndMin(newEndMinute))}
                                  >
                                </TimeSelect>
                            </div>

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

                            <div className="flex justify-between">
                                <ColorSelect 
                                    onStateChange={(newColor: string) => {
                                        setColorValue(newColor);
                                    }}
                                >

                                </ColorSelect>
                                <Button type="submit" disabled={loading} className="mt-2">Add</Button>
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