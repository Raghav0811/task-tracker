import React from "react";

const TaskItem = ({ task, toggleTask, removeTask }) => {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task.id)}
      />
      <span className={`task-text ${task.done ? "done" : ""}`}>
        {task.text}
      </span>
      {task.dueDate && (
        <small style={{ marginLeft: "8px", color: "gray" }}>
          (Due: {task.dueDate})
        </small>
      )}
      <button className="delete" onClick={() => removeTask(task.id)}>
        ❌
      </button>
    </div>
  );
};

export default TaskItem;
