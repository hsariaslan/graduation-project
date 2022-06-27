<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssignmentRequest extends FormRequest
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
            'project_id' => ['required', 'exists:App\Models\Project,id'],
            'student_id' => ['required', 'exists:App\Models\User,id'],
            'teacher_id' => ['required', 'exists:App\Models\User,id'],
            'selection_id' => ['required', 'exists:App\Models\Selection,id'],
            'assignment_type' => ['required', 'numeric', 'min:0', 'max:10'],
        ];
    }
}
