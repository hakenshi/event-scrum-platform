'use client';

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  story_points: number;
  priority: 'low' | 'medium' | 'high';
  acceptance_criteria?: string;
  assigned_to?: string;
}

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: string) => void;
}

const columns = [
  { id: 'backlog', title: 'Backlog', color: 'bg-gray-100' },
  { id: 'todo', title: 'To Do', color: 'bg-blue-100' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-yellow-100' },
  { id: 'review', title: 'Review', color: 'bg-purple-100' },
  { id: 'done', title: 'Done', color: 'bg-green-100' },
];

export default function KanbanBoard({ tasks, onTaskMove }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    if (draggedTask) {
      onTaskMove(draggedTask, status);
      setDraggedTask(null);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4 h-full">
      {columns.map(column => (
        <div
          key={column.id}
          className={`${column.color} p-4 rounded-lg min-h-96`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <h3 className="font-semibold mb-4 text-center">{column.title}</h3>
          <div className="space-y-3">
            {tasks
              .filter(task => task.status === column.id)
              .map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="bg-white p-3 rounded shadow-sm cursor-move hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium mb-2">{task.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                  {task.assigned_to && (
                    <p className="text-xs text-blue-600 mb-2">Atribuído: {task.assigned_to}</p>
                  )}
                  <div className="flex justify-between items-center text-xs">
                    <span className={`px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {task.story_points}pts
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}