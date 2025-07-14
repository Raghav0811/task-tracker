import { render, screen } from "@testing-library/react";
import TaskItem from "../components/TaskItem";

test("renders task text", () => {
  const task = { id: 1, text: "Test Task", done: false };
  render(<TaskItem task={task} toggleTask={() => {}} removeTask={() => {}} />);

  const taskElement = screen.getByText("Test Task");
  expect(taskElement).toBeInTheDocument();
});
