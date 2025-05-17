"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button"
import useTodo from "@/hooks/useTodo"
import { EventHandler, MouseEvent, useState } from "react"
import type { TodoProps } from "@/types/todo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"


function EditButton({ todo, className }: { todo: TodoProps, className?: string })
{
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const { editTodo } = useTodo();

    const handleSaveClick: EventHandler<MouseEvent> = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Edit Save Todo Button Clicked.\n","title: " , title,"  description: " , description);

        if (!title) return;

        try {
            await editTodo(title, description, todo.id);
            toast(() => (
                <div className="font-bold text-base">
                    {"📑 "+ todo.title + " is edited！"}
                    {/* <button
                        // onClick={}
                        className="ml-4 bg-red-500 text-white p-1 rounded hover:bg-red-300 cursor-pointer"
                    >
                        Undo
                    </button> */}
                </div>
                ),
                {style: {backgroundColor: "#ebe9eb"}}
            );
            setTitle("");
            setDescription("");
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
                size="sm"
                className="cursor-pointer ml-2 opacity-30 group-hover:opacity-100"
            >
                ✏️
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Edit Todo</h4>
                    <p className="text-sm text-muted-foreground">
                        Edit this todo.
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
                onClick={handleSaveClick}
                // size="sm"
                className="cursor-pointer mt-4"
            >
                Save
            </Button>
            </PopoverContent>
        </Popover>
        </>
        
    )
}

function Todo(todo: TodoProps)
{
    const { deleteTodo, updateTodo } = useTodo();

    const handleCheckboxClick: EventHandler<MouseEvent> = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        
        try {
            console.log("Updating todo:", todo.id, todo.title);
            const show = !todo.finished;
            await updateTodo(todo);
            if (show) {
                toast(() => (
                    <div className="font-bold text-base text-emerald-700 ">
                        {"🎉 "+ todo.title + " is completed！"}
                        {/* <button
                            // onClick={}
                            className="ml-4 bg-red-500 text-white p-1 rounded hover:bg-red-300 cursor-pointer"
                        >
                            Undo
                        </button> */}
                    </div>
                    ),
                    {style: {backgroundColor: "#a3fbbe"}}
                );
            }
            else {
                toast(() => (
                    <div className="font-bold text-base text-orange-700">
                        {"🔙 "+ todo.title + " is marked as uncompleted！"}
                        {/* <button
                            // onClick={}
                            className="ml-4 bg-red-500 text-white p-1 rounded hover:bg-red-300 cursor-pointer"
                        >
                            Undo
                        </button> */}
                    </div>
                    ),
                    {style: {backgroundColor: "#fffac9"}}
                );
            }
        } 
        catch (error) {
            console.error("Error updating todo:", error);
        }
    }

    const handleDeleteButtonClick: EventHandler<MouseEvent> = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        
        try {
            console.log("Deleting todo:", todo.id, todo.title);
            await deleteTodo(todo.id);
            toast(() => (
                <div className="font-bold text-base text-orange-700">
                    {"👌 "+ todo.title + " is deleted successfully"}
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
            console.error("Error deleting todo:", error);
        }
    }

    return(
        <>
            <div className="flex group grid grid-cols-[2rem_1.5fr_1fr_1fr] gap-4 items-center w-100 p-2 border-gray-300 hover:bg-gray-100 justify-self-start">
                
                <Checkbox
                    onClick={handleCheckboxClick}
                    checked={todo.finished}
                    className="cursor-pointer"
                />
                
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <h2>{todo.title}</h2>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{todo.description}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            
                <EditButton
                    todo={todo}
                />
                
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDeleteButtonClick}
                    className="cursor-pointer bg-gray-200 hover:bg-gray-300 grid justify-items-end opacity-30 group-hover:opacity-100"
                >
                    🗑️
                </Button>
            </div>
        </>
    )
}

export { Todo }