"use client"

import { Todo } from "@/components/todo"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { EventHandler, MouseEvent } from "react";
import { useState } from "react"
import useTodo from "@/hooks/useTodo"


function Todos()
{
    const { loading, todos } = useTodo();
    // console.log("Todos", todos);
    
    // useEffect(() => {
    //     getTodos();
    // }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const finishedTodos = todos?.filter((todo) => todo.finished);
    if (finishedTodos?.length === 0) {
        return <h4>No todos found</h4>;
    }

    // console.log("hihi");
    return (
        <>
            {finishedTodos?.map((todo) => (
                <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    finished={todo.finished}
                />
            ))}
        </>
    );
}

function ClearButton() 
{
    const { loading, todos, deleteTodo } = useTodo();

    const finishedTodos = todos?.filter((todo) => todo.finished);
    if (finishedTodos?.length === 0) {
        return;
    }

    const handleClearButtonClick: EventHandler<MouseEvent> = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        
        try {
            console.log("Clearing all todos");
            for (const todo of finishedTodos?.map((todo) => todo) || []) {
                await deleteTodo(todo.id);
            }
        } 
        catch (error) {
            console.error("Error clearing todos:", error);
        }
    }

    return(
        <>
            <Button
                variant="destructive"
                size="sm"
                onClick={handleClearButtonClick}
                className="cursor-pointer"
            >
                Clear All
            </Button>
        </>
    )
}


function CompletedTodolist()
{
    return(
    <>
        <div className="flex-col text-2xl gap-4">
            <h1>Completed :</h1>
            <Todos/>
        </div>
        <div className="flex-col text-2xl gap-4">
            <ClearButton/>
        </div>
    </>
    )
}

export { CompletedTodolist }