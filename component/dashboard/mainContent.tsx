'use client'
import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  project: string;
  status: 'todo' | 'inprogress' | 'done';
  progress: number;
  total: number;
  date: string;
  comments: number;
  attachments: number;
  assignees: string[];
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
}

interface BoardColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  onAddTask: () => void;
  onDeleteTask: (id: number) => void;
}

interface NewTaskForm {
  title: string;
  project: string;
  progress: number;
  total: number;
}

// Task Card Component
function TaskCard({ task, onDelete }: TaskCardProps) {
  const progressPercent = Math.round((task.progress / task.total) * 100);
  const progressColor = progressPercent < 40 ? 'bg-red-500' : progressPercent < 70 ? 'bg-orange-500' : 'bg-green-500';

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-gray-700/50 hover:border-indigo-500/50 transition-all">
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white mb-1 text-sm sm:text-base truncate">{task.title}</h3>
          <p className="text-xs sm:text-sm text-gray-400 truncate">{task.project}</p>
        </div>
        <button onClick={() => onDelete(task.id)} className="text-gray-500 hover:text-red-400 transition-colors p-1 ml-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="mb-2 sm:mb-3">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span className="font-semibold">{task.progress}/{task.total}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full ${progressColor} transition-all`} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{task.date}</span>
        <div className="flex items-center gap-2 text-gray-400">
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{task.comments}</span>
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span>{task.attachments}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Column Component
function BoardColumn({ 
  title, 
  count, 
  tasks, 
  onAddTask, 
  onDeleteTask 
}: BoardColumnProps) {
  return (
    <div className="flex-1 min-w-[280px] sm:min-w-[320px]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="font-semibold text-gray-300 text-sm sm:text-base">
          {title} <span className="text-gray-500">({count})</span>
        </h2>
        <button onClick={onAddTask} className="text-gray-500 hover:text-indigo-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-600 text-sm">No tasks yet</div>
        )}
      </div>
    </div>
  );
}

// Main App
export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Design new ui presentation', project: 'Dribbble marketing', status: 'todo', progress: 7, total: 10, date: '24 Aug 2022', comments: 7, attachments: 2, assignees: ['A', 'B'] },
    { id: 2, title: 'Add more ui/ux mockups', project: 'Pinterest promotion', status: 'todo', progress: 4, total: 10, date: '25 Aug 2022', comments: 0, attachments: 0, assignees: ['C', 'D'] },
    { id: 3, title: 'Design few mobile screens', project: 'Dropbox mobile app', status: 'todo', progress: 3, total: 10, date: '26 Aug 2022', comments: 6, attachments: 4, assignees: [] },
    { id: 4, title: 'Create a tweet and promote', project: 'Twitter marketing', status: 'todo', progress: 2, total: 14, date: '27 Aug 2022', comments: 0, attachments: 0, assignees: ['E', 'F'] },
    { id: 5, title: 'Design system update', project: 'Oreo website project', status: 'inprogress', progress: 3, total: 10, date: '12 Nov 2022', comments: 0, attachments: 0, assignees: ['G', 'H'] },
    { id: 6, title: 'Create brand guideline', project: 'Oreo branding project', status: 'inprogress', progress: 7, total: 10, date: '13 Nov 2022', comments: 2, attachments: 13, assignees: [] },
    { id: 7, title: 'Create wireframe for ios app', project: 'Oreo ios app project', status: 'inprogress', progress: 4, total: 10, date: '14 Nov 2022', comments: 0, attachments: 0, assignees: ['I', 'J'] },
    { id: 8, title: 'Create ui kit for layout', project: 'Crypto mobile app', status: 'inprogress', progress: 3, total: 10, date: '15 Nov 2022', comments: 23, attachments: 12, assignees: [] },
    { id: 9, title: 'Add product to the market', project: 'UI8 marketplace', status: 'done', progress: 10, total: 10, date: '6 Jan 2022', comments: 1, attachments: 5, assignees: [] },
    { id: 10, title: 'Launch product promotion', project: 'Kickstarter campaign', status: 'done', progress: 10, total: 10, date: '7 Jan 2022', comments: 17, attachments: 3, assignees: [] },
    { id: 11, title: 'Make twitter banner', project: 'Twitter marketing', status: 'done', progress: 10, total: 10, date: '8 Jan 2022', comments: 0, attachments: 0, assignees: ['K', 'L'] }
  ]);

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [addFormColumn, setAddFormColumn] = useState<string>('');
  const [newTask, setNewTask] = useState<NewTaskForm>({ title: '', project: '', progress: 0, total: 10 });
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const handleAddTask = (status: 'todo' | 'inprogress' | 'done') => {
    setAddFormColumn(status);
    setShowAddForm(true);
  };

  const handleSaveTask = () => {
    if (newTask.title.trim()) {
      const newTaskWithId: Task = {
        id: Date.now(),
        ...newTask,
        status: addFormColumn as 'todo' | 'inprogress' | 'done',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        comments: 0,
        attachments: 0,
        assignees: []
      };
      setTasks([...tasks, newTaskWithId]);
      setNewTask({ title: '', project: '', progress: 0, total: 10 });
      setShowAddForm(false);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Mobile Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800 z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setShowSidebar(!showSidebar)} className="text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold">K</div>
          <button className="text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSidebar(false)}></div>
          <div className="absolute left-0 top-0 h-full w-64 bg-slate-950/95 border-r border-slate-800 p-6">
            <div className="flex justify-between mb-6">
              <h2 className="font-semibold">Menu</h2>
              <button onClick={() => setShowSidebar(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-800">Projects</button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-800">Tasks</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1">Welcome back, Vincent 👋</h1>
              <p className="text-gray-400 text-sm">19 May 2022</p>
            </div>
            <div className="flex gap-3">
              <button className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button className="px-4 py-2 bg-slate-800 rounded-lg text-sm">Board view</button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm">New template</button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-8">
            <BoardColumn title="To do" count={todoTasks.length} tasks={todoTasks} onAddTask={() => handleAddTask('todo')} onDeleteTask={handleDeleteTask} />
            <BoardColumn title="In progress" count={inProgressTasks.length} tasks={inProgressTasks} onAddTask={() => handleAddTask('inprogress')} onDeleteTask={handleDeleteTask} />
            <BoardColumn title="Done" count={doneTasks.length} tasks={doneTasks} onAddTask={() => handleAddTask('done')} onDeleteTask={handleDeleteTask} />
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Task Title</label>
                <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white" placeholder="Enter task title" />
              </div>
              <div>
                <label className="block text-sm mb-2">Project</label>
                <input type="text" value={newTask.project} onChange={(e) => setNewTask({ ...newTask, project: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white" placeholder="Project name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Progress</label>
                  <input type="number" value={newTask.progress} onChange={(e) => setNewTask({ ...newTask, progress: parseInt(e.target.value) || 0 })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white" min="0" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Total</label>
                  <input type="number" value={newTask.total} onChange={(e) => setNewTask({ ...newTask, total: parseInt(e.target.value) || 10 })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white" min="1" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSaveTask} className="flex-1 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">Add Task</button>
                <button onClick={() => setShowAddForm(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}