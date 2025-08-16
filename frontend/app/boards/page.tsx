'use client';

import { useState } from 'react';

const columns = [
  { id: 'backlog', title: 'Backlog', color: 'bg-gray-100' },
  { id: 'todo', title: 'To Do', color: 'bg-blue-100' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-yellow-100' },
  { id: 'review', title: 'Review', color: 'bg-purple-100' },
  { id: 'done', title: 'Done', color: 'bg-green-100' },
];

export default function BoardsPage() {
  const [tasks, setTasks] = useState([]);
  const [showScrumForm, setShowScrumForm] = useState(false);

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks(tasks.map((task: any) => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quadros Scrum</h1>
        <button 
          onClick={() => setShowScrumForm(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Gerar Scrum
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4 min-h-screen">
        {columns.map(column => (
          <div key={column.id} className={`${column.color} p-4 rounded-lg`}>
            <h3 className="font-semibold mb-4 text-center">{column.title}</h3>
            <div className="space-y-3">
              {tasks
                .filter((task: any) => task.status === column.id)
                .map((task: any) => (
                  <div key={task.id} className="bg-white p-3 rounded shadow-sm">
                    <h4 className="font-medium mb-2">{task.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className={`px-2 py-1 rounded ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
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

      {showScrumForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Gerar Estrutura Scrum</h2>
            <form className="space-y-4">
              <input
                type="number"
                placeholder="Duração do sprint (dias)"
                min="3"
                max="30"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Tamanho da equipe"
                min="1"
                max="20"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                placeholder="Objetivos específicos"
                className="w-full p-3 border rounded-lg h-24"
              />
              <select className="w-full p-3 border rounded-lg">
                <option value="">Complexidade do projeto</option>
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Gerar com IA
                </button>
                <button
                  type="button"
                  onClick={() => setShowScrumForm(false)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}