import apiClient from ".";
import { Todo } from "../../types/todo";
import { Diagnosis } from "../../types/diagnoses";

export async function post_todos(todos: [Todo], plant_id: string): Promise<number> {
    const response = await apiClient.post(`/todos/${plant_id}/plants/`, {
        todos: todos.map(todo => ({
            taskname: todo.taskname,
            discription: todo.discription,
            timing: todo.timing,
            priority: todo.priority,
            status: todo.status,
            duedate: todo.duedate
        }))
    });
    return response.status;
}

export async function get_todos(plant_id: string): Promise<[Todo]> {
    const response = await apiClient.get(`/todos/${plant_id}/plants/`);
    return response.data as [Todo];
}