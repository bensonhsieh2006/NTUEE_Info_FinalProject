import { useState, useEffect, useCallback } from "react";

import { useRouter } from "next/navigation";

type Todo = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export default function useTodo() {

    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState<Todo[]|null>([]);
    const router = useRouter();


    const getTodos =  useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/todos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch todos");
            }
            const data = await response.json();
            setTodos(data);
        } 
        catch (error) {
            console.error("Error fetching todos:", error);
            setLoading(false);
            return [];
        } 
        finally {
            setLoading(false);
        }   
    }, []);

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    const createTodo = async (title: string, description: string) => {
        setLoading(true);
        try {
            const response = await fetch("/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });

            if (!response.ok) {
                throw new Error("Failed to create todo");
            }
            const newTodo = await response.json();

            // ⚡️ 立即更新本地資料，避免二次 API 請求(GPT)
            setTodos((prevTodos) => (prevTodos ? [newTodo, ...prevTodos] : [newTodo]));

            router.refresh();
        } 
        catch (error) {
            console.error("Error creating todo:", error);
        } 
        finally {
            setLoading(false);
        }
    };

    const deleteTodo = async (id: string) => {
        setLoading(true);
        try {   
            const response = await fetch(`/api/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete todo");
            }
            // const data = await getTodos();
            // setTodos(data);

            router.refresh();
        }
        catch (error) {
            console.error("Error deleting todo:", error);
        } 
        finally {
            setLoading(false);
        }
    };

    const updateTodo = async (id: string, title: string, description: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });
            if (!response.ok) {
                throw new Error("Failed to update todo");
            }
            // const data = await getTodos();
            // setTodos(data);

            router.refresh();
        } 
        catch (error) {
            console.error("Error updating todo:", error);
        } 
        finally {
            setLoading(false);
        }
    };

    return { loading, todos, getTodos, createTodo, deleteTodo, updateTodo };
}