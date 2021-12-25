<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();
        DB::table('projects')->truncate();
        DB::table('selections')->truncate();
        DB::table('assignments')->truncate();
        Schema::enableForeignKeyConstraints();

        $this->call(UserSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(SelectionSeeder::class);
        $this->call(AssignmentSeeder::class);
    }
}
