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
Run this command to create the .env file:

```bash
touch .env
```

Then configure the following in the .env file:

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

### Testing
To run the tests, run:
```
npm test
```

## Design Choices
Here are some of the key decisions made during the development of this app:

### Build Tooling
- Vite was used for its fast development server and optimized production builds. 

### State Management
- Pinia was chosen to handle shared state like selected slots and real-time updates. It integrates seamlessly with Vue 3 and ensures scalability.

### Performance
- Minimized External Dependencies: External libraries were avoided where possible to keep the app lightweight.
- Optimized SSE updates using Vue's reactivity system to batch rapid changes and minimize re-renders

### Testing Strategy
- Focused on core application logic first:
  1. **SSE Connection**: Tests real-time update handling and reconnection logic
  2. **Store Management**: Validates time slot updates and state transitions
  3. **Data Flow**: Ensures correct handling of incoming SSE events
- UI components testing planned for later phases

### Styling
- Tailwind CSS enabled rapid styling and a consistent design system, reducing the need for custom CSS.

### Linting, Formatting, and Git Hooks
- ESLint and Prettier were integrated to enforce code quality and consistent formatting.
- Husky was used to run pre-commit hooks, ensuring linting and formatting checks are completed before commits.