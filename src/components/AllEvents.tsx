import { db } from "@/db"
import { eventTable } from "@/db/schema"

export default async function AllEvents(){

    const allEvents = await db
    .select()
    .from(eventTable)

    return(
      <ul>
        {allEvents.map((event: any)=>(
            <li key={event.id}>
                <h1>{event.eventDate}:{event.title}</h1>
                <h3>{event.description}</h3>
            </li>
        ))}
      </ul>
    )
}