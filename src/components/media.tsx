import { useEffect, useId, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Photo } from "@/lib/gallery";

export function PhotoCarousel({
  photos,
  className,
}: {
  photos: Photo[];
  className?: string;
}) {
  const [i, setI] = useState(0);
  const photo = photos[i] ?? photos[0];
  if (!photo) return null;

  return (
    <div className={cn("relative", className)}>
      <figure className="overflow-hidden rounded-xl bg-ink">
        <img
          src={photo.src}
          alt={photo.alt}
          className="media aspect-4/3 w-full object-cover sm:aspect-16/10"
        />
        <figcaption className="flex flex-col gap-1 bg-ink px-5 py-4 text-paper sm:px-6">
          <span className="text-xs font-medium tracking-widest text-paper/50 uppercase">
            {photo.project}
          </span>
          <span className="max-w-3xl text-sm leading-relaxed text-paper/90 sm:text-base">
            {photo.caption}
          </span>
        </figcaption>
      </figure>
      <div className="absolute top-1/3 right-3 left-3 flex justify-between">
        <button
          type="button"
          aria-label="Previous photo"
          className="flex size-11 items-center justify-center rounded-md bg-ink/70 text-paper transition-opacity hover:bg-ink"
          onClick={() => setI((n) => (n - 1 + photos.length) % photos.length)}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          className="flex size-11 items-center justify-center rounded-md bg-ink/70 text-paper transition-opacity hover:bg-ink"
          onClick={() => setI((n) => (n + 1) % photos.length)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {photos.map((p, idx) => (
          <button
            key={p.src}
            type="button"
            aria-label={`Show photo ${idx + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-[width,background-color] duration-200",
              idx === i ? "w-8 bg-cedar" : "w-1.5 bg-border hover:bg-muted-foreground",
            )}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [pos, setPos] = useState(52);
  const id = useId();

  return (
    <div className="relative overflow-hidden rounded-xl bg-ink select-none">
      <img src={afterSrc} alt={afterAlt} className="media aspect-4/3 w-full object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img src={beforeSrc} alt={beforeAlt} className="h-full w-full object-cover" />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-paper"
        style={{ left: `${pos}%` }}
      />
      <div
        className="pointer-events-none absolute top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper text-center leading-10 text-ink shadow-border"
        style={{ left: `${pos}%` }}
      >
        <>
          <span className="sr-only">Drag comparison</span>
          <span aria-hidden className="font-display text-lg">
            /
          </span>
        </>
      </div>
      <span className="absolute top-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-xs tracking-widest text-paper uppercase">
        Before
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-cedar/90 px-3 py-1 text-xs tracking-widest text-primary-foreground uppercase">
        After
      </span>
      <label htmlFor={id} className="sr-only">
        Drag to compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={2}
        max={98}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export function ThumbStrip({
  photos,
  onPick,
}: {
  photos: Photo[];
  onPick?: (src: string) => void;
}) {
  return (
    <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
      {photos.map((p) => (
        <button
          key={p.src}
          type="button"
          className="min-w-40 shrink-0 overflow-hidden rounded-lg bg-ink text-left shadow-border sm:min-w-0"
          onClick={() => onPick?.(p.src)}
        >
          <img src={p.src} alt={p.alt} className="media aspect-4/3 w-full object-cover" />
        </button>
      ))}
    </div>
  );
}

export function AutoAdvanceCarousel({ photos }: { photos: Photo[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % photos.length), 5000);
    return () => window.clearInterval(t);
  }, [photos.length]);
  return <PhotoCarousel photos={[...photos.slice(i), ...photos.slice(0, i)].slice(0, photos.length)} />;
}
