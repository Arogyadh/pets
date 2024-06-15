<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
  use HasFactory, SoftDeletes;

  protected $table = 'roles';

  protected $fillable = ['name', 'description'];

  public function users(): BelongsToMany
  {
      return $this->belongsToMany(User::class, 'role_user', 'role_id', 'user_id');
  }

}
