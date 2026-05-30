<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\SessionToken;
use Illuminate\Support\Facades\Auth;

class ValidateSessionToken
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Read Authorization: Bearer header. 
        $token = $request->bearerToken(); 

        if(!$token) {
            return response()->json(['message' => 'Unauthorized: Token missing'], 402); 
        }

        // 2. Look up the session token by hashed token.
        $hashedToken = hash('sha256', $token);
        $sessionToken = SessionToken::where('token', $hashedToken)->first(); 

        if(!$sessionToken) {
            return response()->json(['message' => 'Unauthorized: Token expired'], 401); 
        }

        // 3. check the expire_at - return 401 if expired. 
        if($sessionToken->expire_at && $sessionToken->expire_at->isPast()){
            return response()->json([
                'message' => 'Unauthorized: Token expired'
            ], 401); 
        }

        // 4. Set Auth::setUser($sesionToken->user)
        if($sessionToken->user) {
            Auth::setUser($sessionToken->user); 
        } else {
            return response()->json(['message' => 'Unauthorized: User not found'], 401); 
        }

        // 5. Update last_used_at time.
        $sessionToken->touch('last_used_at');

        return $next($request);
    }
}
