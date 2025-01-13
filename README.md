# Trucking Web App

## Index
1. [Project Setup](#project-setup)
2. [Design Choices](#design-choices)

## Project Setup
This guide explains how to set up and run the project locally.


### Get the project source files

```
git clone git@github.com:MatthieuStadelmann/conroowebapp.git
cd conroowebapp
```

### Install Dependencies

```
npm install
```

### Environment Setup
Create a .env file in the root directory and configure the following:

```
VITE_API_URL=https://timeslot-stream-ha2tva3niq-ey.a.run.app
```
### Run the Development Server
```
npm run dev
```
The app will be available at http://localhost:5173.

### Build for Production
To create a production-ready build, run:
```
npm run build
```
The build artifacts will be located in the dist/ folder.

### Preview Production Build
Before previewing, ensure you’ve run the build step. Then, to preview the production build locally:

```
npm run preview
```
The app will be available at http://localhost:4173.

## Design Choices
Here are some of the key decisions made during the development of this app:

### State Management
- Pinia was chosen to handle shared state like selected slots and real-time updates. It integrates seamlessly with Vue 3 and ensures scalability.

### Build Tooling
- Vite was used for its fast development server and optimized production builds. 

### Styling
- Tailwind CSS enabled rapid styling and a consistent design system, reducing the need for custom CSS.

### Linting, Formatting, and Git Hooks
- ESLint and Prettier were integrated to enforce code quality and consistent formatting.
- Husky was used to run pre-commit hooks, ensuring linting and formatting checks are completed before commits.

### Performance
- Minimized External Dependencies: External libraries were avoided where possible to keep the app lightweight. For example, custom date and time formatters were implemented instead of relying on additional dependencies, reducing bundle size and maintenance complexity.