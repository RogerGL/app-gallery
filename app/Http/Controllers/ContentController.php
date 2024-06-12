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
        $contents = Content::with('category','user')->get();
        
        return Inertia::render('Contents/Index', [
        'contents' => $contents,
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
        \Log::info('Dados recebidos para atualização', $request->all());
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:1048', // Validando o campo de imagem
        ]);
        \Log::info('Dados validados', $validatedData);
        if ($request->hasFile('img')) {
            $filePath = $request->file('img')->store('images', 'public'); // Salvando a imagem no storage
            $validatedData['img'] = $filePath;
            \Log::info('Imagem recebida para upload');
        }
        $content = new Content();
        $content->fill($validatedData);
        $content->user_id = auth()->id();
        $content->save();

        return redirect()->route('contents.index')->with('success', 'Content created successfully.');
    }

    public function edit(Content $content): Response
{
        $categories = Category::all();

        return Inertia::render('Contents/Edit', [
            'categories' => $categories,
            'content' => $content,
        ]);
}


public function update(Request $request, Content $content): RedirectResponse
{
    if ($request->has('_method') && $request->_method === 'put') {
        \Log::info('Dados recebidos para atualização', $request->all());

        // Validação dos dados
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1048', // Validando o campo de imagem
        ]);

        \Log::info('Dados validados', $validatedData);

        // Verificação e upload da imagem
        if ($request->hasFile('img')) {
            \Log::info('Imagem recebida para upload');
            
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

    // Se não for um método PUT, redirecione de volta
    return redirect()->back();
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
