<?php

namespace App\Http\Controllers;

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
}
