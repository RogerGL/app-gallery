<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Content;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ContentController extends Controller
{
    public function index(): Response
    {
        $contents = Content::all();
        return Inertia::render('Contents/Index', compact('contents'));
    }

    public function create(): Response
    {
        return Inertia::render('Contents/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'img' => 'nullable|string',
        ]);

        Content::create($request->all());

        return redirect()->route('contents.index')
            ->with('success', 'Content created successfully.');
    }

    public function edit(Content $content): Response
    {
        return Inertia::render('Contents/Edit', compact('content'));
    }

    public function update(Request $request, Content $content): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'img' => 'nullable|string',
        ]);

        $content->update($request->all());

        return redirect()->route('contents.index')
            ->with('success', 'Content updated successfully.');
    }

    public function destroy(Content $content): RedirectResponse
    {
        $content->delete();

        return redirect()->route('contents.index')
            ->with('success', 'Content deleted successfully.');
    }
}
