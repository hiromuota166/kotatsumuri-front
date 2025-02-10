import { Todo } from './todo';
export type Diagnosis = {
    disease: string;
    description: string;
    possible_causes: [string];
    symptoms: [string];
    todo_list: [Todo];
}