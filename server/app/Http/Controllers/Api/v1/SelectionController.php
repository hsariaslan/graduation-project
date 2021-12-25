<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSelectionRequest;
use App\Http\Requests\UpdateSelectionRequest;
use App\Http\Resources\SelectionResource;
use App\Models\Selection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SelectionController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return SelectionResource::collection(Selection::all());
    }

    public function store(StoreSelectionRequest $request): SelectionResource
    {
        $selection = Selection::create([
            'project_id' => $request->project_id,
            'student_id' => $request->student_id,
            'teacher_id' => $request->teacher_id,
            'order' => $request->order,
            'status' => $request->status,
        ]);

        return new SelectionResource($selection);
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
}
