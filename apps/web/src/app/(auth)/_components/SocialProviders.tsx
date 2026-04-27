"use client";

import { Button } from "@repo/ui/components";
import { authClient } from "@repo/auth/client";
import { GithubIcon, GoogleIcon } from "@repo/ui/assets";

export function SocialProviders() {
  const handleSocialLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("github")}
        className="cursor-pointer bg-transparent border-white/10 hover:bg-white/5 text-white hover:border-white/20 transition-all"
      >
        <GithubIcon className="mr-2 h-5 w-5 fill-white" />
        Github
      </Button>
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("google")}
        className="cursor-pointer bg-transparent border-white/10 hover:bg-white/5 text-white hover:border-white/20 transition-all"
      >
        <GoogleIcon className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
