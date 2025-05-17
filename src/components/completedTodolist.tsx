"use client"

import { Button } from "@/components/ui/button"
import type { EventHandler, MouseEvent } from "react";
import useTodo from "@/hooks/useTodo"
import { toast } from "sonner"


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
            let todoCount = 0;
            for (const todo of finishedTodos?.map((todo) => todo) || []) {
                await deleteTodo(todo.id);
                todoCount++;
            }
            let message = "";
            if (todoCount === 0) return;
            if (todoCount === 1) message = "✅ "+ todoCount +" completed todo is deleted!"
            else message = "✅ "+ todoCount +" completed todos are deleted!"
            toast(() => (
                <div className="font-bold text-base text-orange-700">
                    {message}
                    {/* <button
                        // onClick={}
                        className="ml-4 bg-red-500 text-white p-1 rounded hover:bg-red-300 cursor-pointer"
                    >
                        Undo
                    </button> */}
                </div>
                ),
                {style: {backgroundColor: "#ffd1ab"}}
            );
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
                className="cursor-pointer bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
            >
                Clear All
            </Button>
        </>
    )
}


function CompletedTodolist( { children }: { children: React.ReactNode } )
{
    return(
    <>
        <div className="flex-col text-2xl gap-4">
            <h1 className="font-bold border-b-2 border-b-gray-400 my-4 pb-4 pl-2">Completed :</h1>
            {children}
        </div>
        <div className="flex-col text-2xl gap-4">
            <ClearButton/>
        </div>
    </>
    )
}

export { CompletedTodolist }