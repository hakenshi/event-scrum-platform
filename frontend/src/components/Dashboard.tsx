'use client';

import { useState, useEffect } from 'react';
import { Event } from '../types';

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    activeBoards: 0,
    completedTasks: 0,
    totalParticipants: 0,
  });

  useEffect(() => {
    // Simular carregamento de dados
    setMetrics({
      totalEvents: events.length,
      activeBoards: events.filter(e => e.scrumBoards?.some(b => b.status === 'active')).length,
      completedTasks: 0,
      totalParticipants: events.reduce((sum, e) => sum + (e.participants_count || 0), 0),
    });
  }, [events]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Métricas */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Total de Eventos</h3>
          <p className="text-3xl font-bold text-blue-600">{metrics.totalEvents}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Quadros Ativos</h3>
          <p className="text-3xl font-bold text-green-600">{metrics.activeBoards}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Tarefas Concluídas</h3>
          <p className="text-3xl font-bold text-purple-600">{metrics.completedTasks}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Total Participantes</h3>
          <p className="text-3xl font-bold text-orange-600">{metrics.totalParticipants}</p>
        </div>
      </div>

      {/* Eventos Recentes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Eventos Recentes</h2>
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhum evento encontrado</p>
        ) : (
          <div className="space-y-4">
            {events.slice(0, 5).map(event => (
              <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{event.name}</h3>
                  <p className="text-sm text-gray-600">
                    {event.type} • {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {event.participants_count || 0} participantes
                  </p>
                  {event.budget && (
                    <p className="text-sm font-medium">
                      R$ {event.budget.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}