import type { BusinessStatus } from "@/types/firebase";
import { getBusinessStatusOption } from "@/lib/business-status";

interface Props {
  status: BusinessStatus;
}

export function BusinessStatusBanner({ status }: Props) {
  const option = getBusinessStatusOption(status.type);

  return (
    <div className="w-full rounded-xl border-2 border-current/30 bg-white/10 px-6 py-4 text-center backdrop-blur-sm">
      <p className="text-base font-semibold">
        {option.emoji} {option.label}
      </p>
      {status.message && (
        <p className="mt-2 text-sm opacity-90">{status.message}</p>
      )}
      {status.link && (
        <a
          href={status.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium underline underline-offset-4 opacity-90 hover:opacity-100"
        >
          {status.link}
        </a>
      )}
      <p className="mt-3 text-xs opacity-60">
        Actualizado el {new Date(status.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}
