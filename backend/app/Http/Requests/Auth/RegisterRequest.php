<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Override;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'], 
            'email' => ['required', 'string','email','max:255','unique:users,email'], 
            'password' => ['required', 'confirmed', Password::defaults()]
        ];
    }

    /***
     * Get the messages corresponding to the request
     * 
     */
    #[Override]
    public function messages()
    {
        return [
            'name.required' => 'Name is required to fill',
            'email.required' => 'Email is required to fill',
            'password.required' => 'Password is required to fill',
            'password.confirmed' => 'Password confirmation does not match',
            'email.unique' => 'Email should be unique'
        ];
    }
}
