<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Selection;

class SelectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Selection::create([
            'project_id' => 1,
            'student_id' => 2,
            'order' => 1,
            'status' => 2,
        ]);

        Selection::create([
            'project_id' => 2,
            'student_id' => 2,
            'teacher_id' => 1,
            'order' => 2,
            'status' => 1,
        ]);

        Selection::create([
            'project_id' => 3,
            'student_id' => 2,
            'teacher_id' => 1,
            'order' => 3,
            'status' => 2,
        ]);
    }
}
