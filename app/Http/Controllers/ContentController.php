<?php
namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Content;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Contents/Index', [
            'contents' => Content::all(),
        ]);
    }

    public function create(Request $request): Response
{
    $categories = Category::all();
    $contents = Content::all();
    return Inertia::render('Contents/Create', [
        'categories' => $categories,
        'contents' => $contents,
        'predefinedCategoryId' => $request->category,
    ]);
}

    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:1048', // Validando o campo de imagem
        ]);

        if ($request->hasFile('img')) {
            $filePath = $request->file('img')->store('images', 'public'); // Salvando a imagem no storage
            $validatedData['img'] = $filePath;
        }
        $content = new Content();
        $content->fill($validatedData);
        $content->user_id = auth()->id();
        $content->save();

        return redirect()->route('contents.index')->with('success', 'Content created successfully.');
    }

    public function edit(Content $content): Response
    {
        return Inertia::render('Contents/Edit', [
            'content' => $content,
        ]);
    }

    public function update(Request $request, Content $content): RedirectResponse
    {
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validando o campo de imagem
        ]);
        
        if ($request->hasFile('img')) {
            // Deletando a imagem antiga, se houver
            if ($content->img) {
                Storage::disk('public')->delete($content->img);
            }
            $filePath = $request->file('img')->store('images', 'public'); // Salvando a nova imagem
            $validatedData['img'] = $filePath;
        }
       
        $content->update($validatedData);
       
        return redirect()->route('contents.index')->with('success', 'Content updated successfully.');
    }

    public function delete(Request $request): RedirectResponse
    {
        $content = Content::findOrFail($request->content);
        
        if ($content->img) {
            Storage::disk('public')->delete($content->img);
        }

        $content->delete();

        return redirect()->route('contents.index')->with('success', 'Content deleted successfully.');
    }
}
