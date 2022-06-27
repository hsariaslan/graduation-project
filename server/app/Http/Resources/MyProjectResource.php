<?php

namespace App\Http\Resources;

use App\Models\Project;
use App\Models\Selection;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class MyProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $project = Project::with('selections')->where('id', $this->id)->first();

        return [
            'id' => $this->id,
            'user' => new UserResource(User::findOrFail($this->user_id)),
            'title' => $this->title,
            'selection_count' => $project->selections->count(),
            'description' => $this->description,
            'status' => $this->status,
            'deadline' => date('d.m.Y - H:i', strtotime($this->deadline)),
            'uploads' => $this->uploads,
            'score' => $this->score,
        ];
    }
}
