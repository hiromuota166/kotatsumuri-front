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
    High = "高い",
    Medium = "普通",
    Low = "低",
  }

enum Status {
    Done = "完了",
    NotStarted = "未着手",
}
  