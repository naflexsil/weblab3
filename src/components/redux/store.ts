// @ts-expect-error TS(2307): Cannot find module '@reduxjs/toolkit' or its corre... Remove this comment to see the full error message
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../redux/tasks_slice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
