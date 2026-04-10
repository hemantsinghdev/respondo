# Web Application Deep-Dive (`apps/web`)

The `apps/web` directory serves as the primary interface for Respondo. Built with **Next.js**, this application orchestrates the user experience by stitching together shared packages into a cohesive SaaS platform. It handles everything from top-of-funnel marketing to the complex, state-heavy logic of the authenticated dashboard.

---

## 🏗 Route Architecture

To maintain a clean separation of concerns, the application is organized into three distinct route groups, each serving a specific phase of the user journey:

### 1. Marketing `(marketing)`

This is the public-facing presentation layer. Its primary objective is to communicate the value proposition of Respondo and convert visitors into users.

- **Focus:** SEO, performance, and clear Calls to Action (CTAs).
- **Access:** Open to all visitors.

### 2. Authentication `(auth)`

A dedicated environment for the login and signup experience.

- **Focus:** Low-friction entry, secure credential handling, and social provider integration via Google and GitHub.
- **Validation:** Utilizes strict Zod schemas to ensure data integrity before reaching the authentication server.

### 3. Main Workspace `(main)`

The heart of the CRM. This protected group houses the dashboard, ticketing system, and customer profiles.

- **Shell:** Mounts the global sidebar, the command palette, and the centralized notification/toast system.
- **Guardrails:** Enforces session requirements and handles the UI state for authenticated operations.

---

## 🛡 Security & Routing: `proxy.ts`

The `proxy.ts` file acts as the application's traffic controller. It leverages Next.js Middleware patterns to enforce access rules efficiently without adding unnecessary latency to the request-response cycle.

- **Token-Based Logic:** To ensure maximum performance, the proxy performs a high-speed check for the presence of a session cookie rather than a full database session validation at the edge.
- **Redirection Strategy:**
  - **Authenticated Users:** Automatically redirected from public landing pages or auth screens to `/dashboard` to get them straight to work.
  - **Unauthenticated Users:** Gracefully bounced from protected routes back to `/login` to secure the organization's data.
- **Exclusion Rules:** The matcher is carefully configured to ignore internal auth APIs (`/api/auth`), static assets (`_next/`), and branding files to prevent infinite redirect loops.

---

## ⚙️ Environment Configuration

The `apps/web` directory requires a `.env` file to manage sensitive credentials and environment-specific URLs. These variables are categorized by their scope:

| Category     | Variable                  | Description                                         |
| :----------- | :------------------------ | :-------------------------------------------------- |
| **URLs**     | `APP_URL`                 | The internal base URL for the application.          |
| **Public**   | `NEXT_PUBLIC_APP_URL`     | Client-side accessible URL for browser-based logic. |
| **Database** | `DATABASE_URL`            | Connection string for the Prisma client.            |
| **Auth**     | `BETTER_AUTH_SECRET`      | Secret key for session encryption.                  |
| **GitHub**   | `GITHUB_CLIENT_ID/SECRET` | OAuth credentials for GitHub integration.           |
| **Google**   | `GOOGLE_CLIENT_ID/SECRET` | OAuth credentials for Google integration.           |

---

## 🧠 State & Validation

### Client-Side Store (Zustand)

Respondo utilizes **Zustand** for lightweight, performant state management. Unlike heavier alternatives, Zustand allows us to manage global UI states—such as the sidebar’s toggle position, the visibility of the command palette (Ctrl+K), and the queue for the central confirmation dialogs—with minimal boilerplate and zero unnecessary re-renders.

### Schema Validation (Zod)

Integrity is non-negotiable. We use **Zod** across the web app to define "schemas of truth" for:

- **Form Inputs:** Validating login, signup, and ticket creation data on the client side.
- **API Payloads:** Ensuring that data sent to the backend adheres to expected structures, reducing the surface area for runtime errors.

---

## 📂 Internal Directory Map

- `app/` — Contains the Next.js App Router structure and layouts.
- `components/` — Houses local UI components and form helpers specific to the web app.
- `lib/notify/` — A specialized wrapper around the shared toast system for consistent feedback.
- `lib/store/` — Home to our Zustand slices for UI and command center state.
- `lib/validations/` — Central repository for all Zod schemas.

---

## 🔌 Technical Architecture & Dependencies

The web app is designed to be "thin," relying on the internal monorepo packages and standardized aliases to maintain a clean codebase.

### Path Aliasing

The application uses the **`@app/*`** alias to reference the `src/*` directory. This ensures that imports remain clean, avoids deeply nested relative paths (e.g., `../../../`), and ensures refactoring remains painless as the codebase scales.

### Shared Dependencies

Core logic is imported from the following internal packages:

- **`@repo/auth`**: Orchestrates session management and identity.
- **`@repo/db`**: Provides the shared Prisma client for database operations.
- **`@repo/ui`**: Supplies the building blocks—buttons, dialogs, and icons—to ensure visual consistency.

---

## 🛠 Extension Roadmap

As Respondo grows, the `apps/web` layer will be expanded in the following areas:

- **Advanced Analytics:** Building out detailed KPI dashboards using data visualization primitives.
- **Ticketing Enhancements:** Implementing real-time updates and more granular filtering in the `(main)` workspace.
- **Settings & Customization:** Developing a comprehensive account and organization settings suite under the command center.
