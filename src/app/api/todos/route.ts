import { todoTable } from "@/db/schema";
import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";

const TodoSchema = z.object({
    id: z.string().nonempty(),
    date: z.string().optional(),
    title: z.string().min(1),
    description: z.string().optional(),
    finished: z.boolean().default(false),
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
        TodoSchema.safeParse(data);
    }
    catch (error) {
        console.error("Error parsing data:", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { id, title, description, finished } = data as Todo;

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

