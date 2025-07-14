import React, { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import "./styles/styles.css";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [taskText, setTaskText] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, dueDate) => {
    setTasks([...tasks, { id: Date.now(), text, done: false, dueDate }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !task.done) ||
        (filter === "done" && task.done);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (!a.dueDate) return -1;
      if (!b.dueDate) return 1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  return (
    <div className="app-container">
      <h1>Task Tracker</h1>

      <input
        type="text"
        placeholder="Search tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="filters">
        <button onClick={() => setFilter("all")}>All Tasks</button>
        <button onClick={() => setFilter("done")}>Completed Tasks</button>
        <button onClick={() => setFilter("active")}>Incomplete Tasks</button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (taskText.trim()) {
            addTask(taskText.trim(), taskDueDate);
            setTaskText("");
            setTaskDueDate("");
          }
        }}
      >
        <input
          name="task"
          placeholder="Add a new task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <input
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            removeTask={removeTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
