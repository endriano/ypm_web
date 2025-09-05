# YPMARINAS - Maritime Construction Company Website

## Overview

YPMARINAS is a modern full-stack web application for a maritime construction company with over 25 years of experience. Built with React, Express, and PostgreSQL, the application features a multilingual (Spanish, English, French) corporate website with both light and dark themes. The platform showcases the company's services, projects, products, and news while providing contact functionality and administrative capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend follows a component-based React architecture using TypeScript and modern tooling:

- **Build System**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI components
- **Routing**: Wouter for client-side routing with clean URL structure
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Animations**: Framer Motion for smooth transitions and interactive elements
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Internationalization**: i18next for multilingual support (ES/EN/FR)
- **Theme System**: Custom React context for light/dark mode with localStorage persistence

### Backend Architecture
The backend uses Express.js with TypeScript in a RESTful API pattern:

- **Runtime**: Node.js with ESM modules
- **Framework**: Express.js for HTTP server and middleware
- **Data Validation**: Zod schemas for request/response validation
- **Storage Layer**: Abstracted storage interface supporting both in-memory and database implementations
- **Error Handling**: Centralized error handling middleware with structured responses
- **Development**: Hot reload with TSX for rapid development

### Database Design
PostgreSQL database with Drizzle ORM for type-safe database operations:

- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Core Entities**: Users, Projects, Products, Services, News, and Contacts
- **Data Integrity**: UUID primary keys with proper foreign key constraints
- **Timestamps**: Automatic created_at timestamps for audit trails

### Component Architecture
The UI follows atomic design principles with reusable components:

- **Base Components**: shadcn/ui components for consistent design system
- **Business Components**: Custom components like AnimatedCounter, ProjectCarousel
- **Layout Components**: Navbar, Footer with responsive design
- **Page Components**: Full page components for each route

### Authentication & Security
Currently implements basic structure for future authentication:

- **User Schema**: Ready for authentication implementation
- **Session Management**: Infrastructure prepared for session-based auth
- **Input Validation**: Zod schemas prevent malformed data

### Performance Optimizations
- **Lazy Loading**: Image optimization and lazy loading for heavy content
- **Caching**: React Query for intelligent data caching and synchronization
- **Code Splitting**: Route-based code splitting for optimal bundle sizes
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL with connection pooling via `@neondatabase/serverless`
- **Drizzle ORM**: Type-safe database operations and migrations

### UI Framework & Styling
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Consistent icon library

### Development & Build Tools
- **Vite**: Fast build tool with HMR and optimized production builds
- **TypeScript**: Static typing for both frontend and backend
- **ESLint/Prettier**: Code formatting and linting (configured)

### Animation & Interaction
- **Framer Motion**: Animation library for smooth transitions and gestures
- **Embla Carousel**: Touch-friendly carousel component

### Form Handling
- **React Hook Form**: Performant forms with minimal re-renders
- **Hookform Resolvers**: Integration with Zod for validation

### Internationalization
- **i18next**: Feature-rich i18n framework
- **react-i18next**: React bindings for i18next

### HTTP & Data Fetching
- **TanStack Query**: Powerful data synchronization and caching
- **Native Fetch**: Modern HTTP client with custom wrapper for API requests

### Utilities
- **date-fns**: Modern date utility library
- **clsx**: Utility for constructing className strings conditionally
- **class-variance-authority**: For building type-safe component variants