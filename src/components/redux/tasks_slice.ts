import { createSlice } from "@reduxjs/toolkit";

export interface TasksState {
  tasks: { id: string; title: string; desc: string }[];
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.unshift(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    moveTask(state, action) {
      const { fromIndex, toIndex } = action.payload;
      const [movedTask] = state.tasks.splice(fromIndex, 1);
      state.tasks.splice(toIndex, 0, movedTask);
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

function saveTasksToLocalStorage(tasks: TasksState["tasks"]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export const { addTask, updateTask, deleteTask, moveTask } = tasksSlice.actions;

export default tasksSlice.reducer;
