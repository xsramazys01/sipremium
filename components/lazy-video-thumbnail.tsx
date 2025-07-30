"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Loader2 } from "lucide-react"
import { usePiP } from "../lib/pip-context"

interface LazyVideoThumbnailProps {
  src: string
  thumbnail: string
  title: string
  duration: string
  className?: string
  onLoadStart?: () => void
  onLoadComplete?: () => void
}

export default function LazyVideoThumbnail({
  src,
  thumbnail,
  title,
  duration,
  className = "",
  onLoadStart,
  onLoadComplete,
}: LazyVideoThumbnailProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { preloadVideo } = usePiP()

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Preload video on hover
  const handleMouseEnter = () => {
    if (!isLoading) {
      setIsLoading(true)
      onLoadStart?.()
      preloadVideo(src).finally(() => {
        setIsLoading(false)
        onLoadComplete?.()
      })
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video bg-gray-100 rounded-lg overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {/* Lazy loaded thumbnail */}
      {isVisible && (
        <>
          <img
            ref={imgRef}
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />

          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
          )}

          {/* Error placeholder */}
          {imageError && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Play className="w-6 h-6" />
                </div>
                <p className="text-sm">Image failed to load</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Skeleton loader when not visible */}
      {!isVisible && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

      {/* Play button overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          {isLoading ? (
            <Loader2 className="w-8 h-8 text-gray-800 animate-spin" />
          ) : (
            <Play className="w-8 h-8 text-gray-800 ml-1" />
          )}
        </div>
      </div>

      {/* Duration badge */}
      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">{duration}</div>

      {/* Preloading indicator */}
      {isLoading && (
        <div className="absolute top-2 left-2 bg-blue-500/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          Preloading...
        </div>
      )}
    </div>
  )
}
