import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">Perfil no encontrado</h1>
      <p className="text-muted-foreground">
        Ese nombre de usuario no existe en LinkaMiNegocio.
      </p>
      <Link href="/" className="text-primary underline">
        Ir al inicio
      </Link>
    </main>
  );
}
