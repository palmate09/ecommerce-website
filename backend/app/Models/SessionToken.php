<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;
use Override;

#[Fillable(['user_id', 'token', 'expire_at', 'last_used_at'])]
class SessionToken extends Model
{
    use HasFactory, Notifiable;

    protected $hidden = [
        'token',
    ]; 

    #[Override]
    protected function casts() : array
    {
        return[
            'expire_at' => 'datetime',
            'last_used_at' => 'datetime',
        ]; 
    }

    // user who own's this token. 
    public function user() : BelongsTo 
    {
        return $this->belongsTo(User::class); 
    }

    // check whether the token is expired. 
    public function isExpired(): bool 
    {
        return Carbon::parse($this->expire_at)->isPast(); 
    }
}
