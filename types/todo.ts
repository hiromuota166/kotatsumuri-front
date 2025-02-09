export type Todo = {
    task_id: number;
    task_name: string;
    description: string;
    timing: string;
    priority: Priority;
    status: Status;
    due_date: string;
}

enum Priority {
    High = "high",
    Medium = "medium",
    Low = "low",
  }

enum Status {
    Done = "done",
    NotStarted = "not_started",
}
  