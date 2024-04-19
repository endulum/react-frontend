# Fullstack Typescript - Frontend Template
A template for a TypeScript frontend. Designed to work with the [Backend Template.](https://github.com/endulum/ts-backend-template)

## Behavior
On page visit, the page makes a request to the server's `GET /login` endpoint using the stored authentication token, if it exists. If there is no token, the response indicates the absence of a token, or that the token is not valid, the app will redirect to `/login`.

Signed-out visitors may only visit the routes under the auth route wrapper, the `/signup` or `/login` routes. Once a visitor signs in through `/login`, the token provided from a successful `POST /login` response will be stored. Signed-in visitors can access any route under the index route wrapper, but will be redirected to `/` upon visiting `/signup` or `/login`.

## Technologies
- React as the framework
- Vite as the bundler
- Style enforced with ESLint ("Standard with TypeScript" and "Airbnb")
