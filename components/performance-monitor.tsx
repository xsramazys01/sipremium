"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePiP } from "../lib/pip-context"
import { Monitor, Trash2, RefreshCw } from "lucide-react"

export default function PerformanceMonitor() {
  const { videoCache, clearCache } = usePiP()
  const [memoryUsage, setMemoryUsage] = useState<number>(0)
  const [cacheSize, setCacheSize] = useState<number>(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Calculate cache size
    const size = Object.keys(videoCache).length
    setCacheSize(size)

    // Estimate memory usage (rough calculation)
    const estimatedMemory = size * 5 // Assume ~5MB per cached video
    setMemoryUsage(estimatedMemory)
  }, [videoCache])

  // Auto-hide after 5 seconds of no activity
  useEffect(() => {
    if (cacheSize > 0) {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [cacheSize])

  if (!isVisible || cacheSize === 0) return null

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="w-64 bg-white/90 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Video Cache
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Cached Videos:</span>
              <Badge variant="secondary">{cacheSize}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Est. Memory:</span>
              <Badge variant={memoryUsage > 50 ? "destructive" : "secondary"}>~{memoryUsage}MB</Badge>
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={clearCache} className="flex-1 text-xs bg-transparent">
                <Trash2 className="w-3 h-3 mr-1" />
                Clear Cache
              </Button>
              <Button size="sm" variant="outline" onClick={() => window.location.reload()} className="flex-1 text-xs">
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
