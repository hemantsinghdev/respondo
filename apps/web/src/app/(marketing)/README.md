# Marketing & Landing Experience (`apps/web/(marketing)`)

The `(marketing)` route group is the public face of Respondo. Its mission is to distill the technical complexity of an AI-powered CRM into a compelling, human-centric narrative. This section serves as the primary conversion engine, guiding visitors from initial curiosity to active onboarding with a professional, "dark neon" aesthetic that mirrors the sophistication of the platform itself.

---

## 🏗 Composition & Architecture

The marketing experience is built using a modular, section-based architecture. This allows for rapid iteration of messaging and design without risking the integrity of the application's core logic.

- **`page.tsx`**: The orchestrator. It assembles the individual section components into a seamless vertical scroll experience.
- **`layout.tsx`**: The public shell. It provides the persistent navigation header (sticky navbar) and footer, ensuring the Respondo brand is always visible.
- **`_components/`**: A dedicated directory for local, self-contained UI sections that are exclusive to the landing experience.

---

## 🌊 The Narrative Flow

The landing page is strategically ordered to build trust and demonstrate value progressively:

1.  **Hero Section**: The first impression—headline, primary value proposition, and a clear call to action.
2.  **Value Triptych**: A three-part breakdown of the core product promises: Unified Inbox, Efficiency, and Growth.
3.  **RAG Engine Section**: A deep dive into our "Retrieval-Augmented Generation" intelligence, explaining how Respondo learns from your data to assist your team.
4.  **Team & Organization**: Highlighting our RBAC (Role-Based Access Control) and collaborative workflows designed for small businesses.
5.  **Tech Stack Section**: A transparent look at the enterprise-grade engineering (Next.js, PostgreSQL, Redis) that powers the platform.
6.  **Call to Action (CTA)**: The final conversion block, removing friction for users ready to start their journey.

---

## 📂 Internal Component Map (`_components`)

To keep the codebase maintainable, each piece of the story is isolated:

- **`HeroSection.tsx`**: Manages high-impact headlines and product hero visuals.
- **`ValueTriptychSection.tsx`**: Translates features into digestible business benefits.
- **`RAGEngineSection.tsx`**: Visualizes the AI retrieval and suggestion lifecycle.
- **`TeamOrganizationSection.tsx`**: Showcases the hierarchy of Admins and Agents.
- **`TechStackSection.tsx`**: Highlights the reliability of our monorepo architecture.
- **`CtaSection.tsx`**: The final anchor point for lead generation.
- **`index.ts`**: A barrel export that simplifies imports within the main page file.

---

## 🎨 Design & Visual Identity

The marketing site is not just a separate entity; it is a visual extension of the Respondo application:

- **Shared Assets**: We utilize the long-form branding assets and logos directly from `@repo/ui`, ensuring perfect consistency between the marketing site and the dashboard.
- **Aesthetic**: A modern "Dark Neon" theme that signals a cutting-edge, AI-first approach while remaining accessible and clean.
- **Responsiveness**: Every section in `_components` is built with a mobile-first mindset, ensuring the product story is told effectively on any device.

---

## 🛠 Strategic Roadmap

The marketing layer is designed to evolve alongside the product:

- **Social Proof**: Future integration of testimonial blocks and case study sections.
- **Dynamic Conversion**: Wiring the `CtaSection.tsx` into live waitlists or automated onboarding flows.
- **Iterative Messaging**: Easily reordering sections in `page.tsx` to A/B test different narrative structures.
