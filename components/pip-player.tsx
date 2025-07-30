"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { usePiP } from "../lib/pip-context"
import { Play, Pause, X, Maximize2, Minimize2, Volume2, VolumeX, Loader2 } from "lucide-react"

export default function PiPPlayer() {
  const { pipVideo, isPiPActive, stopPiP, updatePiPTime, togglePiPPlay, getCachedVideoUrl } = usePiP()
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [totalDuration, setTotalDuration] = useState(0)
  const [isBuffering, setIsBuffering] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 })

  // Get optimized video URL
  const videoSrc = pipVideo ? getCachedVideoUrl(pipVideo.src) : ""

  useEffect(() => {
    if (pipVideo && videoRef.current) {
      const video = videoRef.current

      // Reset error state
      setVideoError(false)
      setIsBuffering(true)

      // Set video source
      video.src = videoSrc
      video.currentTime = pipVideo.currentTime

      // Configure video for better performance
      video.preload = "metadata"
      video.playsInline = true

      if (pipVideo.isPlaying) {
        video.play().catch((error) => {
          console.warn("Failed to play video:", error)
          setVideoError(true)
        })
      } else {
        video.pause()
      }
    }
  }, [pipVideo, videoSrc])

  const handleVideoLoad = useCallback(() => {
    setIsBuffering(false)
    setVideoError(false)
  }, [])

  const handleVideoError = useCallback(() => {
    setIsBuffering(false)
    setVideoError(true)
    console.error("Video failed to load:", pipVideo?.src)
  }, [pipVideo?.src])

  const handleVideoWaiting = useCallback(() => {
    setIsBuffering(true)
  }, [])

  const handleVideoCanPlay = useCallback(() => {
    setIsBuffering(false)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newX = e.clientX - dragRef.current.startX + dragRef.current.startPosX
      const newY = e.clientY - dragRef.current.startY + dragRef.current.startPosY

      // Keep player within viewport bounds
      const maxX = window.innerWidth - (isMinimized ? 200 : 320)
      const maxY = window.innerHeight - (isMinimized ? 60 : 240)

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isMinimized])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      updatePiPTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setTotalDuration(videoRef.current.duration)
    }
  }

  const togglePlay = () => {
    togglePiPPlay()
    if (videoRef.current) {
      if (pipVideo?.isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((error) => {
          console.warn("Failed to play video:", error)
          setVideoError(true)
        })
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      // Clean up video source to free memory
      videoRef.current.src = ""
    }
    stopPiP()
  }

  if (!isPiPActive || !pipVideo) return null

  return (
    <div
      ref={playerRef}
      className={`fixed z-[9999] transition-all duration-300 ${isMinimized ? "w-48 h-14" : "w-80 h-60"} select-none`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <Card className="h-full bg-black border-2 border-gray-300 shadow-2xl overflow-hidden">
        {isMinimized ? (
          // Minimized view
          <div className="h-full flex items-center justify-between p-3 bg-gray-900 text-white">
            <div className="flex items-center gap-2 flex-1 cursor-move" onMouseDown={handleMouseDown}>
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                {isBuffering ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : videoError ? (
                  <X className="w-4 h-4 text-red-400" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{pipVideo.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={togglePlay}
                disabled={videoError}
                className="h-8 w-8 p-0 text-white hover:bg-gray-700 disabled:opacity-50"
              >
                {isBuffering ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : pipVideo.isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(false)}
                className="h-8 w-8 p-0 text-white hover:bg-gray-700"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleClose}
                className="h-8 w-8 p-0 text-white hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          // Full view
          <div
            className="relative h-full group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              onWaiting={handleVideoWaiting}
              onCanPlay={handleVideoCanPlay}
              onEnded={() => togglePiPPlay()}
              muted={isMuted}
              playsInline
              preload="metadata"
            />

            {/* Loading/Error overlay */}
            {(isBuffering || videoError) && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                {isBuffering ? (
                  <div className="flex flex-col items-center gap-2 text-white">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-sm">Loading...</span>
                  </div>
                ) : videoError ? (
                  <div className="flex flex-col items-center gap-2 text-white">
                    <X className="w-8 h-8 text-red-400" />
                    <span className="text-sm">Failed to load video</span>
                  </div>
                ) : null}
              </div>
            )}

            {/* Drag handle */}
            <div
              className={`absolute top-0 left-0 right-0 h-8 cursor-move bg-gradient-to-b from-black/50 to-transparent transition-opacity ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
              onMouseDown={handleMouseDown}
            />

            {/* Controls overlay */}
            <div className={`absolute inset-0 transition-opacity ${showControls ? "opacity-100" : "opacity-0"}`}>
              {/* Top controls */}
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(true)}
                  className="h-8 w-8 p-0 bg-black/50 text-white hover:bg-black/70"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleClose}
                  className="h-8 w-8 p-0 bg-black/50 text-white hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Center play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={togglePlay}
                  disabled={videoError}
                  className="w-16 h-16 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                >
                  {isBuffering ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : pipVideo.isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>
              </div>

              {/* Bottom controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="mb-2">
                  <h4 className="text-white text-sm font-medium truncate">{pipVideo.title}</h4>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={togglePlay}
                    disabled={videoError}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    {isBuffering ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : pipVideo.isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleMute}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <div className="flex-1 flex items-center gap-2 text-xs">
                    <span>{formatTime(pipVideo.currentTime)}</span>
                    <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-300"
                        style={{
                          width: `${totalDuration ? (pipVideo.currentTime / totalDuration) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span>{formatTime(totalDuration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
