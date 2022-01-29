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
        /* actions
         * 0 -> tercih yap
         * 1 -> tercihi iptal et
         * 2 -> daha fazla tercih yapılamaz
         * 3 -> proje başka bir öğrenci tarafından alınmış
         * 4 -> tercih bekleme aşamasını geçtiği için (hoca tercihi onayladığı için) tercih iptal edilemez
         * */
        $action = 0;
        $student = auth()->user();
        $selections = Selection::select('project_id', 'student_id', 'status')->where('student_id', $student->id)->get();

        // öğrencinin tercih sayısı 3 ise daha fazla tercih yapamaz uyarısını göster
        if(count($selections) == 3) {
            $action = 2;
        }

        foreach($selections as $selection) {
            // eğer proje öğrencinin tercih ettiği proje ise ve hoca tercihi henüz onaylamamışsa tercihi iptal etme seçeneğini göster
            if($selection->project_id == $this->id) {
                if($selection->status == 0) {
                    $action = 1;
                } else {
                    $action = 4;
                }
            }
        }

//        // eğer proje başka bir öğrencinin tercih ettiği proje ise uyarı göster
//        if($this->student_id != $student->id) {
//            $action = 3;
//        }

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
