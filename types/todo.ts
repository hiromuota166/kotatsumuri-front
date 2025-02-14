export type Todo = {
    task_id: number;
    taskname: string;
    discription: string;
    timing: string;
    priority: Priority;
    status: Status;
    duedate: string;
}

export enum Priority {
    High = "高い",
    Medium = "普通",
    Low = "低",
    default = "No Data",
  }

export enum Status {
    done = "完了",
    notStarted = "未着手",
}
  