"use client"

import * as React from "react"
import { Button } from "./ui/button"
import useEvent from "@/hooks/useEvent"

export default function DeleteEventButton({ id }:{ id: string }){
    const { deleteEvent, loading } = useEvent();


    return(
        <Button onClick={() => {
            deleteEvent({ id: id } )
        }}
        >
          Delete
        </Button>
    )
}