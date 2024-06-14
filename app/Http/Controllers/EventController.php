<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Content; // Certifique-se de que este é o seu modelo de conteúdo
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class EventController extends Controller
{
    public function index(Request $request): Response
    {
       
        $contents = Content::all()->groupBy('category');
        return Inertia::render('Events/Index', [
            'contentsByCategory' => $contents,
        ]);
    }
    public function show(Request $request, $eventId): Response
    {// Convertendo o identificador UUID para um número inteiro
    $eventId = (int)Str::afterLast($eventId, '-');

    // Usando o identificador convertido na consulta
    $content_image = Content::where('category_id', $eventId)->get();
    $content = Category::where('id', $eventId)->get();

    return Inertia::render('Events/Show', [
        'event_images' => $content_image,
        'events' => $content,
    ]);
    }
}
