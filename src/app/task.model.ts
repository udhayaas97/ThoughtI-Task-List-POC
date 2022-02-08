export interface TaskData {
  Users: string[];
  Tasks: Task[];
}

export interface Task {
  Task: string;
  Expiry_date: string;
  User: string;
  Important: boolean;
  Created_on: string;
}
