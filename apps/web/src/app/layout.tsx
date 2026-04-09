import type { Metadata } from "next";
import "@repo/ui/styles/globals.css";

export const metadata: Metadata = {
  title: "Respondo",
  description: "AI-Powered Multi-Channel Support-CRM for Small Businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
  );
}
