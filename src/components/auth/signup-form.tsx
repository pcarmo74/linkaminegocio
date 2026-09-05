"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FirebaseError } from "firebase/app";
import { signUpWithEmail } from "@/lib/firebase/auth";
import { createUserDoc, claimUsername } from "@/lib/firestore/users";
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

function getSignupErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/email-already-in-use":
        return "Ya existe una cuenta con este correo electrónico.";
      case "auth/weak-password":
        return "La contraseña es demasiado débil. Usa al menos 6 caracteres.";
      case "auth/invalid-email":
        return "El correo electrónico no es válido.";
      case "auth/operation-not-allowed":
        return "El registro no está disponible en este momento. Intenta más tarde.";
      case "auth/network-request-failed":
        return "Error de conexión. Verifica tu internet e intenta de nuevo.";
      default:
        return "No se pudo crear la cuenta.";
    }
  }
  if (
    err instanceof Error &&
    err.message === "Ese nombre de usuario ya fue tomado."
  ) {
    return err.message;
  }
  return "No se pudo crear la cuenta.";
}

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

    setUsernameState({ status: "checking", message: "Verificando..." });
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
            message: `linkaminegocio.com/u/${name} es tuyo`,
          });
        } else {
          setUsernameState({
            status: "taken",
            message: data.error ?? "Ese nombre de usuario ya está en uso.",
          });
        }
      } catch {
        setUsernameState({
          status: "invalid",
          message: "No se pudo verificar el nombre de usuario.",
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
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!agreedToTerms) {
      setError("Debes aceptar los Términos de Servicio y la Política de Privacidad.");
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

      // Sync session cookie before navigating — the welcome-email route
      // requires an authenticated session, so this must happen first.
      const token = await user.getIdToken();
      await fetch("/api/login", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      try {
        const welcomeEmailRes = await fetch("/api/send-welcome-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email ?? email,
            displayName: name,
          }),
        });
        if (!welcomeEmailRes.ok) {
          const data = await welcomeEmailRes.json().catch(() => null);
          console.error("Failed to send welcome email:", data?.error ?? welcomeEmailRes.statusText);
        }
      } catch (err) {
        console.error("Failed to send welcome email:", err);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(getSignupErrorMessage(err));
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

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isFormValid =
    usernameState.status === "available" &&
    isEmailValid &&
    password.length >= 6 &&
    confirmPassword === password &&
    agreedToTerms;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reclama tu LinkaMiNegocio</CardTitle>
        <CardDescription>
          Elige un nombre de usuario. Obtendrás{" "}
          <span className="font-mono">linkaminegocio.com/u/tunombre</span> gratis.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              type="text"
              placeholder="tunombre"
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
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar contraseña</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirma tu contraseña"
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
              Acepto los{" "}
              <Link
                href="/terms"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Términos de Servicio
              </Link>{" "}
              y la{" "}
              <Link
                href="/privacy"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad
              </Link>
            </Label>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !isFormValid}
          >
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-primary underline">
              Inicia sesión
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
