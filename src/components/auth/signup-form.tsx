"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpWithEmail } from "@/lib/firebase/auth";
import { createUserDoc, claimUsername } from "@/lib/firestore/users";
import { sendWelcomeEmail } from "@/lib/firestore/mail";
import { normalizeUsername, validateUsername } from "@/lib/username";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function SignupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [usernameState, setUsernameState] = useState<{
    status: "idle" | "checking" | "available" | "taken" | "invalid";
    message: string;
  }>({ status: "idle", message: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const name = normalizeUsername(username);
    if (!name) {
      setUsernameState({ status: "idle", message: "" });
      return;
    }
    const validationError = validateUsername(name);
    if (validationError) {
      setUsernameState({ status: "invalid", message: validationError });
      return;
    }

    setUsernameState({ status: "checking", message: "Checking..." });
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/username/check?name=${encodeURIComponent(name)}`,
        );
        const data = (await res.json()) as {
          available: boolean;
          error?: string;
        };
        if (data.available) {
          setUsernameState({
            status: "available",
            message: `linkfig.app/u/${name} is yours`,
          });
        } else {
          setUsernameState({
            status: "taken",
            message: data.error ?? "That username is taken.",
          });
        }
      } catch {
        setUsernameState({
          status: "invalid",
          message: "Couldn't check username.",
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [username]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const name = normalizeUsername(username);
    const validationError = validateUsername(name);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const credential = await signUpWithEmail(email, password);
      const user = credential.user;

      await createUserDoc(user.uid, {
        email: user.email ?? email,
        displayName: name,
        username: name,
      });

      await claimUsername(user.uid, name);

      await sendWelcomeEmail(user.email ?? email, name).catch(() => {});

      // Sync session cookie before navigating
      const token = await user.getIdToken();
      await fetch("/api/login", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create account.";
      setError(message);
      setLoading(false);
    }
  }

  const messageColor =
    usernameState.status === "available"
      ? "text-green-600"
      : usernameState.status === "checking"
        ? "text-muted-foreground"
        : usernameState.status === "idle"
          ? "text-muted-foreground"
          : "text-destructive";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim your LinkFig</CardTitle>
        <CardDescription>
          Pick a username. You&apos;ll get{" "}
          <span className="font-mono">linkfig.app/u/yourname</span> for free.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
            {usernameState.message && (
              <p className={`text-xs ${messageColor}`}>
                {usernameState.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) =>
                setAgreedToTerms(checked === true)
              }
            />
            <Label htmlFor="terms" className="text-sm leading-snug">
              I agree to the{" "}
              <Link href="/terms" className="text-primary underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={loading || usernameState.status === "taken"}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
