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

    const bgColor = {
      "red": "bg-red-200/50 p-2 rounded-xl m-2",
      "orange": "bg-orange-200/50 p-2 rounded-xl m-2",
      "yellow": "bg-yellow-200/50 p-2 rounded-xl m-2",
      "green": "bg-green-200/50 p-2 rounded-xl m-2",
      "blue": "bg-blue-200/50 p-2 rounded-xl m-2",
      "purple": "bg-purple-200/50 p-2 rounded-xl m-2",
    }
    return(
      <ul>
        {allEvents.map((event: any)=>(
            <li key={event.id} className={bgColor[event.colorValue]}>
              <div className="flex justify-between text-xl p-2 border-b-2 border-gray-600">
                <h1>{event.title}</h1>
                <h1>From {event.startHour}:{event.startMin} to {event.endHour}:{event.endMin}</h1>
              </div>
              
              <h3 className="text-gray-700 p-2">{event.description}</h3>

              <div className="flex justify-end">
                <DeleteEventButton id={event.id}></DeleteEventButton>
              </div>  
            </li>
        ))}
      </ul>

    )
}