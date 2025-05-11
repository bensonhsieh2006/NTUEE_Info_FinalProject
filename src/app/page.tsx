import * as React from "react"
 
import { MainPage } from "@/components/mainpage"
import AllEvents from "@/components/AllEvents"
import { db } from "@/db"
import { eventTable } from "@/db/schema"


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
    <div>
      <MainPage modifiers={modifiers}>
        <AllEvents pickedDate={pickedDate}></AllEvents>
      </MainPage>
      
    </div>

  )
}
