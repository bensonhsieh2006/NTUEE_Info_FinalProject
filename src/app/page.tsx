"use client"
 
import * as React from "react"
 
import { Calendar } from "@/components/ui/calendar"
import { TodoList } from "@/components/ui/todolist"

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <>
    <div className="flex gap-10">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />
      
      <TodoList

      />
    </div>
      
    </>
  );
}
