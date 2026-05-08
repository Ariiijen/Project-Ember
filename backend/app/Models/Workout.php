<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'distance',
        'duration',
        'date',
        'exercise_name',
        'calories',
    ];

    protected $casts = [
        'date' => 'date',
        'distance' => 'decimal:2',
        'calories' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
