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
            'title' => 'Kriptoloji Projesi 1',
            'description' => 'Kriptoloji Projesi Açıklaması 1',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 1,
            'title' => 'Kriptoloji Projesi 2',
            'description' => 'Kriptoloji Projesi Açıklaması 2',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 1,
            'title' => 'Bilgi Güvenliği Projesi 4',
            'description' => 'Bilgi Güvenliği Açıklaması 3',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 2,
            'title' => 'Mikroişlemci Projesi 1',
            'description' => 'Mikroişlemci Projesi Açıklaması 1',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 2,
            'title' => 'Mikroişlemci Projesi 2',
            'description' => 'Mikroişlemci Projesi Açıklaması 2',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 2,
            'title' => 'Mikroişlemci Projesi 3',
            'description' => 'Mikroişlemci Projesi Açıklaması 3',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 3,
            'title' => 'Görüntü İşleme Projesi 1',
            'description' => 'Görüntü İşleme Projesi Açıklaması 1',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 3,
            'title' => 'Görüntü İşleme Projesi 2',
            'description' => 'Görüntü İşleme Projesi Açıklaması 2',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 3,
            'title' => 'Görüntü İşleme Projesi 3',
            'description' => 'Görüntü İşleme Projesi Açıklaması 3',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 4,
            'title' => 'Yazılım Test Projesi 1',
            'description' => 'Yazılım Test Projesi Açıklaması 1',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 4,
            'title' => 'Yazılım Test Projesi 2',
            'description' => 'Yazılım Test Projesi Açıklaması 2',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 4,
            'title' => 'Yazılım Test Projesi 3',
            'description' => 'Yazılım Test Projesi Açıklaması 3',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 5,
            'title' => 'Web Projesi 1',
            'description' => 'Web Projesi Açıklaması 1',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 5,
            'title' => 'Web Projesi 2',
            'description' => 'Web Projesi Açıklaması 2',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 5,
            'title' => 'Web Projesi 3',
            'description' => 'Web Projesi Açıklaması 3',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 6,
            'title' => 'Veritabanı Projesi 1',
            'description' => 'Veritabanı Projesi Açıklaması 1',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 6,
            'title' => 'Veritabanı Projesi 2',
            'description' => 'Veritabanı Projesi Açıklaması 2',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 6,
            'title' => 'Veritabanı Projesi 3',
            'description' => 'Veritabanı Projesi Açıklaması 3',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 7,
            'title' => 'Bilgi Güvenliği Projesi 1',
            'description' => 'Bilgi Güvenliği Projesi Açıklaması 1',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 7,
            'title' => 'Bilgi Güvenliği Projesi 2',
            'description' => 'Bilgi Güvenliği Projesi Açıklaması 2',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 7,
            'title' => 'Bilgi Güvenliği Projesi 3',
            'description' => 'Bilgi Güvenliği Projesi Açıklaması 3',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 8,
            'title' => 'Yapay Zeka Projesi 1',
            'description' => 'Yapay Zeka Projesi Açıklaması 1',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 8,
            'title' => 'Yapay Zeka Projesi 2',
            'description' => 'Yapay Zeka Projesi Açıklaması 2',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);

        Project::create([
            'user_id' => 8,
            'title' => 'Yapay Zeka Projesi 3',
            'description' => 'Yapay Zeka Projesi Açıklaması 3',
            'deadline' => date('Y-m-d H:i:s', strtotime($now . ' +1 day')),
        ]);
    }
}
