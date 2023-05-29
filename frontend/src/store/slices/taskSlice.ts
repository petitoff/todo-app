import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

export interface TaskState {
  tasks?: Task[];
  activeTask?: Task;
}

const initialState: TaskState = {
  tasks: [],
  activeTask: undefined,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload;
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
    },
    updateTasks: (state, action: PayloadAction<Task[]>) => {
      const newTasks = action.payload;

      newTasks.forEach((newTask) => {
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
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks?.filter((task) => task.id !== action.payload);
    },
    getTaskByIdAndSetItToActiveTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks?.find((task) => task.id === action.payload);
      state.activeTask = task;
    },
    setActiveTask: (state, action: PayloadAction<Task>) => {
      state.activeTask = action.payload;
    },
    clearActiveTask: (state) => {
      state.activeTask = undefined;
    },
  },
});

export const {
  updateTask,
  updateTasks,
  removeTask,
  getTaskByIdAndSetItToActiveTask,
  setActiveTask,
  clearActiveTask,
} = taskSlice.actions;
export default taskSlice.reducer;
