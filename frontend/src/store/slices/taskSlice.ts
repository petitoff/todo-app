import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

export type FilterCondition = "COMPLETED";

export interface TaskState {
  tasks?: Task[];
  activeTask?: Task;
  filterCondition?: FilterCondition;
}

const initialState: TaskState = {
  tasks: [],
  activeTask: undefined,
  filterCondition: undefined,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload;
      if (!state.tasks) return;

      const existingTaskIndex = state.tasks.findIndex(
        (task) => task.id === newTask.id
      );

      if (existingTaskIndex !== -1) {
        // Replace the existing task with the new task
        state.tasks[existingTaskIndex] = newTask;
      } else {
        // Add the new task to the existing tasks
        state.tasks.push(newTask);
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
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
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
    setFilterCondition: (
      state,
      action: PayloadAction<FilterCondition | undefined>
    ) => {
      state.filterCondition = action.payload;
    },
    addSubTaskToActiveTask: (state, action: PayloadAction<Task>) => {
      if (!state.activeTask?.subTasks) {
        return;
      }

      const subTaskIndex = state.activeTask.subTasks.findIndex(
        (subTask) => subTask.id === action.payload.id
      );

      if (subTaskIndex >= 0) {
        // Subtask istnieje, zaktualizuj go
        state.activeTask.subTasks[subTaskIndex] = action.payload;
      } else {
        // Subtask nie istnieje, dodaj go do listy
        state.activeTask.subTasks.push(action.payload);
      }
    },
    removeSubTaskFromActiveTask: (state, action: PayloadAction<number>) => {
      if (!state.activeTask?.subTasks) {
        return;
      }

      state.activeTask.subTasks = state.activeTask.subTasks.filter(
        (subTask) => subTask.id !== action.payload
      );
    },
  },
});

export const {
  updateTask,
  updateTasks,
  setTasks,
  removeTask,
  getTaskByIdAndSetItToActiveTask,
  setActiveTask,
  clearActiveTask,
  setFilterCondition,
  addSubTaskToActiveTask,
  removeSubTaskFromActiveTask,
} = taskSlice.actions;
export default taskSlice.reducer;
