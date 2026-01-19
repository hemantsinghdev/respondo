# <p align="center">Respondo</p>

## <p align="center">AI-Powered Multi-Channel Support-CRM for Small Businesses</p>

This project is a **full-stack SaaS CRM** designed for small and medium businesses to manage customer communication from multiple channels in one place, with **AI-assisted support and automation**.

The goal of the system is to help businesses:

- Collect customer queries from different platforms
- Convert them into structured tickets
- Use AI to assist agents in replying faster and better
- Track customers, agents, and performance

---

# 1. System Architecture

The system is built as a **monorepo**:

- **Frontend** → Next.js (using ShadCN UI)
- **Backend** → Express.js
- **Database** → PostgreSQL
- **Queue & Background Jobs** → Redis + BullMQ
- **AI Layer** → RAG (Retrieval Augmented Generation) + LLMs
- **Authentication** → BetterAuth

This allows frontend, backend, shared types, and workers to live in one clean, professional codebase.

---

# 2. How customers contact the business

Businesses can connect their customer communication through:

### a) Gmail (OAuth)

- Connect Gmail using Google OAuth
- Incoming emails are automatically pulled and converted into tickets

### b) Generic email (IMAP)

- Supports Outlook, Zoho, custom domains, etc.
- Emails are read via IMAP and parsed into tickets

### c) Website API

- Businesses get an API key
- They can send customer messages from their website into the CRM

### d) Live chat widget (added)

- Businesses embed a small chat widget on their website
- Messages become tickets inside the CRM

### e) WhatsApp (optional)

- Customers can message on WhatsApp
- Messages arrive as CRM tickets

All channels end up in **one unified ticket inbox**.

---

# 3. Ticket system

Every message becomes a **ticket** with:

- Category (billing, technical, sales, etc.)
- Priority (low, medium, high, urgent)
- Status (open, pending, solved, closed)
- Assigned agent
- SLA timer

Tickets store:

- All customer messages
- All agent replies
- All AI suggestions
- Attachments
- History of actions

---

# 4. User roles and organization system

Each business is an **organization** with multiple users like:

- **Admin**
  - Manages team, rules, settings, and integrations

- **Lead Agent**
  - Handles escalations and reviews performance

- **Support Agent**
  - Handles tickets and replies to customers

Each role has different permissions (RBAC).

---

# 5. Customer profile system

Every customer has a **profile** showing:

- Name, email, phone
- All past tickets
- First contact date
- Last contact date
- Frequency of interaction
- Common issues

This allows agents to understand the customer before replying.

---

# 6. AI system (RAG-based)

The system uses **Retrieval-Augmented Generation**:

It learns from:

- FAQs
- Past tickets
- Past agent replies
- Knowledge base documents

When a new ticket arrives:

1. Relevant past data is retrieved
2. AI generates a suggested reply
3. The agent can edit and approve it
4. Only then it is sent

This keeps AI **safe, accurate, and enterprise-grade**.

AI also:

- Summarizes long conversations
- Highlights important details
- Suggests ticket priority and category

---

# 7. Automation & workflows

The system automatically:

- Assigns tickets to agents
- Sets priority based on keywords
- Tags tickets
- Starts SLA timers
- Escalates tickets if not answered on time

This removes manual work and improves response speed.

---

# 8. Activity & audit logs

Every important action is recorded:

- Who replied
- Who reassigned
- Who closed or deleted a ticket
- When AI suggested a reply

This makes the system safe for teams.

---

# 9. Background processing

Heavy tasks run in workers, not API requests:

- Reading emails
- Parsing attachments
- Generating embeddings
- Calling AI
- Sending replies

This makes the system scalable and reliable.

---

# 10. Reports & analytics

The dashboard shows:

- Tickets per day
- Average response time
- Open vs closed tickets
- Agent performance
- SLA compliance

This helps businesses manage their support team.

---

# 11. Data control

Businesses can:

- Export tickets and customers as CSV
- Keep their data
- Migrate to another system if needed
