"use client"

import * as React from "react"
import { Button } from "./ui/button"
import useEvent from "@/hooks/useEvent"
import { toast } from "sonner";

export default function DeleteEventButton({ id }:{ id: string }){
    const { deleteEvent } = useEvent();


    return(
        <Button 
            onClick={() => {
                deleteEvent({ id: id } )
                toast(() => (
                    <div className="font-bold text-base">
                        {"📅  Event deleted!"}
                    </div>
                    ),
                    {style: {backgroundColor: "#ebe9eb"}}
                );
            }}
            className="bg-black"
        >
          Delete
        </Button>
    )
}