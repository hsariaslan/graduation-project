<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return ProjectResource::collection(Project::all());
    }

    public function store(StoreProjectRequest $request): ProjectResource
    {
        $project = Project::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'deadline' => $request->deadline,
            'uploads' => $request->uploads,
            'score' => $request->score,
        ]);

        return new ProjectResource($project);
    }

    public function show(Project $project): ProjectResource
    {
        return new ProjectResource($project);
    }

    public function update(UpdateProjectRequest $request, Project $project): ProjectResource
    {
        $project->user_id = $request->user_id;
        $project->title = $request->user_id;
        $project->description = $request->description;
        $project->status = $request->status;
        $project->deadline = $request->deadline;
        $project->uploads = $request->uploads;
        $project->score = $request->score;
        $project->save();

        return new ProjectResource($project);
    }

    public function destroy(Project $project): bool
    {
        $project->delete();

        return true;
    }
}
