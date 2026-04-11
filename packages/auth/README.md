# Core Auth Implementation (`packages/auth`)

The `@repo/auth` package is the centralized identity provider for the Respondo ecosystem. By isolating authentication logic into a shared package, we ensure that session management, social provider configurations, and security protocols remain consistent across all current and future applications in the monorepo.

---

## 🏗 Package Architecture

This package is designed with a clear boundary between server-side authority and client-side interaction:

- **`./server`**: High-privilege exports for use in API routes, middleware, and Server Components. It includes the `auth` instance, the `toNextJsHandler` adapter, and the `getSessionCookie` helper.
- **`./client`**: A lightweight browser client generated via `createAuthClient`, providing hooks and methods for sign-in, sign-out, and session observation within the React lifecycle.

---

## 🛠 Core Responsibilities

Respondo relies on this package to orchestrate the entire identity lifecycle:

- **Multi-Strategy Auth**: Native support for traditional email/password credentials alongside secure OAuth flows for **GitHub** and **Google**.
- **Session Management**: Handles the underlying complexity of session cookie generation, rotation, and validation.
- **Next.js Integration**: Provides the necessary wiring for the `app/api/auth/[...all]` route, enabling seamless communication between the frontend and the auth engine.

---

## 🗄 Database & Persistence

To maintain a single source of truth, `@repo/auth` is tightly integrated with our database layer and dictates the required schema for identity management.

### Schema Generation

Because we use **Better Auth**, the authentication schema is managed here and then synchronized with our Prisma setup.

- **Generate Schema**: Run `pnpm auth:db:generate` to produce the `generated-auth-schema.prisma` file based on the current auth configuration.
- **Integration**: This generated schema is then consumed by `@repo/db` to ensure the PostgreSQL instance supports all necessary tables for users, sessions, and accounts.

### Data Alignment

- **Prisma Adapter**: The package consumes `@repo/db` to persist data directly into the shared PostgreSQL instance.
- **Instant Availability**: This ensures that when a user signs up, their profile is instantly available to the ticketing and organization systems without synchronization delays.

---

## 🔑 Environment Requirements

For the authentication engine to initialize, the following environment variables must be defined in the **host environment (apps layers)**:

| Variable                          | Purpose                                                  |
| :-------------------------------- | :------------------------------------------------------- |
| `APP_URL` / `NEXT_PUBLIC_APP_URL` | Base URLs for callback redirection and session security. |
| `GITHUB_CLIENT_ID` / `_SECRET`    | Credentials for GitHub OAuth applications.               |
| `GOOGLE_CLIENT_ID` / `_SECRET`    | Credentials for Google Cloud Console OAuth.              |

---

## 🚀 Scaling Identity

This package is the "source of truth" for identity at Respondo. When the platform requires new capabilities—such as Two-Factor Authentication (2FA), additional social providers (like WhatsApp or LinkedIn), or specialized session rules—the implementation should occur here. This "implement once, use everywhere" philosophy keeps our security perimeter small and our codebase professional.
