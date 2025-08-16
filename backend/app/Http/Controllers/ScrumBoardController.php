<?php

namespace App\Http\Controllers;

use App\Models\ScrumBoard;
use App\Models\Event;
use App\Services\BedrockService;
use Illuminate\Http\Request;

class ScrumBoardController extends Controller
{
    public function __construct(private BedrockService $bedrockService) {}

    public function store(Request $request, Event $event)
    {
        $validated = $request->validate([
            'sprint_duration' => 'required|integer|min:3|max:30',
            'team_size' => 'required|integer|min:1|max:20',
            'objectives' => 'required|string',
            'complexity' => 'required|in:low,medium,high',
        ]);

        $scrumBoard = $event->scrumBoards()->create($validated);

        $eventData = array_merge($validated, [
            'name' => $event->name,
            'type' => $event->type,
        ]);

        $tasks = $this->bedrockService->generateScrumBoard($eventData);

        foreach ($tasks as $taskData) {
            $scrumBoard->tasks()->create($taskData);
        }

        return $scrumBoard->load('tasks');
    }

    public function show(ScrumBoard $scrumBoard)
    {
        return $scrumBoard->load(['event', 'tasks']);
    }

    public function updateTaskStatus(Request $request, ScrumBoard $scrumBoard, $taskId)
    {
        $validated = $request->validate([
            'status' => 'required|in:backlog,todo,in_progress,review,done',
        ]);

        $task = $scrumBoard->tasks()->findOrFail($taskId);
        $task->update($validated);

        return $task;
    }
}