// @ts-expect-error TS(2307): Cannot find module '@reduxjs/toolkit' or its corre... Remove this comment to see the full error message
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state: any, action: any) {
      state.tasks.unshift(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    updateTask(state: any, action: any) {
      const index = state.tasks.findIndex(
        (task: any) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask(state: any, action: any) {
      state.tasks = state.tasks.filter((task: any) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    moveTask(state: any, action: any) {
      const { fromIndex, toIndex } = action.payload;
      const [movedTask] = state.tasks.splice(fromIndex, 1);
      state.tasks.splice(toIndex, 0, movedTask);
      saveTasksToLocalStorage(state.tasks);
    },
    loadTasks(state: any, action: any) {
      state.tasks = action.payload;
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

function saveTasksToLocalStorage(tasks: any) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export const { addTask, updateTask, deleteTask, moveTask, loadTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
