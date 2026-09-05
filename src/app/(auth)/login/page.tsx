import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">LinkaMiNegocio</h1>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            ¡Bienvenido de nuevo! Inicia sesión en tu cuenta.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
