<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Http\Resources\AssignmentResource;
use App\Models\Assignment;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AssignmentController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return AssignmentResource::collection(Assignment::all());
    }

    public function store(StoreAssignmentRequest $request): AssignmentResource
    {
        $assignment = Assignment::create([
            'project_id' => $request->project_id,
            'student_id' => $request->student_id,
            'teacher_id' => $request->teacher_id,
            'selection_id' => $request->selection_id,
            'assignment_type' => $request->assignment_type,
        ]);

        return new AssignmentResource($assignment);
    }

    public function show(Assignment $assignment): AssignmentResource
    {
        return new AssignmentResource($assignment);
    }

    public function update(UpdateAssignmentRequest $request, Assignment $assignment): AssignmentResource
    {
        $assignment->project_id = $request->project_id;
        $assignment->student_id = $request->student_id;
        $assignment->teacher_id = $request->teacher_id;
        $assignment->selection_id = $request->selection_id;
        $assignment->assignment_type = $request->assignment_type;
        $assignment->save();

        return new AssignmentResource($assignment);
    }

    public function destroy(Assignment $assignment): bool
    {
        $assignment->delete();

        return true;
    }
}
