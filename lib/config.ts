export type Task = {
  id: string | number;
  title: string;
  status: boolean;
  created_at?: string;
};

export const TaskListEditable = ["priority", "assignee", "email", "status"];
