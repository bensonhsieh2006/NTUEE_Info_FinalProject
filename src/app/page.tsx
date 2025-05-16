import * as React from "react"
 
import { MainPage } from "@/components/mainpage"
import AllEvents from "@/components/AllEvents"
import { db } from "@/db"
import { eventTable } from "@/db/schema"
import { Toaster } from "sonner"
import { TodoList } from "@/components/todolist"
import { Todos } from "@/components/todos"
import { CompletedTodolist } from "@/components/completedTodolist"


export default async function Home({
  searchParams
  }: {
    searchParams: {[key: string]: string}
  }) {
  
  const getBookedDates: { eventDate: string }[] = await db
  .selectDistinct({
    eventDate: eventTable.eventDate
  })
  .from(eventTable)

  const modifiers = {
    booked: getBookedDates.map((event) => new Date(event.eventDate))
  }

  const {pickedDate} = await searchParams
  
  return (
    <div className="grid grid-flow-col-dense grid-row-2 items-start overflow-auto mt-8 gap-8">
      <MainPage modifiers={modifiers}>
        <AllEvents pickedDate={pickedDate}></AllEvents>
      </MainPage>
      <div className="row-span-2 grid grid-rows-subgrid">
          <div className="">
            <TodoList>
                <Todos
                    selectFinished={false}
                />
            </TodoList>
          </div>
      </div>
      <div className="row-span-2 grid grid-rows-subgrid">
        <div className="">
          <CompletedTodolist>
              <Todos
                  selectFinished={true}
              />
          </CompletedTodolist>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
          <Toaster/>
      </div>
    </div>

  )
}
