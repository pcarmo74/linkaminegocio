"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Link as LinkIcon, Mail, Palette, Settings, LogOut, HelpCircle } from "lucide-react";
import { signOutUser } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Resumen", icon: Home },
  { href: "/dashboard/links", label: "Enlaces", icon: LinkIcon },
  { href: "/dashboard/appearance", label: "Apariencia", icon: Palette },
  { href: "/dashboard/subscribers", label: "Suscriptores", icon: Mail },
  { href: "/dashboard/settings", label: "Configuración", icon: Settings },
  { href: "/dashboard/help", label: "Ayuda", icon: HelpCircle },
];

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          LinkaMiNegocio
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => signOutUser()}
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navegación</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
