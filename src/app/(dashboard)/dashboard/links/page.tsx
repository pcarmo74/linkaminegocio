"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  createLink,
  deleteLink,
  listLinks,
  reorderLinks,
  setFeaturedLink,
  updateLink,
} from "@/lib/firestore/links";
import type { LinkDoc } from "@/types";
import { LinkEditorDialog } from "@/components/dashboard/link-editor-dialog";
import { SortableLinkRow } from "@/components/dashboard/sortable-link-row";
import { RoutingDrawer } from "@/components/dashboard/routing-drawer";

export default function LinksPage() {
  const { user, loading: authLoading } = useAuth();
  const [links, setLinks] = useState<LinkDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<LinkDoc | null>(null);
  const [routingOpen, setRoutingOpen] = useState(false);
  const [routingLink, setRoutingLink] = useState<LinkDoc | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  const refresh = useCallback(async () => {
    if (!user) return;
    const data = await listLinks(user.uid);
    setLinks(data);
  }, [user]);

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      setLoading(true);
      try {
        await refresh();
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, user, refresh]);

  async function handleCreate(values: {
    title: string;
    url: string;
    iconKey: string | null;
  }) {
    if (!user) return;
    const id = await createLink(user.uid, {
      title: values.title,
      url: values.url,
      order: links.length,
    });
    if (values.iconKey !== null) {
      await updateLink(user.uid, id, { iconKey: values.iconKey });
    }
    await refresh();
  }

  async function handleUpdate(values: {
    title: string;
    url: string;
    iconKey: string | null;
  }) {
    if (!user || !editing) return;
    await updateLink(user.uid, editing.id, values);
    await refresh();
  }

  async function handleDelete(linkId: string) {
    if (!user) return;
    if (!confirm("Delete this link?")) return;
    await deleteLink(user.uid, linkId);
    await refresh();
  }

  async function handleToggleFeatured(linkId: string, featured: boolean) {
    if (!user) return;
    const targetId = featured ? linkId : null;
    setLinks((prev) =>
      prev.map((l) => ({ ...l, featured: l.id === targetId })),
    );
    await setFeaturedLink(user.uid, targetId);
  }

  async function handleToggle(linkId: string, active: boolean) {
    if (!user) return;
    setLinks((prev) =>
      prev.map((l) => (l.id === linkId ? { ...l, active } : l)),
    );
    await updateLink(user.uid, linkId, { active });
  }

  async function handleDragEnd(event: DragEndEvent) {
    if (!user) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const newLinks = arrayMove(links, oldIndex, newIndex).map((link, i) => ({
      ...link,
      order: i,
    }));
    setLinks(newLinks);
    await reorderLinks(
      user.uid,
      newLinks.map((l) => l.id),
    );
  }

  async function handleSaveRouting(
    linkId: string,
    routing: LinkDoc["routing"],
  ) {
    if (!user) return;
    await updateLink(user.uid, linkId, { routing } as Partial<LinkDoc>);
    await refresh();
  }

  function openAdd() {
    setEditing(null);
    setEditorOpen(true);
  }

  function openEdit(link: LinkDoc) {
    setEditing(link);
    setEditorOpen(true);
  }

  function openRouting(link: LinkDoc) {
    setRoutingLink(link);
    setRoutingOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Links</h2>
          <p className="text-muted-foreground">
            Add, edit, and reorder the links on your public profile.
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="mr-1 h-4 w-4" />
          Add link
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : links.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-muted-foreground">
            No links yet. Click <strong>Add link</strong> to create your first
            one.
          </p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {links.map((link) => (
                <SortableLinkRow
                  key={link.id}
                  link={link}
                  onToggle={handleToggle}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onRouting={openRouting}
                  onToggleFeatured={handleToggleFeatured}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <LinkEditorDialog
        open={editorOpen}
        onOpenChange={setEditorOpen}
        initial={editing}
        onSubmit={editing ? handleUpdate : handleCreate}
      />

      <RoutingDrawer
        open={routingOpen}
        onOpenChange={setRoutingOpen}
        link={routingLink}
        onSave={handleSaveRouting}
      />
    </div>
  );
}
