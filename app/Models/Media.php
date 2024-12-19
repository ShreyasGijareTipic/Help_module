<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    // Disable timestamps if you don't want to track created_at/updated_at
    public $timestamps = false;

    protected $fillable = [
        'ticket_id',
        'url',
    ];
    
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
