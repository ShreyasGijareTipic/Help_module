<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'products_id',
        'client_name',
        'mobile',
        'email',
        'query',
        'screen_shot',
        'status',
        'updated_by',
        'user_id'
       
    ];

    protected $casts = [
        'screen_shot' => 'array',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'products_id');
    }

    public function ticketDetails()
    {
        return $this->hasMany(TicketDetail::class);
    }

    public function media()
    {
        return $this->hasMany(Media::class);
    }
}
