"use client";
import { useState } from "react";
import ThreeBackground from '@/component/ThreeBackground';

interface Task {
  id: number;
  title: string;
}

interface BoardColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  onAddTask: () => void;
  onDeleteTask: (taskId: number, column: string) => void;
}

// Add missing BoardColumn component
function BoardColumn({
  title,
  count,
  tasks,
  onAddTask,
  onDeleteTask,
}: BoardColumnProps) {
  return (
    <div className="min-w-80 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">
          {title} ({count})
        </h3>
        <button
          onClick={onAddTask}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-900">{task.title}</p>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">No tasks</div>
        )}
      </div>
    </div>
  );
}

const Main = () => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const handleAddTask = (column: "todo" | "inprogress" | "done") => {
    const newTask: Task = { title: `New ${column} task`, id: Date.now() };
    if (column === "todo") setTodoTasks([...todoTasks, newTask]);
    if (column === "inprogress") setInProgressTasks([...inProgressTasks, newTask]);
    if (column === "done") setDoneTasks([...doneTasks, newTask]);
  };

  const handleDeleteTask = (taskId: number, column: string) => {
    if (column === "todo") setTodoTasks(todoTasks.filter((t) => t.id !== taskId));
    if (column === "inprogress")
      setInProgressTasks(inProgressTasks.filter((t) => t.id !== taskId));
    if (column === "done") setDoneTasks(doneTasks.filter((t) => t.id !== taskId));
  };

  return (
    <div className="h-full overflow-y-auto bg-transparent">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1 text-black">
              Welcome back, Vincent 👋
            </h1>
            <p className="text-gray-700 text-sm">19 May 2022</p>
          </div>
          <div className="flex gap-3">
            <button className="text-gray-700 hover:text-black">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm text-black">
            Board view
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm text-white">
            New template
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-8">
          <BoardColumn
            title="To do"
            count={todoTasks.length}
            tasks={todoTasks}
            onAddTask={() => handleAddTask("todo")}
            onDeleteTask={handleDeleteTask}
          />
          <BoardColumn
            title="In progress"
            count={inProgressTasks.length}
            tasks={inProgressTasks}
            onAddTask={() => handleAddTask("inprogress")}
            onDeleteTask={handleDeleteTask}
          />
          <BoardColumn
            title="Done"
            count={doneTasks.length}
            tasks={doneTasks}
            onAddTask={() => handleAddTask("done")}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
