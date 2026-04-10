# UI Library & Design System (`packages/ui`)

The `@repo/ui` package is the visual and interactive heartbeat of the Respondo ecosystem. It serves as our centralized Design System, housing every element from foundational CSS and utility functions to complex animated visuals. By maintaining a single source of truth for our UI, we ensure that the "Respondo Experience" remains consistent, professional, and accessible—whether a user is browsing the marketing site or deep within the authenticated dashboard.

---

## 🏗 Core Architecture & Exports

This package is designed to be a comprehensive toolkit for building modern, responsive interfaces:

- **UI Primitives**: Highly reusable components including buttons, inputs, cards, dialogs, badges, and alerts. These are the building blocks of every view in our applications.
- **Design Utilities**: Exports optimized helpers such as `cn` (for dynamic Tailwind class merging) and `motion` (powered by Framer Motion) to handle sophisticated animations.
- **Iconography & Assets**: A unified collection of Lucide icons, social provider logos, and our own generated brand assets (the Respondo long and short logos).
- **Notification System**: The UI primitives for our toast and alert systems, ensuring feedback is visually aligned with our brand identity.

---

## 📁 Internal Organization

- **`src/components/ui/`**: The foundation. Houses the base components built for reliability and accessibility.
- **`src/components/notifications/`**: Specialized components for the toast system, supporting multiple variants including success, error, and AI-specific feedback.
- **`src/components/visuals/`**: High-fidelity, animated components specifically designed to bring the marketing landing pages to life.
- **`src/assets/`**: The central repository for all raw brand imagery and SVG icons.
- **`src/styles/`**: Manages the global CSS architecture, including Tailwind configurations and brand-specific color tokens.

---

## ⚙️ Automated Asset Pipeline

To ensure that our branding is always performant and easy to use, we utilize a custom asset generation script:

- **`scripts/build-assets.mjs`**: This script processes raw image files in `src/assets/images/` and transforms them into a base64 asset module.
- **The Benefit**: This approach simplifies imports across the monorepo and eliminates the "broken image" issues often found in complex directory structures. It guarantees that our logo is always available as a consistent, type-safe import.

---

## 🛡 Design Philosophy

The `@repo/ui` package is governed by three main principles:

1.  **Atomicity**: Components are broken down into their smallest functional parts, making them easy to maintain and test.
2.  **Consistency**: A change to a button's border radius or a brand color here propagates instantly across the entire platform, from the landing page to the settings menu.
3.  **Performance**: We prioritize lightweight, tree-shakeable exports and optimized animations to ensure the interface feels snappy and responsive on any device.

## 🚀 Scaling the System

As Respondo grows, this package will expand to include more complex organizational components, advanced data visualization charts, and interactive AI-feedback modules. By contributing to `@repo/ui`, we ensure that the platform's visual maturity scales alongside its technical capabilities.
