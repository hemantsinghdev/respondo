import { Alert, AlertDescription } from "@repo/ui/components";
import { AlertCircle } from "@repo/ui/icons";
import React from "react";

function ErrorAlert({ error }: { error: string }) {
  return (
    <Alert
      variant="destructive"
      className="mb-6 bg-red-500/10 border-red-500/20 text-red-400"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {error.includes("Invalid email or password")
          ? "Invalid email or password."
          : error.includes("User already exists")
            ? "User already exists."
            : error.includes("Invalid token")
              ? "Invalid Token"
              : "An error occurred. Please try again."}
      </AlertDescription>
    </Alert>
  );
}

export default ErrorAlert;
