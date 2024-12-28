import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../redux/tasks_slice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
