"use client"

import { Todo } from "@/components/todo"
import { Button } from "@/components/ui/button"
import type { EventHandler, MouseEvent } from "react";

type TodoProps = {

}

function AddTodoButton({}: TodoProps) {

    const handleClick: EventHandler<MouseEvent> = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Add Todo Button Clicked");
    };

    return (
        <Button
            variant="outline"
            onClick={handleClick}
            size="sm"
            className=""
        >
            ➕
        </Button>
    )
}

function TodoList()
{
    return(
    <>
        <div className="flex-col text-2xl gap-4">
            <h1>Todo List :</h1>
            
        
            <Todo/> 
            <Todo/> 
            <Todo/> 
            <Todo/> 
        </div>
        <div className="flex-col text-2xl gap-4">
            <AddTodoButton/>
        </div>
    </>
    )
}

export { TodoList, AddTodoButton }