import { Todo } from "@/components/todo"
import { todoTable } from "@/db/schema";
import { db } from "@/db"
import { eq } from "drizzle-orm";

let finishedTodosCount = 0;
let unfinishedTodosCount = 0;

async function Todos(
    { selectFinished }: { selectFinished?: boolean } 
)
{
    const selectedTodos = await db.select().from(todoTable).where(eq(todoTable.finished, selectFinished || false));
    if(selectFinished)finishedTodosCount = selectedTodos.length;
    else unfinishedTodosCount = selectedTodos.length;

    return (
        <>
            {selectedTodos?.map((todo) => (
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

export { Todos, finishedTodosCount, unfinishedTodosCount };