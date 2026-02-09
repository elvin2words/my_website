import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StableMediaImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  skeletonClassName?: string;
}

export function StableMediaImage({
  containerClassName,
  skeletonClassName,
  className,
  onLoad,
  src,
  loading = "lazy",
  decoding = "async",
  ...props
}: StableMediaImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {!isLoaded && (
        <Skeleton
          className={cn(
            "absolute inset-0 rounded-none bg-gradient-to-br from-white/10 to-white/5",
            skeletonClassName,
          )}
        />
      )}
      <img
        {...props}
        src={src}
        loading={loading}
        decoding={decoding}
        className={cn(
          "h-full w-full transition-opacity duration-500 ease-out",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
      />
    </div>
  );
}
