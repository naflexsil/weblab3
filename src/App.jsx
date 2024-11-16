import React, { useState } from "react";
import "../src/styles/app.scss";

import TaskInput from "../src/components/task_input.jsx";
import TaskList from "../src/components/task_list.jsx";
import DeleteModal from "../src/components/modals/delete_task_modal.jsx";
import useLocalStorage from "../src/components/hooks/useLocalStorage.js";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = (title, desc) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      desc,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const openDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setTaskToDelete(null);
  };

  const confirmDeleteTask = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete)
    );
    closeDeleteModal();
  };

  return (
    <div className="app">
      <section className="no-tasks">
        <div className="container">
          <TaskInput addTask={addTask} />
          {tasks.length === 0 ? (
            <div className="no-task-message">
              <p>No tasks</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onDelete={openDeleteModal}
              onSave={updateTask}
            />
          )}
        </div>
      </section>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteTask}
      />
    </div>
  );
}

export default App;