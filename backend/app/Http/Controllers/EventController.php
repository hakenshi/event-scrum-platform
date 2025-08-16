<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return Event::with('user')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:corporativo,social,educacional,esportivo,cultural',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'participants_count' => 'nullable|integer|min:0',
        ]);

        $validated['user_id'] = auth()->id();
        return Event::create($validated);
    }

    public function show(Event $event)
    {
        return $event->load(['user', 'scrumBoards.tasks']);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'type' => 'in:corporativo,social,educacional,esportivo,cultural',
            'date' => 'date',
            'description' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'participants_count' => 'nullable|integer|min:0',
        ]);

        $event->update($validated);
        return $event;
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->noContent();
    }
}