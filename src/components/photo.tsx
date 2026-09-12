/* Static responsive images: no image optimization server is needed on Pages. */
/* eslint-disable @next/next/no-img-element */
import imageManifest from "@/content/image-manifest.json";

type ImageEntry = { width: number; height: number; sources: { src: string; width: number }[] };
const images = imageManifest as Record<string, ImageEntry>;

export function Photo({ src, alt, fill = true, sizes = "100vw", priority = false, className = "", objectPosition, width, height }: {
  src: string; alt: string; fill?: boolean; sizes?: string; priority?: boolean;
  className?: string; objectPosition?: string; width?: number; height?: number;
}) {
  const entry = images[src];
  return <img
    src={src}
    srcSet={entry?.sources.map((source) => `${source.src} ${source.width}w`).join(", ")}
    sizes={sizes}
    alt={alt}
    width={width ?? entry?.width ?? 1600}
    height={height ?? entry?.height ?? 1200}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : undefined}
    decoding="async"
    className={`${fill ? "absolute inset-0 h-full w-full object-cover" : "h-auto w-full"} ${className}`}
    style={objectPosition ? { objectPosition } : undefined}
  />;
}
