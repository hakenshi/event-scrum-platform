'use client';

import { useState } from 'react';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Eventos</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Criar Evento
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Nenhum evento criado ainda.</p>
          </div>
        ) : (
          events.map((event: any) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-2">Tipo: {event.type}</p>
              <p className="text-gray-600 mb-4">Data: {new Date(event.date).toLocaleDateString()}</p>
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Gerar Scrum
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                  Editar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Criar Evento</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nome do evento"
                className="w-full p-3 border rounded-lg"
              />
              <select className="w-full p-3 border rounded-lg">
                <option value="">Selecione o tipo</option>
                <option value="corporativo">Corporativo</option>
                <option value="social">Social</option>
                <option value="educacional">Educacional</option>
                <option value="esportivo">Esportivo</option>
                <option value="cultural">Cultural</option>
              </select>
              <input
                type="datetime-local"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                placeholder="Descrição"
                className="w-full p-3 border rounded-lg h-24"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Criar
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
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