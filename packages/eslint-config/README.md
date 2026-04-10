# Linting & Code Quality Standards (`packages/eslint-config`)

The `@repo/eslint-config` package serves as the structural guardian of the Respondo codebase. In a monorepo environment, maintaining a unified coding style and identifying potential anti-patterns early is critical for long-term maintainability. This package centralizes our linting logic, ensuring that whether a developer is working on a UI primitive or a complex API route, the standards for quality, safety, and readability remain identical.

---

## 🏗 Purpose & Philosophy

The primary goal of this package is to eliminate "style drift." By shipping shared presets, we ensure:

- **Uniformity**: Every package in the workspace speaks the same dialect of TypeScript and React.
- **Predictability**: Rules for imports, hooks, and accessibility are enforced globally, making it easier for contributors to switch between different parts of the project.
- **Automated Excellence**: We leverage industry-standard plugins to catch common bugs—such as missing dependency arrays in hooks or improper async handling—before they reach production.

---

## 📦 Shared Presets

The package provides specialized configurations tailored to the different environments found within our monorepo:

- **`./base`**: The foundational configuration. It focuses on modern JavaScript/TypeScript best practices, ensuring clean syntax and type-safe patterns across all packages, including those without a UI layer.
- **`./next-js`**: Optimized specifically for our Next.js web application. It incorporates the `next/core-web-vitals` rules and ensures that our routing and server-side logic adhere to the framework's best practices.
- **`./react-internal`**: Designed for our internal UI libraries and components. This preset enforces React-specific rules, such as Hook integrity and JSX accessibility (a11y), ensuring our design system is as robust as it is beautiful.

---

## 🛠 Usage & Integration

To maintain a clean and professional codebase, every package within the `apps/` and `packages/` directories extends one of these shared configurations. This "plug-and-play" approach allows us to update a rule in one place and see it reflected across the entire ecosystem instantly.

---

## 🚀 Scaling Quality

As the Respondo platform matures, these configurations will evolve to include stricter security audits, performance-related linting, and more aggressive dead-code elimination. By centralizing our standards here, we make high-quality code the path of least resistance for every developer on the team.
