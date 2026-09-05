export const RESERVED_USERNAMES = new Set([
  "admin",
  "api",
  "app",
  "auth",
  "dashboard",
  "forgot-password",
  "help",
  "login",
  "logout",
  "privacy",
  "settings",
  "signup",
  "support",
  "terms",
  "u",
  "user",
  "users",
  "www",
  "_next",
  "favicon.ico",
]);

const USERNAME_PATTERN = /^[a-z0-9_-]{3,30}$/;

export function normalizeUsername(input: string): string {
  return input.trim().toLowerCase();
}

export function validateUsername(input: string): string | null {
  const name = normalizeUsername(input);

  if (name.length < 3) return "El nombre de usuario debe tener al menos 3 caracteres.";
  if (name.length > 30) return "El nombre de usuario debe tener 30 caracteres o menos.";
  if (!USERNAME_PATTERN.test(name)) {
    return "Usa solo letras, números, guiones o guiones bajos.";
  }
  if (RESERVED_USERNAMES.has(name)) return "Ese nombre de usuario está reservado.";
  return null;
}
