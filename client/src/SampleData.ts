export type Task = {
  title: string;
  description: string;
  assignee: string;
  status: "todo" | "in-progress" | "completed";
  dueDate: string;
};

export const tasks: Task[] = [
  {
    title: "Build Login Page",
    description: "Create login UI with email and password fields",
    assignee: "Rohan",
    status: "in-progress",
    dueDate: "2026-09-25",
  },
  {
    title: "Create Dashboard",
    description: "Design and develop the main dashboard",
    assignee: "Rahul",
    status: "todo",
    dueDate: "2026-09-28",
  },
  {
    title: "Setup MongoDB",
    description: "Connect the backend with MongoDB database",
    assignee: "Devansh",
    status: "completed",
    dueDate: "2026-09-22",
  },
  {
    title: "Create API",
    description: "Develop APIs for user authentication",
    assignee: "Krish",
    status: "in-progress",
    dueDate: "2026-09-27",
  },
  {
    title: "Testing",
    description: "Test all major features and fix bugs",
    assignee: "Rohan",
    status: "todo",
    dueDate: "2026-09-30",
  },
];