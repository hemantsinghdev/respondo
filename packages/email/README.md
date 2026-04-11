# Email Communications (`packages/email`)

The `@repo/email` package is the unified messaging engine for the Respondo ecosystem. It centralizes our integration with **Brevo**, ensuring that transactional emails, auth verification codes, and system notifications maintain a consistent brand identity and reliable delivery across all applications.

---

## 🏗 Package Architecture

The package provides a clean split between the low-level delivery client and high-level business logic:

- **`./client`**: Exports the configured **Brevo** instance. This allows for direct API access if custom, one-off mailing operations are required.
- **`./templates`**: A library of pre-defined email functions (e.g., `sendWelcomeEmail`, `sendVerificationCode`). These functions abstract away the HTML/Text body construction and provide a type-safe way to trigger communications.

---

## 🛠 Core Responsibilities

- **Centralized SMTP/API Logic**: Manages the connection to Brevo so that individual apps don't need to handle API headers or provider-specific SDKs.
- **Cross-Package Integration**:
  - **`@repo/auth`**: Used to send "Magic Links," password resets, and 2FA codes.
  - **`@apps/web`**: Used for ticketing updates, organization invites, and user notifications.
- **Template Management**: Houses the logic for email layouts, ensuring that every mail sent—regardless of the source app—looks and feels like Respondo.

---

## 🔑 Environment Requirements

To enable email delivery, the following environment variable must be defined in the **host environment** (e.g., in `.env.local` of the app calling this package):

| Variable        | Purpose                                                               |
| :-------------- | :-------------------------------------------------------------------- |
| `BREVO_API_KEY` | The API key generated from the Brevo (formerly Sendinblue) dashboard. |

---

## 📈 Future Scaling

As Respondo grows, this package will serve as the hub for:

- **A/B Testing**: Centralizing email copy changes in one location rather than hunting through multiple apps.
- **Analytics**: Tracking delivery rates and click-throughs across the entire platform.
