"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface PiPVideo {
  id: string
  src: string
  title: string
  thumbnail: string
  duration: string
  currentTime: number
  isPlaying: boolean
}

interface PiPContextType {
  pipVideo: PiPVideo | null
  isPiPActive: boolean
  startPiP: (video: PiPVideo) => void
  stopPiP: () => void
  updatePiPTime: (currentTime: number) => void
  togglePiPPlay: () => void
}

const PiPContext = createContext<PiPContextType | undefined>(undefined)

export function PiPProvider({ children }: { children: ReactNode }) {
  const [pipVideo, setPipVideo] = useState<PiPVideo | null>(null)
  const [isPiPActive, setIsPiPActive] = useState(false)

  const startPiP = (video: PiPVideo) => {
    setPipVideo(video)
    setIsPiPActive(true)
  }

  const stopPiP = () => {
    setPipVideo(null)
    setIsPiPActive(false)
  }

  const updatePiPTime = (currentTime: number) => {
    if (pipVideo) {
      setPipVideo({ ...pipVideo, currentTime })
    }
  }

  const togglePiPPlay = () => {
    if (pipVideo) {
      setPipVideo({ ...pipVideo, isPlaying: !pipVideo.isPlaying })
    }
  }

  return (
    <PiPContext.Provider
      value={{
        pipVideo,
        isPiPActive,
        startPiP,
        stopPiP,
        updatePiPTime,
        togglePiPPlay,
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
