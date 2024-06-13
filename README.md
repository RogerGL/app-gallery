# APP Gallery

System with login validation and user levels for content creation -> images and their categories can be "events," dynamically creating a gallery of photos/images of the events.

![CaseHTTP.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f9488f81-a44f-4503-acba-ef91cbac6759/9e547c17-f000-44f6-9d21-04ecd9f7a03b/CaseHTTP.png)
----------------------------------------------------------------------------------
![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f9488f81-a44f-4503-acba-ef91cbac6759/c65bbd7f-7bd4-4dd7-b5c6-b4743ad3a373/Untitled.png)
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
- Run application (`npm run dev`);

- Test it!  (http://localhost:8000/)
