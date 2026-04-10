# The Main Workspace & Dashboard (`apps/web/(main)`)

The `(main)` route group represents the core operational environment of Respondo. This is the protected engine room of the application where agents and admins manage customer relationships. Every route within this group is guarded; the system operates on the absolute requirement of a verified, active session.

---

## 🏗 Layout Responsibilities

The root layout of this group (`app/(main)/layout.tsx`) serves as the gatekeeper and the architectural shell for the authenticated experience. Its primary responsibilities include:

- **Session Verification:** Interfacing with `@repo/auth/client` to validate the user's identity upon every mount and navigation.

- **State Orchestration:** Managing the "Loading" transition state to prevent layout shift while the session is being resolved.

- **Global Provider Mounting:** Injecting the persistent UI elements that live across all internal pages, specifically the **Sidebar**, the **Global Confirmation Dialog**, and the **Toast Notification System**.

- **Visual Shell:** Applying the core dashboard styling, including the sidebar-to-content spacing and responsive layout constraints.

---

## 📄 Current Pages

- **`dashboard/page.tsx`**: The initial entry point. Currently, it serves as a foundational placeholder that establishes the visual hierarchy and design language for future KPI widgets and ticket overviews.
- **`profile/page.tsx`**: A session-backed view allowing users to see their account details. This page demonstrates how we pull live user data from the session context.
- **`profile/layout.tsx`**: A specialized sub-layout for account-related settings, allowing for nested navigation within the profile section.

---

## 🧠 Shared Client Behavior & State

The workspace relies on a "Central Command" philosophy where global UI states are managed via **Zustand** and shared components:

- **Navigation & Sidebar (`components/Sidebar.tsx`)**: Handles complex navigation logic, workspace switching, and the logout trigger. It also manages the collapse/expand state for optimized screen real estate.
- **Confirmation System (`components/confirmDialog.tsx`)**: A high-priority modal that provides a unified way to handle dangerous or critical actions (e.g., deleting a ticket or reassigning an agent).
- **Sidebar Persistence (`lib/store/sidebarStore.ts`)**: A client-side store that ensures the user’s sidebar preference (collapsed vs. expanded) persists across page refreshes.
- **Dialog Control (`lib/store/confirmStore.ts`)**: The state machine that drives the global confirmation modal, allowing any component in the app to trigger a dialog with custom titles, descriptions, and action callbacks.
- **Notification Wrapper (`lib/notify/`)**: A standardized utility that wraps the toast system, ensuring that success, error, and info alerts look and behave consistently throughout the workspace.

---

## 🔄 Session Lifecycle

1.  **Request:** Upon entering any `(main)` route, the layout requests the current session from the auth provider.
2.  **Evaluation:** \* If no session is detected, the `proxy.ts` or the layout-level check triggers a redirect to `/login`.
    - While waiting, a specialized loading skeleton or spinner is displayed to maintain a professional feel.
3.  **Hydration:** Once confirmed, the protected UI hydrates with the user's specific permissions and data.
4.  **Termination:** The logout flow clears the session cookie and local state, returning the user to the public landing page or login screen.

---

## 🚀 Future Development Roadmap

The `(main)` workspace is designed to scale into a high-density data environment. Upcoming features include:

- **Ticketing Hub:** Real-time ticket streams with advanced filtering, priority tagging, and SLA tracking.
- **AI Review Flow:** A dedicated interface for agents to review, edit, and approve RAG-generated suggestions before they reach the customer.
- **Customer & Org Views:** Deep-dive profiles showing historical interactions, common issues, and organization-wide health metrics.
- **Activity & Audit Logs:** A transparent record of all actions taken within the organization for security and performance reviews.
- **Command Palette Integration:** Full implementation of `Ctrl+K` to allow instant navigation and action execution from anywhere in the workspace.
