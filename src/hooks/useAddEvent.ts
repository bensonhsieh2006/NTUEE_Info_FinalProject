import { useState } from "react";

import { useRouter } from "next/navigation";


export default function useAddEvent(){
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const addEvent = async ({
        eventDate,
        title,
        description,
    }:{
        eventDate: string,
        title: string;
        description: string;
    }) => {
        if (loading) return;
        setLoading(true);

        const res = await fetch("/api/add_event", {
            method: "POST",
            body: JSON.stringify({
                eventDate,
                title,
                description
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
        loading,
    };
}