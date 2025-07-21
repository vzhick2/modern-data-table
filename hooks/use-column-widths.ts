"use client"

import { useState, useCallback, useEffect } from "react"

interface ColumnWidths {
  actions: number
  name: number
  website: number
  phone: number
  status: number
  created: number
}

const DEFAULT_WIDTHS: ColumnWidths = {
  actions: 140, // Single column for all three buttons
  name: 200,
  website: 180,
  phone: 140,
  status: 80,
  created: 100,
}

// Mobile widths - about 30% narrower
const MOBILE_WIDTHS: ColumnWidths = {
  actions: 100, // Reduced from 140
  name: 140,    // Reduced from 200
  website: 125, // Reduced from 180
  phone: 100,   // Reduced from 140
  status: 60,   // Reduced from 80
  created: 70,  // Reduced from 100
}

export const useColumnWidths = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(DEFAULT_WIDTHS)
  const [isResizing, setIsResizing] = useState<string | null>(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Update column widths based on screen size
  useEffect(() => {
    setColumnWidths(isMobile ? MOBILE_WIDTHS : DEFAULT_WIDTHS)
  }, [isMobile])

  const resetColumnWidths = useCallback(() => {
    setColumnWidths(isMobile ? MOBILE_WIDTHS : DEFAULT_WIDTHS)
  }, [isMobile])

  const updateColumnWidth = useCallback((columnId: string, width: number) => {
    const minWidth = isMobile ? 
      (columnId === "actions" ? 100 : 40) : 
      (columnId === "actions" ? 140 : 60)
    
    setColumnWidths((prev) => ({
      ...prev,
      [columnId]: Math.max(minWidth, width),
    }))
  }, [isMobile])

  const startResize = useCallback((columnId: string) => {
    setIsResizing(columnId)
  }, [])

  const stopResize = useCallback(() => {
    setIsResizing(null)
  }, [])

  return {
    columnWidths,
    isResizing,
    resetColumnWidths,
    updateColumnWidth,
    startResize,
    stopResize,
  }
}
