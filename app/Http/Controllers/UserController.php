<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    public function edit($id, Request $request)
    {
        try {
            $roles = $request->role_id;
            $user = User::findOrFail($id);
            $user->roles()->sync($roles);

            return Inertia::render('Users/Edit', ['user' => $user]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Error updating user roles.']);
        }
    }

}