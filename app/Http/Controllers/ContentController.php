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
    $existingContent = $contents->first(function ($content) use ($request) {
        return $content->user_id === auth()->id() && $content->category_id == $request->category;
    });

    return Inertia::render('Contents/Create', [
        'categories' => $categories,
        'contents' => $contents,
        'predefinedCategoryId' => $request->category,
        'existingContent' => $existingContent,
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
    // Validação dos dados
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'category_id' => 'required|exists:categories,id',
        'description' => 'nullable|string',
        'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validação da imagem
    ]);

    // Verificação e upload da imagem
    if ($request->hasFile('img')) {
        
        // Deletando a imagem antiga, se houver
        if ($content->img) {
            Storage::disk('public')->delete($content->img);
        }

        // Salvando a nova imagem e adicionando ao array de dados validados
        $filePath = $request->file('img')->store('images', 'public');
        $validatedData['img'] = $filePath;
    }

    // Atualizando o conteúdo com os dados validados
    $content->update($validatedData);

    // Redirecionando com uma mensagem de sucesso
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
