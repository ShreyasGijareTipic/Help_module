<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            
            $table->unsignedBigInteger('user_id')->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            
            $table->dropColumn('user_id');
        });
    }
};
