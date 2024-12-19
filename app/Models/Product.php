<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_name',
        'company_name',
        'owner_name',
        'email',
        'mobile',
        'status',
    ];
}
