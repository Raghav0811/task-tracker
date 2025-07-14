import { React, useState } from "react";

const TaskForm = ({ addTask }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (!input.trim()) return;
    addTask(input);
    setInput("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Add a new task"
        value={input}
        onChange={handleChange}
      />
      <button>Add Task</button>
    </form>
  );
};

export default TaskForm;
