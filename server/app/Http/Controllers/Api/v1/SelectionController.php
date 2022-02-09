<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSelectionRequest;
use App\Http\Requests\UpdateSelectionRequest;
use App\Http\Resources\SelectionResource;
use App\Models\Project;
use App\Models\Selection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SelectionController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $loggedUser = auth()->user();
        $selections = Selection::where('student_id', $loggedUser->id)->get();
        return SelectionResource::collection($selections);
    }

    public function store(StoreSelectionRequest $request)
    {
        $loggedUser = auth()->user();

        if($loggedUser->role == 2) {
            $selection = Selection::create([
                'project_id' => $request->project_id,
                'student_id' => $loggedUser->id,
                'order' => $request->order,
            ]);

            return new SelectionResource($selection);
        } else {
            return false;
        }
    }

    public function show(Selection $selection): SelectionResource
    {
        return new SelectionResource($selection);
    }

    public function update(UpdateSelectionRequest $request, Selection $selection): SelectionResource
    {
        $selection->project_id = $request->project_id;
        $selection->student_id = $request->student_id;
        $selection->teacher_id = $request->teacher_id;
        $selection->order = $request->order;
        $selection->status = $request->status;
        $selection->save();

        return new SelectionResource($selection);
    }

    public function destroy(Selection $selection): bool
    {
        $selection->delete();

        return true;
    }

    public function confirm(Request $request)
    {
        $loggedUser = auth()->user();

        if($loggedUser->role == 1) {
            $selection = Selection::with('project')->where('id', $request->id)->first();
            $selection->status = 1;
            $selection->project->status = 1;
            $selection->project->save();
            $selection->save();

            return response()->json([
                'project_id' => $selection->project_id,
            ]);
        } else {
            return false;
        }
    }

    public function reject(Request $request)
    {
        $loggedUser = auth()->user();

        if($loggedUser->role == 1) {
            $selection = Selection::where('id', $request->id)->first();
            $selection->status = 2;
            $selection->save();

            return response()->json([
                'project_id' => $selection->project_id,
            ]);
        } else {
            return false;
        }
    }
}
