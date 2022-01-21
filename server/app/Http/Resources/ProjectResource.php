<?php

namespace App\Http\Resources;

use App\Models\Selection;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $student = auth()->user();
        $action = 1;
        $selections = Selection::select('project_id')->where('student_id', $student->id)->get();
        if(count($selections) == 3) {
            $action = 2;
        }

        foreach($selections as $selection) {
            if($selection->project_id == $this->id) {
                $action = 0;
            }
        }

        return [
            'id' => $this->id,
            'user' => new UserResource(User::findOrFail($this->user_id)),
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'deadline' => date('d.m.Y - H:i', strtotime($this->deadline)),
            'uploads' => $this->uploads,
            'score' => $this->score,
            'actions' => $action,
        ];
    }
}
