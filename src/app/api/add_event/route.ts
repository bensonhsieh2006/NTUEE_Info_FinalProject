import { NextRequest, NextResponse } from "next/server";

import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { eventTable } from "@/db/schema";

const addEventRequestSchema = z.object({
    eventDate: z.string().date(),
    //eventDate: z.string().min(1).max(15),
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(50),
});

const deleteEventRequestSchema = z.object({
    id: z.string().uuid(),
})

type AddEventRequest = z.infer<typeof addEventRequestSchema>;

type DeleteEventRequest = z.infer<typeof deleteEventRequestSchema>;

export async function GET(request: NextRequest){

    const data = await request.json();

    try{
        addEventRequestSchema.parse(data);
    }catch (error){
        return NextResponse.json({error: "Invalid Request"}, {status: 400});
    }


    try{
        await db
        .select()
        .from(eventTable)
        .execute();
    }catch (error){
        return NextResponse.json(
            { error: "Something went wrong."},
            { status: 500},
        );
    }
}


export async function POST(request: NextRequest){
    
    const data = await request.json();
    try{
        addEventRequestSchema.parse(data);
    }catch (error){
        return NextResponse.json({error: "Invalid Request"}, {status: 400});
    }

    const {eventDate, title, description} = data as AddEventRequest;

    try{
        await db
        .insert(eventTable)
        .values({
            eventDate,
            title,
            description,
        })
        .onConflictDoNothing()
        .execute();
    }catch (error){
        return NextResponse.json(
            { error: "Something went wrong."},
            { status: 500},
        );
    }

    return new NextResponse("OK", { status: 200 });
}


export async function DELETE(request: NextRequest){
    
    const data = await request.json();
    try{
        deleteEventRequestSchema.parse(data);
    }catch (error){
        return NextResponse.json({error: "Invalid Request"}, {status: 400});
    }

    const { id } = data as DeleteEventRequest;

    try{
        await db
        .delete(eventTable)
        .where(eq(eventTable.id, id))
        .execute();
    }catch (error){
        return NextResponse.json(
            { error: "Something went wrong."},
            { status: 500},
        );
    }

    return new NextResponse("OK", { status: 200 });
}