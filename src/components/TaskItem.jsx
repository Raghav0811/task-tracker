import { React, useState } from "react";

const TaskItem = ({ task, toggleTask, removeTask, updateTaskText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() !== "") {
      updateTaskText(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task.id)}
      />

      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          autoFocus
        />
      ) : (
        <span
          className={`task-text ${task.done ? "done" : ""}`}
          onClick={() => setIsEditing(true)}
        >
          {task.text}
        </span>
      )}

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
