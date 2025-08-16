<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ScrumBoard extends Model
{
    protected $fillable = [
        'event_id',
        'sprint_duration',
        'team_size',
        'objectives',
        'complexity',
        'status',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}