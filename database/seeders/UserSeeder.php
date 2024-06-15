<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'first_name' => 'admin',
            'last_name' => 'admin' ,
            'username'=> 'admin',
            'email'=>'admin@admin.com',
            'password'=> Hash::make('password'),
          ]);

        $role = Role::where('name', 'admin')->get();
        $user->roles()->sync($role);
    }
}
