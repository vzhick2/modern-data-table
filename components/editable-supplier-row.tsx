"use client"

import type React from "react"
import { SpreadsheetCell } from "./spreadsheet-cell"

import { useState, useRef, useEffect } from "react"
import { Check, X, Loader2, Edit, ExternalLink, Undo2, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TableCell, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import type { Supplier, EditingRow } from "@/types/data-table"
import { StatusBadge } from "./status-badge"

interface EditableSupplierRowProps {
  supplier: Supplier
  isSelected: boolean
  isFocused: boolean
  onSelect: (selected: boolean, event?: React.MouseEvent) => void
  editingRow: EditingRow | null
  isSaving: boolean
  onEdit: (rowId: string, data: Partial<Supplier>) => void
  onSave: (data: Partial<Supplier>) => void
  onCancel: () => void
  onToggleExpand: () => void
  isExpanded: boolean
  isSpreadsheetMode?: boolean
  hasRowChanges?: boolean
  onSpreadsheetChange?: (rowId: string, field: keyof Supplier, value: any) => void
  onUndoRowChanges?: () => void
  onShowPurchaseHistory?: () => void
  onCellClick?: (row: number, col: number) => void
  rowIndex: number
  columnWidths: any
}

export const EditableSupplierRow = ({
  supplier,
  isSelected,
  isFocused,
  onSelect,
  editingRow,
  isSaving,
  onEdit,
  onSave,
  onCancel,
  onToggleExpand,
  isExpanded,
  isSpreadsheetMode,
  hasRowChanges,
  onSpreadsheetChange,
  onUndoRowChanges,
  onShowPurchaseHistory,
  onCellClick,
  rowIndex,
  columnWidths,
}: EditableSupplierRowProps) => {
  const isEditing = editingRow?.rowId === supplier.id
  const [formData, setFormData] = useState<Partial<Supplier>>({
    name: supplier.name,
    website: supplier.website || "",
    phone: supplier.phone || "",
    status: supplier.status,
  })

  const nameInputRef = useRef<HTMLInputElement>(null)
  const websiteInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus()
      nameInputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: supplier.name,
        website: supplier.website || "",
        phone: supplier.phone || "",
        status: supplier.status,
      })
    }
  }, [isEditing, supplier])

  // Handle escape key in edit mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditing && e.key === "Escape") {
        e.preventDefault()
        onCancel()
      }
    }

    if (isEditing) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isEditing, onCancel])

  const handleKeyDown = (e: React.KeyboardEvent, nextRef?: React.RefObject<HTMLInputElement>) => {
    if (e.key === "Tab" && nextRef?.current) {
      e.preventDefault()
      nextRef.current.focus()
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (isFormValid()) {
        onSave(formData)
      }
    }
  }

  const isFormValid = () => {
    return formData.name?.trim() !== "" && formData.website?.trim() !== ""
  }

  const handleStartEdit = () => {
    onEdit(supplier.id, formData)
  }

  const handleUndoRowChanges = () => {
    if (onUndoRowChanges) {
      onUndoRowChanges()
    }
  }

  const handleCheckboxClick = (event: React.MouseEvent) => {
    onSelect(!isSelected, event)
  }

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't expand if clicking on interactive elements
    const target = e.target as HTMLElement
    if (
      target.closest("input") ||
      target.closest("select") ||
      target.closest("button") ||
      target.closest("a") ||
      target.closest('[role="checkbox"]')
    ) {
      return
    }

    if (!isSpreadsheetMode) {
      onToggleExpand()
    }
  }

  const handleSpreadsheetChange = (field: keyof Supplier, value: any) => {
    if (onSpreadsheetChange) {
      onSpreadsheetChange(supplier.id, field, value)
    }
  }

  const handleCellClick = (colIndex: number) => {
    if (onCellClick && isSpreadsheetMode) {
      onCellClick(rowIndex, colIndex)
    }
  }

  // Standard button container component for consistent alignment
  const ButtonContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex items-center justify-center h-12 w-full ${className}`}>{children}</div>
  )

  if (isEditing) {
    return (
      <TableRow className="bg-gray-50 border-b border-gray-200 h-12">
        <TableCell className="p-0 h-12" style={{ width: columnWidths.actions }}>
          <div className="flex items-center justify-center gap-3 h-12 px-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(!!checked)}
              aria-label="Select row"
              className="h-4 w-4 checkbox-action"
              disabled={isSaving}
            />
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 action-button edit-action"
              onClick={() => onSave(formData)}
              disabled={isSaving || !isFormValid()}
              title="Save changes (Enter)"
            >
              {isSaving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 action-button data-action"
              onClick={onCancel}
              disabled={isSaving}
              title="Cancel changes (Escape)"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </TableCell>
        <TableCell className="p-1 h-12" style={{ width: columnWidths.name }}>
          <Input
            ref={nameInputRef}
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onKeyDown={(e) => handleKeyDown(e, websiteInputRef)}
            className="h-8 text-xs"
            disabled={isSaving}
            placeholder="Supplier name *"
          />
        </TableCell>
        <TableCell className="p-1 h-12" style={{ width: columnWidths.website }}>
          <Input
            ref={websiteInputRef}
            value={formData.website || ""}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            onKeyDown={(e) => handleKeyDown(e, phoneInputRef)}
            className="h-8 text-xs"
            disabled={isSaving}
            placeholder="Website *"
          />
        </TableCell>
        <TableCell className="p-1 h-12" style={{ width: columnWidths.phone }}>
          <Input
            ref={phoneInputRef}
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            onKeyDown={(e) => handleKeyDown(e)}
            className="h-8 text-xs"
            disabled={isSaving}
            placeholder="Phone number"
          />
        </TableCell>
        <TableCell className="p-1 h-12" style={{ width: columnWidths.status }}>
          <Select
            value={formData.status}
            onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
            disabled={isSaving}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell className="p-1 h-12" style={{ width: columnWidths.created }}>
          <ButtonContainer>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onCancel}
              disabled={isSaving}
              title="Cancel changes (Escape)"
            >
              <X className="h-3 w-3" />
            </Button>
          </ButtonContainer>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableRow
      className={`hover:bg-gray-50 transition-colors group cursor-pointer border-b border-gray-200 h-12 ${
        isFocused ? "ring-2 ring-blue-200" : ""
      } ${isExpanded ? "bg-blue-25" : ""} ${hasRowChanges ? "bg-yellow-25 border-l-4 border-yellow-400" : ""}`}
      data-state={isSelected && "selected"}
      onClick={handleRowClick}
    >
      <TableCell className="p-0 h-12" style={{ width: columnWidths.actions }}>
        {!isSpreadsheetMode ? (
          <div className="flex items-center justify-center gap-3 h-12 px-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(!!checked)}
              onClick={handleCheckboxClick}
              aria-label="Select row"
              className="h-4 w-4 hover:bg-gray-100 checkbox-action"
            />
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50 action-button edit-action"
              onClick={handleStartEdit}
              title="Edit supplier"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 action-button data-action"
              onClick={onShowPurchaseHistory}
              title="View purchase history"
            >
              <BarChart3 className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-12 px-2">
            {hasRowChanges ? (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                onClick={handleUndoRowChanges}
                title="Undo changes to this row"
              >
                <Undo2 className="h-3 w-3" />
              </Button>
            ) : (
              <div className="h-7 w-7" />
            )}
          </div>
        )}
      </TableCell>
      <TableCell
        className="font-medium text-xs p-1 h-12"
        style={{ width: columnWidths.name, maxWidth: columnWidths.name }}
      >
        {isSpreadsheetMode ? (
          <div onClick={() => handleCellClick(0)} className="h-full flex items-center">
            <SpreadsheetCell
              value={supplier.name}
              field="name"
              rowId={supplier.id}
              rowIndex={rowIndex}
              colIndex={0}
              isSpreadsheetMode={isSpreadsheetMode}
              hasChanges={hasRowChanges}
              onChange={handleSpreadsheetChange}
            />
          </div>
        ) : (
          <div className="h-full flex items-center">
            <div className="cell-content" title={supplier.name}>
              {supplier.name}
            </div>
          </div>
        )}
      </TableCell>
      <TableCell className="text-xs p-1 h-12" style={{ width: columnWidths.website, maxWidth: columnWidths.website }}>
        {isSpreadsheetMode ? (
          <div onClick={() => handleCellClick(1)} className="h-full flex items-center">
            <SpreadsheetCell
              value={supplier.website}
              field="website"
              rowId={supplier.id}
              rowIndex={rowIndex}
              colIndex={1}
              isSpreadsheetMode={isSpreadsheetMode}
              hasChanges={hasRowChanges}
              onChange={handleSpreadsheetChange}
            />
          </div>
        ) : (
          <div className="h-full flex items-center">
            {supplier.website ? (
              <a
                href={supplier.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                title={supplier.website}
              >
                <span className="cell-content">{supplier.website.replace(/^https?:\/\//, "")}</span>
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
              </a>
            ) : (
              <span className="text-gray-400 italic">No website</span>
            )}
          </div>
        )}
      </TableCell>
      <TableCell className="text-xs p-1 h-12" style={{ width: columnWidths.phone, maxWidth: columnWidths.phone }}>
        {isSpreadsheetMode ? (
          <div onClick={() => handleCellClick(2)} className="h-full flex items-center">
            <SpreadsheetCell
              value={supplier.phone}
              field="phone"
              rowId={supplier.id}
              rowIndex={rowIndex}
              colIndex={2}
              isSpreadsheetMode={isSpreadsheetMode}
              hasChanges={hasRowChanges}
              onChange={handleSpreadsheetChange}
            />
          </div>
        ) : (
          <div className="h-full flex items-center">
            {supplier.phone ? (
              <a
                href={`tel:${supplier.phone}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
                title={supplier.phone}
              >
                <div className="cell-content">{supplier.phone}</div>
              </a>
            ) : (
              <span className="text-gray-400 italic">No phone</span>
            )}
          </div>
        )}
      </TableCell>
      <TableCell className="text-xs p-1 h-12" style={{ width: columnWidths.status }}>
        {isSpreadsheetMode ? (
          <div onClick={() => handleCellClick(3)} className="h-full flex items-center">
            <SpreadsheetCell
              value={supplier.status}
              field="status"
              rowId={supplier.id}
              rowIndex={rowIndex}
              colIndex={3}
              isSpreadsheetMode={isSpreadsheetMode}
              hasChanges={hasRowChanges}
              onChange={handleSpreadsheetChange}
            />
          </div>
        ) : (
          <div className="h-full flex items-center">
            <StatusBadge status={supplier.status} />
          </div>
        )}
      </TableCell>
      <TableCell className="text-xs p-1 h-12" style={{ width: columnWidths.created }}>
        <div className="h-full flex items-center">
          <span title={supplier.createdAt.toLocaleString()}>{supplier.createdAt.toLocaleDateString()}</span>
        </div>
      </TableCell>
    </TableRow>
  )
}
