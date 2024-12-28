import React, { useState } from "react";
// @ts-expect-error TS(2307): Cannot find module 'react-redux' or its correspond... Remove this comment to see the full error message
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
} from "../src/components/redux/tasks_slice.js";
import TaskInput from "./components/task_input.jsx";
import DraggableTaskList from "./components/draggable_task_list.jsx";
import DeleteModal from "./components/modals/delete_task_modal.jsx";

function App() {
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  // @ts-expect-error TS(6133): 'draggedIndex' is declared but its value is never ... Remove this comment to see the full error message
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleAddTask = (title: any, desc: any) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      desc,
    };
    dispatch(addTask(newTask));
  };

  const handleUpdateTask = (updatedTask: any) => {
    dispatch(updateTask(updatedTask));
  };

  const handleOpenDeleteModal = (taskId: any) => {
    setTaskToDelete(taskId);
    setModalOpen(true);
  };

  const handleConfirmDeleteTask = () => {
    dispatch(deleteTask(taskToDelete));
    setModalOpen(false);
    setTaskToDelete(null);
  };

  const handleDragStart = (e: any, index: any) => {
    setDraggedIndex(index);
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e: any, index: any) => {
    const draggedIndex = e.dataTransfer.getData("index");
    dispatch(moveTask({ fromIndex: +draggedIndex, toIndex: index }));
    setDraggedIndex(null);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="app">
      <section className="no-tasks">
        <div className="container">
          <TaskInput addTask={handleAddTask} />
          {tasks.length === 0 ? (
            <div className="no-task-message">
              <p>No tasks</p>
            </div>
          ) : (
            <DraggableTaskList
              tasks={tasks}
              onDelete={handleOpenDeleteModal}
              onSave={handleUpdateTask}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
          )}
        </div>
      </section>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDeleteTask}
      />
    </div>
  );
}

export default App;
