import { todoTable } from "@/db/schema";
import { z } from "zod";
import { and, eq, sql, not } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";

const TodoSchema = z.object({
    id: z.string().optional(),
    date: z.string().optional(),
    title: z.string().min(1),
    description: z.string().optional(),
    finished: z.boolean().default(false),
});
const IdSchema = z.string().uuid("Invalid UUID format");

type Todo = z.infer<typeof TodoSchema>;

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
   
    const { id } = await params;

    try {
        IdSchema.parse(id);
    } 
    catch (error) {
        console.error("Invalid todo ID format:", error);
        return NextResponse.json({ error: "Invalid Todo ID format" }, { status: 400 });
    }
    // console.log("ID", id);

    try {
        const todos = await db
            .delete(todoTable)
            .where(
                eq(todoTable.id, id)
            )
            .returning()
            .execute();
        return NextResponse.json(todos, { status: 200 });
    } 
    catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id:string }> }) {

    // console.log("Request", request);
    const data = await request.json();
    const { id } = await params;

    try {
        IdSchema.parse(id);
        TodoSchema.parse(data);
    } 
    catch (error) {
        console.error("Error parsing data:", error);
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }

    const { title, description, finished } = data as Todo;

    try {
        const todos = await db
            .update(todoTable)
            .set({
                title: title,
                description: description,
                finished: finished
            })
            .where(
                eq(todoTable.id, id)
            )
            .returning()
            .execute();
        return NextResponse.json(todos, { status: 200 });
    } 
    catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }
}