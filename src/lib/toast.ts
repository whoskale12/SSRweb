// Tiny pub/sub for Switch-style "system notification" toasts. Any component can
// fire one with emitToast(); the <SystemToast> host (mounted once at the root)
// subscribes and renders them. Module-level so it works across routes.

export interface ToastPayload {
  id: number;
  message: string;
  /** short line above the message, e.g. "SYSTEM" */
  kicker?: string;
  icon?: string;
}

type Listener = (t: ToastPayload) => void;

const listeners = new Set<Listener>();
let counter = 0;

export function onToast(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function emitToast(
  message: string,
  opts: { kicker?: string; icon?: string } = {},
): void {
  counter += 1;
  const payload: ToastPayload = {
    id: counter,
    message,
    kicker: opts.kicker,
    icon: opts.icon,
  };
  listeners.forEach((fn) => fn(payload));
}
