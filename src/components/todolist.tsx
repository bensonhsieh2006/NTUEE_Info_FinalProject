"use client"

import { Todo } from "@/components/todo"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { EventHandler, MouseEvent } from "react";

type AddTodoButtonProps = {
    
}

function RealAddTodoButton() {
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
            className="cursor-pointer"
        >
            Add
        </Button>
    )
}

function AddTodoButton({}: AddTodoButtonProps) {

    const handleClick: EventHandler<MouseEvent> = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Add Todo Button Clicked");
        
    };

    return (
        <>
        <Popover>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                // onClick={handleClick}
                // size="sm"
                className="cursor-pointer"
            >
                ➕
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">New Todo</h4>
                    <p className="text-sm text-muted-foreground">
                        Create a new todo.
                    </p>
                </div>
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Title</Label>
                        <Input
                        id="width"
                        defaultValue=""
                        className="col-span-2 h-8"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxWidth">Description</Label>
                        <Input
                        id="maxWidth"
                        defaultValue=""
                        className="col-span-2 h-8"
                        />
                    </div>
                </div>
            </div>
            <Button
                variant="outline"
                // onClick={handleClick}
                // size="sm"
                className="cursor-pointer mt-4"
            >
                Add
            </Button>
            </PopoverContent>
        </Popover>
        </>
        
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

export { TodoList }