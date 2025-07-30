"use client"

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react"

interface PiPVideo {
  id: string
  src: string
  title: string
  thumbnail: string
  duration: string
  currentTime: number
  isPlaying: boolean
  quality?: "auto" | "720p" | "1080p" | "4k"
  preloaded?: boolean
}

interface VideoCache {
  [key: string]: {
    blob?: Blob
    preloaded: boolean
    lastAccessed: number
  }
}

interface PiPContextType {
  pipVideo: PiPVideo | null
  isPiPActive: boolean
  videoCache: VideoCache
  startPiP: (video: PiPVideo) => void
  stopPiP: () => void
  updatePiPTime: (currentTime: number) => void
  togglePiPPlay: () => void
  preloadVideo: (src: string) => Promise<void>
  clearCache: () => void
  getCachedVideoUrl: (src: string) => string
}

const PiPContext = createContext<PiPContextType | undefined>(undefined)

export function PiPProvider({ children }: { children: ReactNode }) {
  const [pipVideo, setPipVideo] = useState<PiPVideo | null>(null)
  const [isPiPActive, setIsPiPActive] = useState(false)
  const [videoCache, setVideoCache] = useState<VideoCache>({})
  const preloadingRef = useRef<Set<string>>(new Set())

  const preloadVideo = useCallback(
    async (src: string) => {
      // Skip if already preloading or cached
      if (preloadingRef.current.has(src) || videoCache[src]?.preloaded) {
        return
      }

      preloadingRef.current.add(src)

      try {
        // For placeholder URLs, we'll simulate preloading
        if (src.includes("placeholder.svg")) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          setVideoCache((prev) => ({
            ...prev,
            [src]: {
              preloaded: true,
              lastAccessed: Date.now(),
            },
          }))
          return
        }

        // For real videos, preload the actual content
        const response = await fetch(src)
        const blob = await response.blob()

        setVideoCache((prev) => ({
          ...prev,
          [src]: {
            blob,
            preloaded: true,
            lastAccessed: Date.now(),
          },
        }))
      } catch (error) {
        console.warn("Failed to preload video:", src, error)
      } finally {
        preloadingRef.current.delete(src)
      }
    },
    [videoCache],
  )

  const getCachedVideoUrl = useCallback(
    (src: string) => {
      const cached = videoCache[src]
      if (cached?.blob) {
        // Update last accessed time
        setVideoCache((prev) => ({
          ...prev,
          [src]: {
            ...prev[src],
            lastAccessed: Date.now(),
          },
        }))
        return URL.createObjectURL(cached.blob)
      }
      return src
    },
    [videoCache],
  )

  const clearCache = useCallback(() => {
    // Clean up blob URLs to prevent memory leaks
    Object.values(videoCache).forEach((cached) => {
      if (cached.blob) {
        URL.revokeObjectURL(URL.createObjectURL(cached.blob))
      }
    })
    setVideoCache({})
  }, [videoCache])

  const startPiP = useCallback(
    (video: PiPVideo) => {
      setPipVideo(video)
      setIsPiPActive(true)

      // Preload the video if not already cached
      if (!videoCache[video.src]?.preloaded) {
        preloadVideo(video.src)
      }
    },
    [videoCache, preloadVideo],
  )

  const stopPiP = useCallback(() => {
    setPipVideo(null)
    setIsPiPActive(false)
  }, [])

  const updatePiPTime = useCallback((currentTime: number) => {
    setPipVideo((prev) => (prev ? { ...prev, currentTime } : null))
  }, [])

  const togglePiPPlay = useCallback(() => {
    setPipVideo((prev) => (prev ? { ...prev, isPlaying: !prev.isPlaying } : null))
  }, [])

  return (
    <PiPContext.Provider
      value={{
        pipVideo,
        isPiPActive,
        videoCache,
        startPiP,
        stopPiP,
        updatePiPTime,
        togglePiPPlay,
        preloadVideo,
        clearCache,
        getCachedVideoUrl,
      }}
    >
      {children}
    </PiPContext.Provider>
  )
}

export function usePiP() {
  const context = useContext(PiPContext)
  if (context === undefined) {
    throw new Error("usePiP must be used within a PiPProvider")
  }
  return context
}
