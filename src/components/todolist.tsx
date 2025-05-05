"use client"

import { Todo } from "@/components/todo"

type TodoProps = {

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
    </>
)
}

export { TodoList }