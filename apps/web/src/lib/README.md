# Application Logic & Lib Layer (`apps/web/src/lib`)

The `lib` directory serves as the essential utility engine for the Respondo web application. It houses the lightweight, client-oriented helpers and state management logic that drive the app's interactive experience. This layer is governed by a strict design rule: code here remains app-specific and lightweight; once a utility demonstrates cross-package utility, it is graduated to a shared package.

---

## 🏗 The Layered Architecture

This folder is organized into specialized sub-modules, each handling a specific aspect of the client-side lifecycle:

### 1. Store Layer (`/store`)

We utilize **Zustand** to manage local UI state. These stores are intentionally scoped to the web app, focusing on user interface preferences rather than complex business logic.

- **`sidebarStore.ts`**: Responsible for persisting the sidebar's collapse state. By storing this preference, we ensure the protected shell respects the user's layout choice across page refreshes and sessions.
- **`confirmStore.ts`**: The brain of our global confirmation system. It manages the state for the central dialog, including titles, descriptions, visual variants, optional verification text, and the executable callback for confirmed actions.

### 2. Validation Layer (`/validations`)

Data integrity begins at the entry point. This layer uses **Zod** to define the "schemas of truth" for our user-facing forms.

- **`auth.ts`**: Houses the `loginSchema` and `signupSchema`.
- **Integrity Enforcement**: Beyond basic format checks, the signup schema enforces critical logic like password confirmation.
- **Consistency**: Keeping these schemas close to the forms ensures that error messages remain consistent between the UI and any secondary server-side validation checks.

### 3. Notification Layer (`/notify`)

The `notify` module is a sophisticated wrapper around our shared toast primitives from `@repo/ui`. It provides a clean, type-safe API for triggering feedback throughout the application.

- **Custom Variants**: We've extended standard feedback to include `success`, `error`, `warning`, and a specialized `ai` variant for RAG-related updates.
- **Standardized Duration**: Most notifications default to a **3000ms** lifecycle, ensuring they are visible but non-intrusive.
- **Promise Handling**: The `notify.promise` utility allows us to bind toast states directly to asynchronous actions, automatically transitioning from a `loading` state to `success` or `error` based on the promise resolution.

---

## 🎯 Why This Layer Matters

By centralizing these "moving parts"—state, validation, and feedback—the Respondo web app remains easier to reason about and maintain. This structure allows developers to update form rules or UI behaviors in one location, with changes propagating instantly across the entire authenticated and unauthenticated experience.
