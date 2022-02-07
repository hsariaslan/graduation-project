<?php

namespace App\Http\Resources;

use App\Models\Project;
use App\Models\User;
use App\Models\Selection;
use Illuminate\Http\Resources\Json\JsonResource;

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
        /* actions
         * 0 -> tercih yap
         * 1 -> tercihi iptal et
         * 2 -> daha fazla tercih yapılamaz
         * 3 -> proje başka bir öğrenci tarafından alınmış
         * 4 -> tercih bekleme aşamasını geçtiği için (hoca tercihi onayladığı için) tercih iptal edilemez
         * */
        $action = 0;
        $loggedUser = auth()->user();
        $project = Project::with(['user', 'selections'])->where('id', $this->id)->first();
        $studentSelectionsCount = Selection::where('student_id', $loggedUser->id)->count();

        // öğrencinin tercih sayısı 3 ise daha fazla tercih yapamaz uyarısını göster
        if($studentSelectionsCount == 3) {
            $action = 2;
        }

        foreach($project->selections as $selection) {
            // eğer proje öğrencinin tercih ettiği proje ise ve hoca tercihi henüz onaylamamışsa tercihi iptal etme seçeneğini göster
            if($selection->student_id == $loggedUser->id) {
                if($selection->status == 0) {
                    $action = 1;
                } else {
                    $action = 4;
                }
            } elseif(in_array($selection->status, [1, 4, 6])) {
                $action = 3;
            }
        }

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
            'actions' => $action,
        ];
    }
}
