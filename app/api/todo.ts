import apiClient from ".";
import { Todo } from "../../types/todo";
import { Diagnosis } from "../../types/diagnoses";

export async function post_todos(todos: [Todo], plant_id: string): Promise<number> {
    const response = await apiClient.post(`/todos/${plant_id}/plants/`, {
        todos: todos.map(todo => ({
            task_name: todo.task_name,
            description: todo.description,
            timing: todo.timing,
            priority: todo.priority,
            status: todo.status,
            due_date: todo.due_date
        }))
    });
    return response.status;
}

export async function get_todos(plant_id: string): Promise<[Todo]> {
    const response = await apiClient.get(`/todos/${plant_id}/plants/`);
    return response.data as [Todo];
}