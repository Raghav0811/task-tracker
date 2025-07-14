import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

test("search filters the tasks", () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/add a new task/i);
  const addButton = screen.getByText(/add task/i);

  fireEvent.change(input, { target: { value: "Learn React" } });
  fireEvent.click(addButton);

  fireEvent.change(input, { target: { value: "Write Tests" } });
  fireEvent.click(addButton);

  fireEvent.change(input, { target: { value: "Cook dinner" } });
  fireEvent.click(addButton);

  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Write Tests")).toBeInTheDocument();
  expect(screen.getByText("Cook dinner")).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText(/search tasks/i);
  fireEvent.change(searchInput, { target: { value: "React" } });

  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.queryByText("Write Tests")).toBeNull();
  expect(screen.queryByText("Cook dinner")).toBeNull();
});

test("filters tasks based on status", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/add a new task/i);
  const addButton = screen.getByText(/add task/i);

  fireEvent.change(input, { target: { value: "Task 1" } });
  fireEvent.click(addButton);

  fireEvent.change(input, { target: { value: "Task 2" } });
  fireEvent.click(addButton);

  const allButton = screen.getByText(/all/i);
  fireEvent.click(allButton);

  // Find the <div> of Task 1
  const task1Div = screen.getByText("Task 1").closest(".task-item");

  // Find the checkbox inside Task 1's div
  const task1Checkbox = task1Div.querySelector('input[type="checkbox"]');

  // Click the correct checkbox
  fireEvent.click(task1Checkbox);

  expect(task1Checkbox).toBeChecked();

  const task1Text = screen.getByText((content, element) => {
    return (
      element.tagName.toLowerCase() === "span" && content.trim() === "Task 1"
    );
  });

  expect(task1Text).toHaveClass("done");

  const incompleteButton = screen.getByText(/incomplete/i);
  fireEvent.click(incompleteButton);

  expect(screen.queryByText("Task 1")).toBeNull();
  expect(screen.getByText("Task 2")).toBeInTheDocument();

  const completedButton = screen.getByText(/completed/i);
  fireEvent.click(completedButton);

  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.queryByText("Task 2")).toBeNull();

  fireEvent.click(allButton);

  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();
});
