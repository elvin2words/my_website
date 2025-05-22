This is a personal portfolio website built as a modern full-stack application. Here's the comprehensive breakdown:

**Architecture**

* Frontend: React with TypeScript, using Vite as the build tool
* Backend: Express.js server with TypeScript
* Database: Prepared for PostgreSQL with Drizzle ORM
* Styling: Tailwind CSS with shadcn/ui components

**Project Structure**

1. **Frontend (`/client`)**
   * Uses a component-based architecture with pages for different identities:
     * Engineer: Showcases electrical engineering skills and projects
     * Developer: Highlights software development capabilities
     * Designer: Displays UI/UX and design work
     * Technopreneur: Business and entrepreneurship ventures
     * Human: Personal side and interests
   * Components are organized into:
     * UI components (shadcn/ui based)
     * Layout components (Header, Footer)
     * Home-specific components (IdentityCard, BackgroundEffect)
2. **Backend (`/server`)**
   * Express server handling API routes
   * Set up for session management and authentication
   * Configured for both development and production environments
   * Runs on port 5000 with proper bindings
3. **Shared (`/shared`)**
   * Contains database schema definitions
   * Shared types between frontend and backend

**Key Features**

1. **Interactive Home Page**
   * Dynamic background effects
   * Identity sections with smooth transitions
   * Responsive design for all screen sizes
2. **Identity Pages**
   * Each page represents a different professional aspect
   * Consistent design language with unique accent colors
   * Card-based layout showcasing skills and projects
3. **Navigation**
   * Smooth routing using Wouter
   * Mobile-responsive menu
   * Consistent back navigation

**Technical Implementation**

1. **State Management**
   * React Query for server state
   * Context API for drag interactions
   * Local state for UI components
2. **Styling System**
   * Tailwind CSS for utility-first styling
   * Custom animations and transitions
   * Consistent color theming across pages
3. **Build & Deployment**
   * Development mode with hot reloading
   * Production build process combining frontend and backend
   * Configured for Replit deployment

**Design Philosophy**

The project follows a modular, component-based architecture with clear separation of concerns. The design emphasizes:

* Clean, minimal aesthetics
* Smooth transitions and animations
* Consistent branding across sections
* Responsive and accessible interfaces

Each identity section maintains its unique character while staying within the overall design system through:

* Section-specific accent colors
* Consistent card layouts
* Unified typography
* Shared component patterns

This creates a cohesive experience while allowing each professional aspect to have its own visual identity.

The project is built to be maintainable and scalable, with clear separation between server and client code, type safety throughout, and a robust component library for consistent UI development.

---
