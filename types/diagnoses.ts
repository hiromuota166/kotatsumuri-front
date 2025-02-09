import { Todo } from './todo';
export type Diagnosis = {
    disease: string;
    possible_cause: [string];
    symptoms: [string];
    todo: [Todo];
}