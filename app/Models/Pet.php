<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pet extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'age', 'breed', 'description','image', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}