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
        Schema::create('ticket_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ticket_id');
            $table->string('query', 250);
            $table->string('comment', 250)->nullable();
            $table->string('comment_by', 250);
            $table->unsignedTinyInteger('status')->default(1);
            $table->unsignedTinyInteger('comment_is_user')->default(0);
            $table->timestamps();
        
            
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_details');
    }
};
