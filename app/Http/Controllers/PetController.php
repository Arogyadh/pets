<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PetController extends Controller
{
    public function index()
    {
        $pets = Pet::with('category')->get();
        return Inertia::render('Pets/Index', ['pets' => $pets]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Pets/Form', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'breed' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'category_id' => 'integer|required|exists:categories,id',
            'description' => 'required|string|max:500',
            'image' => 'nullable|image',
        ]);
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('pets', 's3');
            $validatedData['image'] = Storage::disk('s3')->url($imagePath);
        }
        Pet::create($validatedData);
        return redirect()->route('dashboard');
    }

    public function show($id)
    {
        $pet = Pet::findOrFail($id)::with('category')->first();
        return Inertia::render('Pets/Show', ['pet' => $pet]);
    }

    public function edit($id)
    {
        $categories = Category::all();
        $pet = Pet::findOrFail($id)::with('category')->first();
        return Inertia::render('Pets/Form', ['pet' => $pet, 'categories' => $categories]);
    }

    public function update(Request $request, Pet $pet)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'breed' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'category_id' => 'integer|required|exists:categories,id',
            'description' => 'required|string|max:500',
            'image' => 'nullable|image|max:2048',
        ]);
        if ($request->hasFile('image')) {
            // Delete old image
            if ($pet->image) {
                Storage::disk('s3')->delete(parse_url($pet->image, PHP_URL_PATH));
            }
            $imagePath = $request->file('image')->store('public/pets');
            $validatedData['image'] = Storage::disk('s3')->url($imagePath);
        }
        $pet->update($validatedData);
        return redirect()->route('pets.index');
    }

    public function destroy($id)
    {
        $pet = Pet::findOrFail($id);
        $pet->delete();
        return redirect()->route('pets.index');
    }
}
