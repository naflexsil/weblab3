import React, { useState, useEffect } from "react";
import "../styles/app.scss";
import TaskInput from "./task_input";
import TaskList from "./task_list";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    // Загружаем задачи из localStorage, если они существуют
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    // Сохраняем обновленное состояние задач в localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, desc) => {
    const newTask = {
      id: Date.now().toString(), // Используем временную метку как уникальный идентификатор
      title,
      desc,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
            <TaskList tasks={tasks} deleteTask={deleteTask} />
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
