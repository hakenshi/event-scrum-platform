<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    protected $fillable = [
        'name',
        'type',
        'date',
        'description',
        'budget',
        'participants_count',
        'user_id',
    ];

    protected $casts = [
        'date' => 'datetime',
        'budget' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scrumBoards(): HasMany
    {
        return $this->hasMany(ScrumBoard::class);
    }
}