import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

export interface TaskState {
  tasks?: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTasks: (state, action: PayloadAction<Task[]>) => {
      action.payload.forEach((newTask) => {
        const existingTaskIndex = state.tasks?.findIndex(
          (task) => task.id === newTask.id
        );

        if (existingTaskIndex !== undefined && existingTaskIndex !== -1) {
          // Replace the existing task with the new task
          state.tasks![existingTaskIndex] = newTask;
        } else {
          // Add the new task to the existing tasks
          state.tasks?.push(newTask);
        }
      });
    },
  },
});

export const { updateTasks } = taskSlice.actions;
export default taskSlice.reducer;
