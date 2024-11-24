import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.unshift(action.payload);
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    moveTask(state, action) {
      const { fromIndex, toIndex } = action.payload;
      const [movedTask] = state.tasks.splice(fromIndex, 1);
      state.tasks.splice(toIndex, 0, movedTask);
    },
    loadTasks(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask, loadTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
