import type { ButtonHTMLAttributes, ReactNode } from "react";
import { sfx } from "@/lib/sfx";

/**
 * Matte-grey Nintendo-Switch-style toggle switch. Grey track when off, Joy-Con
 * blue when on, with a sliding knob. Plays a select blip on change.
 */
export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onMouseEnter={() => sfx.hover()}
      onClick={() => {
        sfx.select();
        onChange(!checked);
      }}
      className="flex w-full items-center justify-between gap-4 rounded-[var(--radius-switch)] px-3 py-2 text-left transition-colors hover:bg-matte-700"
    >
      <span>
        <span className="block font-pixel text-[10px] tracking-wider text-matte-fg">
          {label}
        </span>
        {hint && (
          <span className="mt-1 block font-mono-retro text-sm text-matte-fg/60">
            {hint}
          </span>
        )}
      </span>

      <span
        aria-hidden
        className="relative h-6 w-11 shrink-0 rounded-full border transition-colors"
        style={{
          background: checked ? "var(--joycon-blue)" : "var(--matte-600)",
          borderColor: checked ? "var(--joycon-blue)" : "var(--matte-600)",
          boxShadow: checked ? "0 0 10px rgba(90,179,194,0.6)" : "none",
        }}
      >
        <span
          className="absolute top-0.5 h-4 w-4 rounded-full bg-matte-fg transition-all"
          style={{ left: checked ? "1.5rem" : "0.15rem" }}
        />
      </span>
    </button>
  );
}

/**
 * Sleek matte icon button for modern chrome (sound / settings). Rounded, subtle
 * blue glow on hover, with a soft cursor tick.
 */
export function IconButton({
  children,
  active,
  ...rest
}: {
  children: ReactNode;
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onMouseEnter={() => sfx.hover()}
      {...rest}
      className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-switch)] border text-base transition-all hover:-translate-y-0.5"
      style={{
        background: "var(--matte-700)",
        color: active ? "var(--joycon-blue)" : "var(--matte-fg)",
        borderColor: active ? "var(--joycon-blue)" : "var(--matte-600)",
        boxShadow: active ? "0 0 12px rgba(90,179,194,0.5)" : "none",
      }}
    >
      {children}
    </button>
  );
}
