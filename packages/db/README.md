# Database Schema & Data Integrity (`packages/db`)

The `@repo/db` package is the foundational data layer of the Respondo ecosystem. It centralizes our **PostgreSQL** schema definitions and the **Prisma** ORM configuration, ensuring that every application and package within the monorepo interacts with a single, strictly typed source of truth. By decoupling the database logic from the application code, we maintain high data integrity and simplify the orchestration of our relational models.

---

## 🏗 Package Structure & Exports

This package is designed to be a "plug-and-play" dependency for any service requiring database access:

- **`.` (Root Export)**: Provides the fully initialized and configured Prisma client instance.
- **`../generated/prisma/client`**: Exports the auto-generated TypeScript types and enums, ensuring that our database queries are end-to-end type-safe.
- **`src/client.ts`**: Handles the instantiation logic. It uses the PostgreSQL adapter and implements a singleton pattern in development to prevent exhausting database connection limits during hot-reloads.
- **`prisma/schema.prisma`**: The heart of the package—the declarative source of truth for our entire database structure.

---

## 🗄 Core Data Models

Currently, the schema is optimized to support our robust authentication and session management systems, integrated directly with Better Auth:

- **`User`**: Stores core identity information and profile metadata.
- **`Session`**: Manages active user sessions across devices.
- **`Account`**: Bridges users to various social providers (GitHub, Google).
- **`Verification`**: Handles secure tokens for email verification and credential management.

As Respondo evolves, this schema will expand to house the high-density data required for **multi-channel ticketing**, **customer profiles**, and **AI-retrieval (RAG)** embeddings.

---

## ⚙️ Technical Implementation

- **High-Performance Adapter**: We utilize `@prisma/adapter-pg` paired with the `pg` driver for reliable, native communication with our PostgreSQL instance.
- **Isolated Generation**: To avoid conflicts within the monorepo, Prisma generates its output into a local `generated/` directory within this package, which is then re-exported for consumer use.
- **Environment Requirement**: The package requires a valid `DATABASE_URL` to establish a connection to the PostgreSQL cluster.

---

## 🛡 Maintaining Data Integrity

At Respondo, we treat our schema as a living document that requires careful stewardship:

1.  **Strict Typing**: Always use the generated types from `@repo/db` to prevent runtime errors and data drift.
2.  **Centralized Migrations**: All changes to the database structure must originate in the `schema.prisma` file here, ensuring that migrations are version-controlled and predictable.
3.  **Scalability**: The relational structure is designed to support the complex JOIN operations required for advanced analytics and customer history tracking.

## 🚀 Future Expansion

The next phase of development for this package includes the introduction of models for:

- **Tickets & Conversations**: Managing the lifecycle of customer queries.
- **Organizations & Memberships**: Supporting multi-tenant environments and team RBAC.
- **Knowledge Base Embeddings**: Storing the vectorized data required for our RAG-powered AI engine.

When extending the schema, always remember to run the generation scripts to keep the client types in sync with the underlying tables.
