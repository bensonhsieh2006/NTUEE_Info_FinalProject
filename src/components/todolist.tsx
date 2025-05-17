"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { EventHandler, MouseEvent } from "react";
import { useState } from "react"
import useTodo from "@/hooks/useTodo"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


function AddTodoButton() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }
    const { loading, setTodos, createTodo, getTodos } = useTodo();
    const router = useRouter();

    const handleClick: EventHandler<MouseEvent> = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Add Todo Button Clicked.\n","title: " , title,"  description: " , description);

        if (!title) return;

        try {
            createTodo(title, description);
            toast(() => (
                <div className="font-bold text-base text-green-600">
                    {"✅ "+ title + " is created successfully"}
                    {/* <button
                        // onClick={}
                        className="ml-4 bg-red-500 text-white p-1 rounded hover:bg-red-300 cursor-pointer"
                    >
                        Undo
                    </button> */}
                </div>
                ),
                {style: {backgroundColor: "#cce7ff"}}
            );
            setTitle("");
            setDescription("");
            await getTodos();
            router.refresh();
        }
        catch (error) {
            console.error("Error creating todo:", error);
        }
        
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
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            className="col-span-2 h-8"
                        />
                    </div>
                </div>
            </div>
            <Button
                variant="outline"
                onClick={handleClick}
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

function TodoList( {children}: { children: React.ReactNode } )
{
    return(
    <>
        <div className="flex-col text-2xl gap-4">
            <h1 className="font-bold border-b-2 border-b-gray-400 my-4 pb-4 pl-2">Todo List :</h1>
            {children}
        </div>
        <div className="flex-col text-2xl gap-4 p-4">
            <AddTodoButton/>
        </div>
    </>
    )
}

export { TodoList }