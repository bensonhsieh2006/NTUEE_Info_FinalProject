import { NextRequest, NextResponse } from "next/server";

import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { eventTable } from "@/db/schema";

const addEventRequestSchema = z.object({
    eventDate: z.string().min(1).max(15),
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(50),
});

type AddEventRequest = z.infer<typeof addEventRequestSchema>;

export async function GET(request: NextRequest){

    const data = await request.json();

    try{
        addEventRequestSchema.parse(data);
    }catch (error){
        return NextResponse.json({error: "Invalid Request"}, {status: 400});
    }

    const {eventDate, title, description} = data as AddEventRequest

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