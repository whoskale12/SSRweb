export function Marquee() {
  const text =
    "★ NEW ALBUM OUT NOW ★ READ THE ALBUM STORIES ★ LIMITED VINYL DROP ★ PRESS START ★ ";
  const loop = text.repeat(4);
  return (
    <div className="relative bg-foreground py-3 overflow-hidden">
      <div className="torn-top absolute -top-1 left-0 h-4 w-full bg-foreground" />
      <div className="flex whitespace-nowrap animate-marquee font-display text-2xl text-background">
        <span className="px-6">{loop}</span>
        <span className="px-6">{loop}</span>
      </div>
      <div className="torn-bottom absolute -bottom-1 left-0 h-4 w-full bg-foreground" />
    </div>
  );
}
