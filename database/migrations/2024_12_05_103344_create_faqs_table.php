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
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->string('answer');
            $table->unsignedBigInteger('product_id');
            $table->tinyInteger('login_user')->default(1);
            $table->string('categories_faq')->nullable();
            $table->string('created_by');
            $table->string('updated_by')->nullable();
            $table->timestamps();
    
            // Foreign keys
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faqs');
    }
};
