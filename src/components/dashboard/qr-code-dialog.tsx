"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  username: string;
}

export function QrCodeDialog({ open, onOpenChange, url, username }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  function handleDownload() {
    const canvas = wrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `linkfig-${username}.png`;
    link.href = pngUrl;
    link.click();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Your LinkFig QR code</DialogTitle>
        </DialogHeader>
        <div
          ref={wrapRef}
          className="flex flex-col items-center gap-4 py-4"
        >
          <QRCodeCanvas
            value={url}
            size={240}
            level="H"
            marginSize={2}
          />
          <p className="text-center text-sm text-muted-foreground break-all">
            {url}
          </p>
          <Button onClick={handleDownload} className="w-full">
            Download PNG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
