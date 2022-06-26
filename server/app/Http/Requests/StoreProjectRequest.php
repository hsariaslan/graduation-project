<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    /**
     * Indicates if the validator should stop on the first rule failure.
     *
     * @var bool
     */
    protected $stopOnFirstFailure = true;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:App\Models\User,id'],
            'title' => ['required', Rule::unique('projects')->ignore($this->project), 'min:3', 'max:20', 'regex:/^[\w\-\s]+$/u'],
            'description' => ['required'],
            'status' => ['required', 'numeric', 'min:0', 'max:4'],
            'deadline' => ['nullable', 'date'],
            'uploads' => ['nullable'],
            'score' => ['nullable', 'integer'],
        ];
    }
}
