import React, { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
  placeholderClassName?: string;
}

export const usePrefetchImages = (srcs: string[] | undefined) => {
  useEffect(() => {
    if (!srcs || srcs.length === 0) return;
    const imgs: HTMLImageElement[] = [];
    for (const src of srcs) {
      const img = new Image();
      img.src = src;
      imgs.push(img);
    }
    return () => {
      imgs.forEach((i) => {
        // clear reference
      });
    };
  }, [srcs]);
};

const OptimizedImage = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  decoding = "async",
  onError,
  priority = false,
  placeholderClassName = "bg-muted-foreground/10 animate-pulse",
  ...rest
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) setLoaded(true);
    const handle = () => setLoaded(true);
    img.addEventListener("load", handle);
    return () => img.removeEventListener("load", handle);
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${
        !loaded ? placeholderClassName : ""
      }`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "" : "opacity-0"}`}
        loading={priority ? "eager" : (loading as any)}
        decoding={decoding}
        fetchpriority={priority ? ("high" as any) : ("low" as any)}
        onError={onError}
        {...rest}
      />
    </div>
  );
};

export default OptimizedImage;
