## Allergy Management System Client

This is the client application for allergy management.

### Tools used

- `React`, `Vite`, `TypeScript`
- `Redux Toolkit`, `redux-persist` - For global state management and persistance
- `React Query` - For data fetching, mutations, cache
- `Axios` - API calling
- `Material UI (MUI)` - Component Library
- `Formik` and `Yup` - Form building and validation

### Directory Structure

```
client
├── src
│   ├── assets - App assets like images, svgs, etc.
│   ├── components - commonly used components throughout the application
│   ├── pages - all the app pages, pages are contained inside their own directories
│   ├── routes - route configs, index.tsx contains list of both private and public routes
│   ├── services - services are defined here for api calls
│   ├── store - redux store and toolkit slices are stored here
│   ├── main.tsx
│   ├── App.tsx
│   ├── config.ts - .env config export
├── index.html
├── README.md
├── .env
├── vite.config.ts
└── package.json
```

### Before Running this application

1. Run `yarn` at the top level of this project.
2. Create a `.env` file and use the `.env.example` file to add values.
3. In `client/`, run `yarn dev` to start the developement server.

### Adding a New Page

To add a new page

- Create the page component inside `pages/` inside a suitable directory.
- Add the routes inside `routes/index.tsx`. If it is a public page, add it to the public route, if you only want logged in users to access the route, add it into the private routes.

### Access Control

This project contains a `HideControl` component that when used, will only render the child component if the logged in user has an admin role.

Usage:

```javascript
<HideControl>
  <ChildComponent />
</HideControl>
```
