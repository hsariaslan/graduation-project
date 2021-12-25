<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Assignment;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Assignment::create([
            'project_id' => 2,
            'student_id' => 2,
            'teacher_id' => 1,
            'selection_id' => 2,
        ]);
    }
}
