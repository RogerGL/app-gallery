<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Categories/Index', [
            'categories' => Category::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'nullable|string',
        ]);

        Category::create([
            'name' => $request->input('name'),
            'desc' => $request->input('desc'),
        ]);

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'nullable|string',
        ]);

        $category->update([
            'name' => $request->input('name'),
            'desc' => $request->input('desc'),
        ]);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    public function delete(Request $request): RedirectResponse
    {
        Category::find($request->category)->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}
