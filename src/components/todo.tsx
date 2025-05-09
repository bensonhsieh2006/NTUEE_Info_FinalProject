"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button"

type TodoProps = {
    title: string;
    description: string;
    completed: boolean;
}

function Todo({ title, description, completed }: TodoProps)
{
    return(
        <>
            <div className="flex gap-4">
                <Checkbox/>
                <h2>{title}</h2>
                <Button
                    variant="secondary"
                    size="sm"
                    className=""
                >
                    🗑️
                </Button>
            </div>
        </>
    )
}

export { Todo }