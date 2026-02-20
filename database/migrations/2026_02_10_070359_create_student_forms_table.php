<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_forms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->string('branch');
            $table->unsignedTinyInteger('semester');
            $table->enum('gender', ['male', 'female']);
            $table->string('emailID');
            $table->string('mobileNumber');
            $table->enum('CourseType', ['global', 'professional', 'executive']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_forms');
    }
};
