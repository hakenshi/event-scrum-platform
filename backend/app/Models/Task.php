<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    protected $fillable = [
        'scrum_board_id',
        'title',
        'description',
        'status',
        'story_points',
        'priority',
        'acceptance_criteria',
        'assigned_to',
    ];

    public function scrumBoard(): BelongsTo
    {
        return $this->belongsTo(ScrumBoard::class);
    }
}