<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'email'     => 'fucar@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Ferhat',
            'surname'   => 'Uçar',
            'role'      => 1,
        ]);

        User::create([
            'email'     => 'iturkoglu@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'İbrahim',
            'surname'   => 'Türkoğlu',
            'role'      => 1,
        ]);

        User::create([
            'email'     => 'enginavci@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Engin',
            'surname'   => 'Avcı',
            'role'      => 1,
        ]);

        User::create([
            'email'     => 'rdas@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Resul',
            'surname'   => 'Daş',
            'role'      => 1,
        ]);

        User::create([
            'email'     => 'etanyildizi@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Erkan',
            'surname'   => 'Tanyıldızı',
            'role'      => 1,
        ]);

        User::create([
            'email'     => 'mkarabatak@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Murat',
            'surname'   => 'Karabatak',
            'role'      => 1,
        ]);

        User::create([
            'email'     => 'mbaykara@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Muhammet',
            'surname'   => 'Baykara',
            'role'      => 1,
        ]);

        User::create([
            'email'     => 'malek@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Malek',
            'surname'   => 'Harbawi',
            'role'      => 1,
        ]);

        User::create([
            'email'     => '16541512@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Hakan',
            'surname'   => 'Sarıaslan',
            'role'      => 2,
            'number'    => '16541512',
        ]);

        User::create([
            'email'     => '16541513@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Hasan',
            'surname'   => 'Topuz',
            'role'      => 2,
            'number'    => '16541513',
        ]);

        User::create([
            'email'     => '18541513@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Kamil',
            'surname'   => 'Taşkıran',
            'role'      => 2,
            'number'    => '18541513',
        ]);

        User::create([
            'email'     => '18542613@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Hatice',
            'surname'   => 'Eyşan',
            'role'      => 2,
            'number'    => '18542613',
        ]);

        User::create([
            'email'     => '18542813@firat.edu.tr',
            'password'  =>  Hash::make('123456'),
            'name'      => 'Nursel',
            'surname'   => 'Gülseren',
            'role'      => 2,
            'number'    => '18542813',
        ]);
    }
}
