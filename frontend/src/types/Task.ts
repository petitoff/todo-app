import { User } from "./User";

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  deadline?: string;
  user: User;
};
