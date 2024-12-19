<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'query',
        'comment',
        'comment_by',
        'status',
        'comment_is_user',
        
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
