<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Models\Project;
use App\Models\Selection;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'project' => new ProjectResource(Project::findOrFail($this->project_id)),
            'student' => new UserResource(User::findOrFail($this->student_id)),
            'teacher' => new UserResource(User::find($this->teacher_id)),
            'selection' => new SelectionResource(Selection::find($this->selection_id)),
            'assignment_type' => $this->assignment_type,
        ];
    }
}
