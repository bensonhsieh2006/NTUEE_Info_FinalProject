import { Todo } from "@/components/todo"
import { todoTable } from "@/db/schema";
import { db } from "@/db"
import { eq } from "drizzle-orm";

async function Todos(
    { selectFinished }: { selectFinished?: boolean } 
)
{
    const unfinishedTodos = await db.select().from(todoTable).where(eq(todoTable.finished, selectFinished || false));

    return (
        <>
            {unfinishedTodos?.map((todo) => (
                <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description || ""}
                    finished={todo.finished || false}
                />
            ))}
        </>
    );
}

export { Todos }