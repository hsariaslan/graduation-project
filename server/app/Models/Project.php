<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
        'deadline',
        'files',
        'score',
    ];

    /**
     * A project belongs to a user.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * A project might have various selections.
     */
    public function selections(): HasMany
    {
        return $this->hasMany(Selection::class);
    }

    /**
     * A project has one assignment.
     */
    public function assignment(): HasOne
    {
        return $this->hasOne(Assignment::class);
    }
}
