<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'answer',
        'product_id',
        'login_user',
        'categories_faq',
        'created_by',
        'updated_by',
    ];

    // Relationship with Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

