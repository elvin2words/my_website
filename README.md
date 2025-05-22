# Elvin Mazwimairi Portfolio Site

## Overview

This project is a personal portfolio website for Elvin Mazwimairi, showcasing different aspects of his professional identity. It's built as a single-page application with React on the frontend and a minimal Express backend. The site has multiple sections that represent different facets of the individual's identity: Electrical Engineer, Systems Developer, Artistic Designer, Technopreneur, and Human Being.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern web application architecture:

1. **Frontend** : React-based single-page application with TypeScript

* Uses Wouter for client-side routing
* Tailwind CSS for styling with shadcn/ui components
* React Query for data fetching

1. **Backend** : Minimal Express.js server

* Serves the static frontend files
* Provides basic API endpoints
* Currently using in-memory storage, with infrastructure for database integration

1. **Database** :

* Drizzle ORM is set up but not fully implemented
* Database schema is defined in `shared/schema.ts`
* Ready for PostgreSQL integration

1. **Deployment** :

* Configuration for Replit deployment via the `.replit` file
* Set up to build the frontend and serve it from the backend

## Key Components

### Frontend

1. **Routing System** :

* Uses Wouter for lightweight client-side routing
* Routes defined in `App.tsx` for different identity sections

1. **UI Components** :

* Comprehensive set of UI components from shadcn/ui
* Custom components for specific portfolio features
* Responsive design for different screen sizes

1. **State Management** :

* Uses React Query for server state
* Custom context providers for specific functionality (e.g., DragContext)

1. **Pages** :

* Home page with identity overview
* Separate pages for each identity aspect (Engineer, Developer, Designer, etc.)

### Backend

1. **Server** :

* Express.js based server (`server/index.ts`)
* Serves the static frontend files
* Minimal API routes

1. **Storage** :

* Current implementation uses in-memory storage (`MemStorage` class)
* Structured to easily swap with database storage

1. **Schema** :

* Defined using Drizzle ORM in `shared/schema.ts`
* Currently includes a basic user schema

## Data Flow

1. **Client Initialization** :

* React app loads and initializes routing
* Components fetch any necessary data via React Query

1. **API Interactions** :

* Frontend makes requests to backend API endpoints
* `apiRequest` utility handles request formatting and error checking

1. **Authentication** (currently minimal):
   * Basic user schema is defined but not fully implemented
   * Infrastructure exists to expand authentication
2. **Server-Side Processing** :

* Express routes handle API requests
* Currently, most functionality is static content serving

## External Dependencies

### Frontend Dependencies

* React and React DOM for UI rendering
* Wouter for client-side routing
* Tailwind CSS and shadcn/ui components for styling
* React Query for data fetching
* Lucide React for icons
* Radix UI components for accessible UI elements

### Backend Dependencies

* Express for server functionality
* Drizzle ORM for database interactions

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Development Mode** :

* Run with `npm run dev` to start both frontend and backend in development mode
* Vite manages hot reloading and development features

1. **Production Build** :

* Frontend is built with Vite
* Backend is compiled with esbuild
* Combined into a single distributable

1. **Replit-Specific Configuration** :

* `.replit` file defines run commands and module requirements
* Uses Node.js 20, web module, and prepares for PostgreSQL

1. **Database Deployment** :

* Schema is ready for PostgreSQL integration
* Uses Drizzle ORM for database access
* Designed to work with Neon Serverless PostgreSQL

## Future Enhancements

1. **Database Integration** :

* Complete PostgreSQL integration with Drizzle ORM
* Implement proper persistence for any dynamic content

1. **Authentication** :

* Expand user authentication if needed for admin functionality
* Implement session management

1. **Content Management** :

* Add ability to update portfolio content dynamically
* Implement admin interface for content management
