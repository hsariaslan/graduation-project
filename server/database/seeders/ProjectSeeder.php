<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = date('Y-m-d H:i:s');
        Project::create([
            'user_id' => 1,
            'title' => 'Deneme',
            'description' => 'Açıklama',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 1,
            'title' => 'Deneme 2',
            'description' => 'Açıklama 2',
            'status' => 1,
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 1,
            'title' => 'Deneme 3',
            'description' => 'Açıklama 3',
            'status' => 2,
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
            'uploads' => 'deneme.txt',
        ]);

        Project::create([
            'user_id' => 1,
            'title' => 'Deneme 4',
            'description' => 'Açıklama 4',
            'status' => 3,
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
            'uploads' => 'deneme2.txt',
            'score' => 90,
        ]);

        Project::create([
            'user_id' => 2,
            'title' => 'Öğrencinin Projesi',
            'description' => 'Öğrencinin Açıklaması',
            'status' => 1,
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);
    }
}
