import { Suspense } from "react";
import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">LinkaMiNegocio</h1>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Crea una cuenta para comenzar.
          </p>
        </div>

        <Suspense fallback={null}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
