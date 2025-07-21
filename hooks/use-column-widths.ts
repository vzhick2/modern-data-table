"use client"

import { useState, useCallback } from "react"

interface ColumnWidths {
  edit: number
  select: number
  name: number
  website: number
  phone: number
  status: number
  created: number
}

const DEFAULT_WIDTHS: ColumnWidths = {
  edit: 20, // Minimal width for just the icon
  select: 80, // Wider to accommodate checkbox + data insights button
  name: 200,
  website: 180,
  phone: 140,
  status: 80,
  created: 100,
}

export const useColumnWidths = () => {
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(DEFAULT_WIDTHS)
  const [isResizing, setIsResizing] = useState<string | null>(null)

  const resetColumnWidths = useCallback(() => {
    setColumnWidths(DEFAULT_WIDTHS)
  }, [])

  const updateColumnWidth = useCallback((columnId: string, width: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [columnId]: Math.max(columnId === "edit" ? 20 : columnId === "select" ? 80 : 60, width),
    }))
  }, [])

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
