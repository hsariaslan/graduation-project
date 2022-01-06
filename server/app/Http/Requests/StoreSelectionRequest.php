<?php

namespace App\Http\Requests;

use App\Models\Project;
use App\Models\Selection;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreSelectionRequest extends FormRequest
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
            'teacher_id' => ['nullable', 'exists:App\Models\User,id'],
            'order' => ['nullable', 'numeric', 'min:0', 'max:4'],
            'status' => ['nullable', 'numeric', 'min:0', 'max:10'],
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $project = Project::select('user_id')->where('id', $this->project_id)->first();
        $owner = User::select('role')->where('id', $project->user_id)->first();
        $owner->role == 1 ? $teacherId = $owner->id : $teacherId = null;
        $student = auth()->user();
        $order = 1;
        $selection = Selection::select('order')->where('student_id', $student->id)->orderBy('order', 'desc')->first();
        if (!is_null($selection)) {
            $selection->order < 3 ? $order = $selection->order + 1 : $order = null;
        }

        $this->merge([
            'student_id' => $student->id,
            'teacher_id' => $teacherId,
            'order' => $order,
        ]);
    }
}
