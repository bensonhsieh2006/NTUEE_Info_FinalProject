import { db } from "@/db"
import { eventTable } from "@/db/schema"
import { eq } from "drizzle-orm"

import DeleteEventButton from "@/components/deleteEventButton"

type AllEventsProp = {
  pickedDate: string
}
export default async function AllEvents({pickedDate}: AllEventsProp){
    const allEvents = await db
    .select()
    .from(eventTable)
    .where(eq(eventTable.eventDate, pickedDate))

    return(
      <ul>
        {allEvents.map((event: any)=>(
            <li key={event.id} className="p-2 bg-sky-200/50 rounded-xl m-2">

                <h1 className="text-xl p-2 border-b border-gray-600">{event.title}</h1>
                <h3 className="text-gray-500 p-2">{event.description}</h3>

                <div className="flex justify-end">
                  <DeleteEventButton id={event.id}></DeleteEventButton>
                </div>  
            </li>
        ))}
      </ul>

    )
}