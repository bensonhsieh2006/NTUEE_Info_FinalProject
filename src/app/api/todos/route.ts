import { todoTable } from "@/db/schema";
import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";

const TodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

type Todo = z.infer<typeof TodoSchema>;

export async function GET() {

    try {
        const todos = await db
            .select()
            .from(todoTable)
            // .where(eq(todoTable.title, title))
            .execute();
        return NextResponse.json(todos, { status: 200 });
    } 
    catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const data = await request.json();

    try {
        const parsed = TodoSchema.safeParse(data);
    }
    catch (error) {
        console.error("Error parsing data:", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { title, description } = data as Todo;

    try {
        const result = await db
            .insert(todoTable)
            .values({
                title:title,
                description:description,
            })
            .onConflictDoNothing()
            .returning()
            .execute();
            return NextResponse.json(result, { status: 201 });
    } 
    catch (error) {
        console.error("Error inserting data:", error);
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
    }
    // return new NextResponse("OK", { status: 200 });
}

export async function DELETE(request: NextRequest) {
    const data = await request.json();

    try {
        TodoSchema.parse(data);
    } 
    catch (error) {
        console.error("Error parsing data:", error);
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }

    const { title, description } = data as Todo;

    try {
        const todos = await db
            .delete(todoTable)
            .where(
                eq(todoTable.title, title)
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

export async function PUT(request: NextRequest) {
    const data = await request.json();

    try {
        TodoSchema.parse(data);
    } 
    catch (error) {
        console.error("Error parsing data:", error);
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }

    const { title, description } = data as Todo;

    try {
        const todos = await db
            .update(todoTable)
            .set({
                title:title,
                description:description,
            })
            .where(
                eq(todoTable.title, title)
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