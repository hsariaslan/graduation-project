<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
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
            'id' => apiCrypt($this->id),
            'username' => apiCrypt($this->username),
            'email' => apiCrypt($this->email),
            'name' => apiCrypt($this->name),
            'surname' => apiCrypt($this->surname),
            'role' => apiCrypt($this->role),
        ];
    }
}
