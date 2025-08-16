<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scrum_board_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['backlog', 'todo', 'in_progress', 'review', 'done'])->default('backlog');
            $table->integer('story_points')->default(1);
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->text('acceptance_criteria')->nullable();
            $table->string('assigned_to')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};