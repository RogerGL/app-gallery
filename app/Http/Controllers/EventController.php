<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Content; // Certifique-se de que este é o seu modelo de conteúdo
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

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
    {
        $content_image = Content::where('category_id', $eventId)->get();
        $content = Category::where('id', $eventId)->get();
        return Inertia::render('Events/Show', [
            'event_images' => $content_image,
            'events' => $content,
        ]);
    }
}
