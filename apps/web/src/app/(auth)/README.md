# Identity, Onboarding & Access (`apps/web/(auth)`)

The `(auth)` route group is the gateway to the Respondo platform. Designed as a high-conversion, branded entry point, this section isolates the authentication experience from both the high-energy marketing site and the data-heavy main workspace. It provides a focused, secure environment where users can transition from visitors to authenticated members of an organization.

---

## 🏗 The Auth Shell & Layout

The visual identity of our onboarding flow is defined by a specialized layout system that emphasizes security and brand consistency:

- **`layout.tsx`**: Creates a centered, immersive auth shell featuring signature background glow effects. This layout ensures that the authentication forms are the singular focus of the user, keeping the "chrome" of the main application hidden until access is granted.
- **`@app/components/AccessAuthLayout.tsx`**: A shared structural component used by both login and signup pages to maintain a unified form factor and aesthetic.
- **Branding**: The Respondo logo is anchored in the top-left corner, providing a constant brand touchpoint throughout the onboarding process.

---

## 🔐 Auth Access Screens & Components

The authentication flow is split into two primary paths, each housed within the `(access)` sub-directory for maximum organizational clarity.

### 1. Login Flow

- **`login/page.tsx`**: The entry wrapper for returning users.
- **`login/_components/LoginForm.tsx`**: A dedicated component handling email and password authentication. It manages the local state for credential submission and interfaces directly with the auth client.

### 2. Signup Flow

- **`signup/page.tsx`**: The onboarding wrapper for new organizations.
- **`signup/_components/SignUpForm.tsx`**: Manages the account creation process, ensuring all necessary user details are captured and validated before the account is provisioned.

---

## 🛠 Shared Logic & Behavior

Regardless of the entry path, the auth group utilizes a robust shared infrastructure to ensure security and a smooth user experience:

- **Social Connectivity (`@app/components/SocialProviders.tsx`)**: Both pages feature prominent social login buttons for **GitHub** and **Google**, powered by Better Auth’s social sign-in capabilities.
- **Strict Validation**: All form inputs are strictly validated using **Zod** schemas located in `@app/lib/validations/auth.ts`. This prevents malformed data from ever reaching our authentication API.
- **Error Orchestration**: Authentication errors are routed back through URL query strings. This allows the UI to catch and surface "friendly" inline alerts directly above the forms, guiding the user to correct issues without page-level confusion.

---

## 📡 Architectural Boundary: The Client-Server Handshake

The `(auth)` group enforces a strict separation between the **UI layer** and the **Auth Engine**. It is vital to remember that the logic here is purely consumptive:

- **Client Interface (`@repo/auth/client`)**: The React components dispatch intent via this shared client. It handles the browser-side of the Better Auth protocol, including OAuth redirects and session storage.
- **Server Authority (`app/api/auth/[...all]/route.ts`)**: This is the mission-critical backend sink. Every action initiated in the `(auth)` UI is processed here. This route acts as the final arbiter for session creation, database writes, and security checks.
- **Security Decoupling**: By keeping the UI in `(auth)` and the logic in the API route, we maintain a clean security boundary where sensitive operations never leak into the client-side component logic.

---

## 🔄 The Onboarding Flow

1.  **Selection**: The user chooses between traditional email/password credentials or a social provider.
2.  **Validation**: Zod intercepts the submission to ensure email formats and password strengths meet platform requirements.
3.  **Authentication**: The request is dispatched via the shared auth client.
4.  **Redirection**: Upon a successful handshake, the user is automatically routed to the `/dashboard`, where the main workspace takes over.

## 📂 Why This Structure Matters

By grouping the login and signup logic within the `(access)` folder and the `(auth)` layout, we maintain a complete, end-to-end view of the onboarding lifecycle. This isolation makes it trivial to audit the authentication flow, update brand visuals, or add new social providers without impacting the rest of the application’s business logic.
