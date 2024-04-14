# post-manager

A simple post manager application built with Vue3, Vite, and Tailwind CSS.

The application also uses [Vue3 Popper](https://valgeirb.github.io/vue3-popper/) for popovers.

Users can create, read, update, and delete posts.

API calls are mocked using [JSON Placeholder](https://jsonplaceholder.typicode.com/). As these requests are not registered in their database, the changes are not reflected in the data. This application only notifies the user if the request was successful or unsuccessful via an alert notification.

The application is deployed on: https://vue-postmanager.netlify.app/

## Project Setup

```sh
npm install
```

### Run locally

```sh
npm run dev
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
## Notes

### With more time, I would have added the following:
- persistent storage of data using localStorage
- media queries to make the application responsive
- more features such as search, sorting, and pagination
- unit tests
