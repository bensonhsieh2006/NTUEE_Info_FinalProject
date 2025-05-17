import { useState } from "react";

import { useRouter } from "next/navigation";


export default function useEvent(){
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const addEvent = async ({
        eventDate,
        title,
        description,
        colorValue,
        startHour,
        startMin,
        endHour,
        endMin
    }:{
        eventDate: string,
        title: string,
        description: string,
        colorValue: string,
        startHour: number,
        startMin: number,
        endHour: number,
        endMin: number,

    }) => {
        if (loading) return;
        setLoading(true);

        const res = await fetch("/api/add_event", {
            method: "POST",
            body: JSON.stringify({
                eventDate,
                title,
                description,
                colorValue,
                startHour,
                startMin,
                endHour,
                endMin,
            }),
        });

        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        
        router.refresh();
        setLoading(false);
    };

    const deleteEvent = async({
        id
    }: {
        id: string
    }) => {

        if (loading) return;
        setLoading(true);

        const res = await fetch("/api/add_event", {
            method: "DELETE",
            body: JSON.stringify({
                id
            }),
        });

        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        
        router.refresh();
        setLoading(false);

    };

    return{
        addEvent,
        deleteEvent,
        loading,
    };
}