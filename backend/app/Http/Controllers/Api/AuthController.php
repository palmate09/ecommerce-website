<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\SessionToken;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return $this->issueTokens($user, 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $this->issueTokens($user);
    }

    private function issueTokens(User $user, int $status = 200): JsonResponse
    {
        $plainSessionToken = Str::random(64);
        $hashedSessionToken = hash('sha256', $plainSessionToken);

        SessionToken::create([
            'user_id' => $user->id,
            'token' => $hashedSessionToken,
            'expire_at' => now()->addMinutes(15),
        ]);

        $refreshToken = $user->createToken('refresh-token', ['*'], now()->addHours(24));

        return response()->json([
            'refresh_token' => $refreshToken->plainTextToken,
            'session_token' => $plainSessionToken,
            'user' => new UserResource($user),
        ], $status);
    }
}
