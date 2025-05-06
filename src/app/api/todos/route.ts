import { db } from "@/db"; // Drizzle DB instance
import { todoTable } from "@/db/schema";
import { z } from "zod";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";

const TodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

type Todo = z.infer<typeof TodoSchema>;

export async function POST(req: Request) {
    const data = await req.json();

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
            title,
            description,
            })
            .onConflictDoNothing()
            .returning()
            .execute();
    } 
    catch (error) {
        console.error("Error inserting data:", error);
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
    }
    return new NextResponse("OK", { status: 200 });
}
