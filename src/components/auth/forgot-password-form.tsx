"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuth } from "@/lib/firebase/client";
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

function getResetErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/invalid-email":
        return "El correo electrónico no es válido.";
      case "auth/user-not-found":
        return "No existe una cuenta con este correo electrónico.";
      case "auth/too-many-requests":
        return "Demasiados intentos. Por favor, intenta de nuevo más tarde.";
      default:
        return "No se pudo enviar el correo de restablecimiento.";
    }
  }
  return "No se pudo enviar el correo de restablecimiento.";
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      await sendPasswordResetEmail(getFirebaseAuth(), email);
      setStatus("sent");
    } catch (err) {
      setError(getResetErrorMessage(err));
      setStatus("error");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restablece tu contraseña</CardTitle>
        <CardDescription>
          Te enviaremos un enlace por correo para crear una nueva contraseña.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "sent"}
            />
          </div>
          {status === "sent" && (
            <p className="text-sm text-green-600">
              Revisa tu bandeja de entrada para encontrar el enlace.
            </p>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading" || status === "sent"}
          >
            {status === "loading" ? "Enviando..." : "Enviar enlace"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            <Link href="/login" className="text-primary underline">
              Volver a iniciar sesión
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
