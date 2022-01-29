<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Resources\Json\JsonResource;

class SelectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        /* actions
         * 0 -> tercih iptal edilemez
         * 1 -> tercihi iptal et
         * */
        $action = 1;
        if($this->status != 0) {
            $action = 0;
        }

        return [
            'id' => $this->id,
            'project_name' => Project::findOrFail($this->project_id)->title,
            'project_deadline' => date('d.m.Y - H:i', strtotime(Project::findOrFail($this->project_id)->deadline)),
            'student' => new UserResource(User::findOrFail($this->student_id)),
            'teacher' => new UserResource(User::find($this->teacher_id)),
            'order' => $this->order,
            'status' => $this->status,
            'actions' => $action,
        ];
    }
}
