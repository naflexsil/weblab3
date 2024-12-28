import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../src/components/redux/store";
import {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
} from "../src/components/redux/tasks_slice";
import TaskInput from "../src/components/task_input";
import DraggableTaskList from "../src/components/draggable_task_list";
import DeleteModal from "../src/components/modals/delete_task_modal";

function App() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleAddTask = (title: string, desc: string) => {
    const newTask = { id: Date.now().toString(), title, desc };
    dispatch(addTask(newTask));
  };

  const handleUpdateTask = (updatedTask: {
    id: string;
    title: string;
    desc: string;
  }) => {
    dispatch(updateTask(updatedTask));
  };

  const handleOpenDeleteModal = (taskId: string) => {
    setTaskToDelete(taskId);
    setModalOpen(true);
  };

  const handleConfirmDeleteTask = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
      setModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("index"), 10);
    dispatch(moveTask({ fromIndex: draggedIndex, toIndex: index }));
  };

  return (
    <div className="app">
      <TaskInput addTask={handleAddTask} />
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <DraggableTaskList
          tasks={tasks}
          onDelete={handleOpenDeleteModal}
          onSave={handleUpdateTask}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      )}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDeleteTask}
      />
    </div>
  );
}

export default App;
