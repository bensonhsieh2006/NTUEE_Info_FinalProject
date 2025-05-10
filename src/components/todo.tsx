"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button"
import useTodo from "@/hooks/useTodo"
import { EventHandler, MouseEvent } from "react"
import type { TodoProps } from "@/types/todo"


function Todo(todo: TodoProps)
{
    const { deleteTodo } = useTodo();

    const handleClick: EventHandler<MouseEvent> = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        
        try {
            console.log("Deleting todo:", todo.id, todo.title);
            await deleteTodo(todo.id);
        } 
        catch (error) {
            console.error("Error deleting todo:", error);
        }
    }

    return(
        <>
            <div className="flex gap-4">
                <Checkbox/>
                <h2>{todo.title}</h2>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClick}
                    className="cursor-pointer"
                >
                    🗑️
                </Button>
            </div>
        </>
    )
}

export { Todo }