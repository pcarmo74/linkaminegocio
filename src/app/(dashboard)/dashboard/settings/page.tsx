"use client";

import { useEffect, useState } from "react";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
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
      setProfileStatus("Saved.");
    } catch (err) {
      setProfileStatus(
        err instanceof Error ? err.message : "Save failed.",
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
      setPwError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("Password must be at least 6 characters.");
      return;
    }

    const authUser = getFirebaseAuth().currentUser;
    if (!authUser || !authUser.email) {
      setPwError("Not signed in.");
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
      setPwStatus("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err) {
      setPwError(
        err instanceof Error ? err.message : "Couldn't update password.",
      );
    } finally {
      setPwSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account and profile.</p>
      </div>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Signed in as {user?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => signOutUser()}>
            Sign out
          </Button>
        </CardContent>
      </Card>

      {/* Profile settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            These settings control what appears on your public page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="display-name">Display name</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">
              The name shown on your public profile.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              disabled
              className="opacity-60"
            />
            <p className="text-xs text-muted-foreground">
              Your public URL: /u/{username}. Username changes coming soon.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-email"
              checked={showEmail}
              onCheckedChange={(checked) => setShowEmail(checked === true)}
            />
            <Label htmlFor="show-email" className="text-sm">
              Show email on public profile
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-handle"
              checked={showHandle}
              onCheckedChange={(checked) => setShowHandle(checked === true)}
            />
            <Label htmlFor="show-handle" className="text-sm">
              Show @handle on public profile
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleProfileSave} disabled={profileSaving}>
              {profileSaving ? "Saving..." : "Save profile"}
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
          <CardTitle>Change password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
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
                Confirm new password
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
              {pwSaving ? "Updating..." : "Update password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
