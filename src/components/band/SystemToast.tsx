import { useEffect, useState } from "react";
import { onToast, type ToastPayload } from "@/lib/toast";
import { sfx } from "@/lib/sfx";

/**
 * Switch-style system notification host. Mounted once at the root; renders a
 * top-right stack of matte-grey toasts that auto-dismiss. Fire one anywhere
 * with emitToast().
 */
export function SystemToast() {
  const [toasts, setToasts] = useState<ToastPayload[]>([]);

  useEffect(() => {
    return onToast((t) => {
      sfx.toast();
      setToasts((cur) => [...cur, t]);
      window.setTimeout(() => {
        setToasts((cur) => cur.filter((x) => x.id !== t.id));
      }, 3400);
    });
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-16 z-[10000] flex w-72 max-w-[calc(100vw-2rem)] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="matte-panel animate-toast pointer-events-auto flex items-start gap-3 p-3"
        >
          <span aria-hidden className="text-lg leading-none">
            {t.icon ?? "◉"}
          </span>
          <div>
            <div className="font-pixel text-[8px] tracking-widest text-joycon-blue">
              {t.kicker ?? "SYSTEM"}
            </div>
            <div className="mt-1 font-mono-retro text-base leading-snug text-matte-fg">
              {t.message}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
