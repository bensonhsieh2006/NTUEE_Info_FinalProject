import * as React from "react"

import { MainPage } from "@/components/mainpage"
import AllEvents from "@/components/AllEvents"
import { db } from "@/db"
import { count, eq, sql } from "drizzle-orm"
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
  
  /*const getBookedDates: { eventDate: string }[] = await db
  .selectDistinct({
    eventDate: eventTable.eventDate
  })
  .from(eventTable)*/

  const getEvent: { count: number, eventDate: string }[] = await db
  .select({
    count: sql<number>`count(*)`.as('count'),
    eventDate: eventTable.eventDate
  })
  .from(eventTable)
  .groupBy(eventTable.eventDate)

  const {pickedDate} = await searchParams
  
  return (
    <div className="overflow-auto">
      <MainPage eventList={getEvent}>
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
