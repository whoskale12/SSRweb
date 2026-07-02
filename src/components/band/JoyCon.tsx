/**
 * Nintendo-Switch-flavoured 8-bit control cluster.
 *
 * A pixel ABXY diamond (X top, Y left, A right, B bottom) plus an optional
 * D-pad, rendered purely from theme tokens so it inherits the Joy-Con
 * red/blue accents. Decorative only — used to sprinkle console UI onto the page.
 */

interface FaceButton {
  label: string;
  /** CSS color for the button face. */
  color: string;
  /** grid position in the 3x3 diamond */
  area: string;
}

const BUTTONS: FaceButton[] = [
  { label: "X", color: "var(--joycon-blue)", area: "1 / 2 / 2 / 3" },
  { label: "Y", color: "var(--neon-yellow)", area: "2 / 1 / 3 / 2" },
  { label: "A", color: "var(--joycon-red)", area: "2 / 3 / 3 / 4" },
  { label: "B", color: "var(--neon-green)", area: "3 / 2 / 4 / 3" },
];

export function AbxyCluster({
  size = 28,
  className = "",
}: {
  /** px size of a single button */
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(3, ${size}px)`,
        gridTemplateRows: `repeat(3, ${size}px)`,
        gap: 2,
      }}
      aria-hidden
    >
      {BUTTONS.map((b) => (
        <span
          key={b.label}
          className="flex items-center justify-center font-pixel select-none"
          style={{
            gridArea: b.area,
            fontSize: size * 0.42,
            color: "var(--ink)",
            background: b.color,
            border: "2px solid var(--ink)",
            borderRadius: "50%",
            boxShadow: "2px 2px 0 0 var(--ink)",
            lineHeight: 1,
          }}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}

/**
 * A tiny Switch "home" pill — the circular home button flanked by the two
 * Joy-Con neon bars. Great as a nav marker or footer stamp.
 */
export function SwitchHomeBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-hidden>
      <span
        className="block h-6 w-2"
        style={{
          background: "var(--joycon-red)",
          border: "2px solid var(--ink)",
        }}
      />
      <span
        className="flex h-8 w-8 items-center justify-center"
        style={{
          background: "var(--card)",
          border: "2px solid var(--ink)",
          borderRadius: "50%",
          boxShadow: "2px 2px 0 0 var(--ink)",
          color: "var(--cream)",
          fontSize: 14,
        }}
      >
        ⌂
      </span>
      <span
        className="block h-6 w-2"
        style={{
          background: "var(--joycon-blue)",
          border: "2px solid var(--ink)",
        }}
      />
    </div>
  );
}
