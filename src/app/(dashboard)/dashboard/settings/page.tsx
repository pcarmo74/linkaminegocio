"use client";

import { useEffect, useState } from "react";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/hooks/use-auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { signOutUser } from "@/lib/firebase/auth";
import { getUserDoc, updateUserDoc } from "@/lib/firestore/users";
import type { UserDoc } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function getPasswordUpdateErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "La contraseña actual es incorrecta.";
      case "auth/requires-recent-login":
        return "Por seguridad, debes iniciar sesión de nuevo antes de cambiar tu contraseña.";
      case "auth/weak-password":
        return "La nueva contraseña es demasiado débil. Usa al menos 6 caracteres.";
      default:
        return "No se pudo actualizar la contraseña.";
    }
  }
  return "No se pudo actualizar la contraseña.";
}

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();

  // Profile state
  const [, setDoc] = useState<UserDoc | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [showHandle, setShowHandle] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileStatus, setProfileStatus] = useState("");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwStatus, setPwStatus] = useState("");
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      const d = await getUserDoc(user.uid);
      if (!d) return;
      setDoc(d);
      setDisplayName(d.displayName ?? "");
      setUsername(d.username ?? "");
      setShowEmail(d.showEmail ?? false);
      setShowHandle(d.showHandle !== false);
    })();
  }, [authLoading, user]);

  async function handleProfileSave() {
    if (!user) return;
    setProfileSaving(true);
    setProfileStatus("");
    try {
      await updateUserDoc(user.uid, {
        displayName: displayName.trim(),
        showEmail,
        showHandle,
      });
      setProfileStatus("Guardado.");
    } catch (err) {
      setProfileStatus(
        err instanceof Error ? err.message : "No se pudo guardar.",
      );
    } finally {
      setProfileSaving(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwStatus("");
    setPwError("");

    if (newPassword !== confirm) {
      setPwError("Las nuevas contraseñas no coinciden.");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const authUser = getFirebaseAuth().currentUser;
    if (!authUser || !authUser.email) {
      setPwError("No has iniciado sesión.");
      return;
    }

    setPwSaving(true);
    try {
      const credential = EmailAuthProvider.credential(
        authUser.email,
        currentPassword,
      );
      await reauthenticateWithCredential(authUser, credential);
      await updatePassword(authUser, newPassword);
      setPwStatus("Contraseña actualizada.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err) {
      setPwError(getPasswordUpdateErrorMessage(err));
    } finally {
      setPwSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">Administra tu cuenta y perfil.</p>
      </div>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle>Cuenta</CardTitle>
          <CardDescription>Sesión iniciada como {user?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => signOutUser()}>
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>

      {/* Profile settings */}
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>
            Estos ajustes controlan lo que aparece en tu página pública.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="display-name">Nombre para mostrar</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Tu nombre"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">
              El nombre que se muestra en tu perfil público.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              value={username}
              disabled
              className="opacity-60"
            />
            <p className="text-xs text-muted-foreground">
              Tu URL pública: /u/{username}. Cambiar tu nombre de usuario no está disponible por ahora.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-email"
              checked={showEmail}
              onCheckedChange={(checked) => setShowEmail(checked === true)}
            />
            <Label htmlFor="show-email" className="text-sm">
              Mostrar correo electrónico en el perfil público
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-handle"
              checked={showHandle}
              onCheckedChange={(checked) => setShowHandle(checked === true)}
            />
            <Label htmlFor="show-handle" className="text-sm">
              Mostrar @usuario en el perfil público
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleProfileSave} disabled={profileSaving}>
              {profileSaving ? "Guardando..." : "Guardar perfil"}
            </Button>
            {profileStatus && (
              <span className="text-sm text-muted-foreground">
                {profileStatus}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Change password */}
      <Card>
        <CardHeader>
          <CardTitle>Cambiar contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Contraseña actual</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nueva contraseña</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">
                Confirmar nueva contraseña
              </Label>
              <Input
                id="confirm-new-password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            {pwStatus && <p className="text-sm text-green-600">{pwStatus}</p>}
            {pwError && <p className="text-sm text-destructive">{pwError}</p>}
            <Button type="submit" disabled={pwSaving}>
              {pwSaving ? "Actualizando..." : "Actualizar contraseña"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
