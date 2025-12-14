import React, { ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
  placeholderClassName?: string;
}

const OptimizedImage = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  decoding = "async",
  priority = false,
  placeholderClassName = "bg-card/10 animate-pulse",
  ...rest
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) {
      setLoaded(true);
    }
    const handleLoad = () => setLoaded(true);
    const handleError = () => setError(true);
    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);
    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [src]);

  if (error) {
    return (
      <div
        className={`relative overflow-hidden flex items-center justify-center bg-card/10 ${className}`}
      >
        <AlertTriangle className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden w-full h-full ${
        !loaded ? placeholderClassName : ""
      }`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"} block`}
        loading={priority ? "eager" : loading}
        decoding={decoding}
        fetchPriority={priority ? "high" : "auto"}
        {...rest}
      />
    </div>
  );
};

export default OptimizedImage;
