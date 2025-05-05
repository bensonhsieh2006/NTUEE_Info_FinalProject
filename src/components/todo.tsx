"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button"

function Todo()
{
    return(
        <>
            <div className="flex gap-4">
                <Checkbox/>
                <h2>123</h2>
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