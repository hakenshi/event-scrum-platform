<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scrum_boards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->integer('sprint_duration');
            $table->integer('team_size');
            $table->text('objectives')->nullable();
            $table->enum('complexity', ['low', 'medium', 'high']);
            $table->enum('status', ['active', 'completed', 'paused'])->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scrum_boards');
    }
};