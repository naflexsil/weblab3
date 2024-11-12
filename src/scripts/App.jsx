import React, { useState, useEffect } from "react";
import "../styles/app.scss";
import "../styles/share_modal.scss";
import TaskInput from "./task_input";
import TaskList from "./task_list";
import DeleteModal from "./modals/delete_task_modal";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, desc) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      desc,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
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
            <TaskList tasks={tasks} onDelete={openDeleteModal} />
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
