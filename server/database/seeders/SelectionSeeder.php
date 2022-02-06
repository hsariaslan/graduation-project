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
            'student_id' => 9,
            'order' => 1,
        ]);

        Selection::create([
            'project_id' => 10,
            'student_id' => 9,
            'order' => 2,
        ]);

        Selection::create([
            'project_id' => 12,
            'student_id' => 9,
            'order' => 3,
        ]);

        Selection::create([
            'project_id' => 7,
            'student_id' => 10,
            'order' => 1,
        ]);

        Selection::create([
            'project_id' => 5,
            'student_id' => 10,
            'order' => 2,
        ]);

        Selection::create([
            'project_id' => 8,
            'student_id' => 10,
            'order' => 3,
        ]);

        Selection::create([
            'project_id' => 2,
            'student_id' => 11,
            'order' => 1,
        ]);

        Selection::create([
            'project_id' => 3,
            'student_id' => 11,
            'order' => 2,
        ]);

        Selection::create([
            'project_id' => 4,
            'student_id' => 11,
            'order' => 3,
        ]);

        Selection::create([
            'project_id' => 16,
            'student_id' => 12,
            'order' => 1,
        ]);

        Selection::create([
            'project_id' => 17,
            'student_id' => 12,
            'order' => 2,
        ]);

        Selection::create([
            'project_id' => 18,
            'student_id' => 12,
            'order' => 3,
        ]);

        Selection::create([
            'project_id' => 8,
            'student_id' => 13,
            'order' => 1,
        ]);

        Selection::create([
            'project_id' => 9,
            'student_id' => 13,
            'order' => 2,
        ]);

        Selection::create([
            'project_id' => 1,
            'student_id' => 13,
            'order' => 3,
        ]);
    }
}
