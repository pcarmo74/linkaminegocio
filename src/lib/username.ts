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

  if (name.length < 3) return "Username must be at least 3 characters.";
  if (name.length > 30) return "Username must be 30 characters or fewer.";
  if (!USERNAME_PATTERN.test(name)) {
    return "Use lowercase letters, numbers, hyphens, or underscores only.";
  }
  if (RESERVED_USERNAMES.has(name)) return "That username is reserved.";
  return null;
}
