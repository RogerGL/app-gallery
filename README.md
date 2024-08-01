# APP Gallery

System with login validation and user levels for content creation -> images and their categories can be "events," dynamically creating a gallery of photos/images of the events.

----------------------------------------------------------------------------------
<img width="710" alt="caseDB" src="https://github.com/RogerGL/app-galery/assets/86247840/c7b2acd0-02eb-4785-8d1b-6d237e876410">

## Requisites

- Docker;
- Node.js;

## Setup

- Clone the repository;
- Install dependencies (`npm install`);
- Setup PostgreSQL and PHP/Apache (`docker compose up -d`);
- Abble the images (`docker compose exec app php artisan storage:link`)
- Run migrations (`docker compose exec app php artisan migrate`)
- Copy `.env.example` file (`cp .env.example .env`);
- Generate Key Crip (`docker compose exec app php artisan key:generate`)
- Run command make:user (`docker compose exec app php artisan make:user`);
- Run application (`npm run dev`);

- Test it!  (http://localhost:8000/)
