"use client";

import { Image as ChakraImage, ImageProps, Skeleton } from "@chakra-ui/react";
import { useState, memo } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "loading"> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  enableLazyLoading?: boolean;
}

export const OptimizedImage = memo(
  ({
    src,
    alt,
    fallbackSrc = "/api/placeholder/300/300",
    enableLazyLoading = true,
    ...props
  }: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(true);
    };

    return (
      <>
        {!isLoaded && (
          <Skeleton
            height={props.h || props.height || "300px"}
            width={props.w || props.width || "100%"}
            borderRadius={props.borderRadius || "md"}
            position="absolute"
            top={0}
            left={0}
            zIndex={1}
          />
        )}
        <ChakraImage
          src={hasError ? fallbackSrc : src}
          alt={alt}
          loading={enableLazyLoading ? "lazy" : "eager"}
          onLoad={handleLoad}
          onError={handleError}
          opacity={isLoaded ? 1 : 0}
          transition="opacity 0.3s ease-in-out"
          {...props}
        />
      </>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";
