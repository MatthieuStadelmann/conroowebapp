# Trucking Web App

## Getting Started
This guide explains how to set up and run the project locally.

## Project Setup

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
