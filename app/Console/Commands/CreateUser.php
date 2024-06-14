<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new user with predefined values';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Predefined values
        $name = 'Moderator User';
        $email = 'mod@example.com';
        $password = 'modmod'; // You might want to hash it before or during creation
        $level = 2;

        // Create the user
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'level' => $level, // Assuming you have this column in your users table
        ]);

        if ($user) {
            $this->info('User created successfully.');
            $this->info("Email: {$user->email}");
            $this->info("Password: {$password}");
        } else {
            $this->error('Failed to create user.');
        }

        return 0;
    }
}
