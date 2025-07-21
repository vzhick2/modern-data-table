"use client"

import type React from "react"
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { Plus, Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TableCell, TableRow } from "@/components/ui/table"
import type { NewSupplier, ValidationError } from "@/types/data-table"
import { FieldValidation } from "./field-validation"

interface AddSupplierRowProps {
  onAdd: (supplier: NewSupplier) => Promise<void>
  loading: boolean
  validationErrors: ValidationError[]
  onValidationChange: (errors: ValidationError[]) => void
  isSpreadsheetMode?: boolean
  columnWidths: any
}

export const AddSupplierRow = forwardRef<{ startAdding: () => void }, AddSupplierRowProps>(
  ({ onAdd, loading, validationErrors, onValidationChange, isSpreadsheetMode, columnWidths }, ref) => {
    const [isAdding, setIsAdding] = useState(false)
    const [formData, setFormData] = useState<NewSupplier>({
      name: "",
      website: "",
      email: "",
      phone: "",
      status: "active",
    })

    const nameInputRef = useRef<HTMLInputElement>(null)
    const websiteInputRef = useRef<HTMLInputElement>(null)
    const phoneInputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      startAdding: () => setIsAdding(true),
    }))

    useEffect(() => {
      if (isAdding && nameInputRef.current) {
        nameInputRef.current.focus()
      }
    }, [isAdding])

    const handleKeyDown = (e: React.KeyboardEvent, nextRef?: React.RefObject<HTMLInputElement>) => {
      if (e.key === "Tab" && nextRef?.current) {
        e.preventDefault()
        nextRef.current.focus()
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (isFormValid()) {
          handleSave()
        }
      } else if (e.key === "Escape") {
        handleCancel()
      }
    }

    const isFormValid = () => {
      return formData.name.trim() !== "" && formData.website.trim() !== ""
    }

    const handleSave = async () => {
      if (!isFormValid()) return

      try {
        await onAdd(formData)
        setFormData({ name: "", website: "", email: "", phone: "", status: "active" })
        onValidationChange([])
        setTimeout(() => {
          if (nameInputRef.current) {
            nameInputRef.current.focus()
          }
        }, 100)
      } catch (error) {
        // Error handling is done in the parent component
      }
    }

    const handleCancel = () => {
      setFormData({ name: "", website: "", email: "", phone: "", status: "active" })
      onValidationChange([])
      setIsAdding(false)
    }

    const handleStartAdding = () => {
      setIsAdding(true)
    }

    const getFieldError = (field: string) => {
      return validationErrors.find((error) => error.field === field)?.message
    }

    if (!isAdding) {
      return (
        <TableRow className="hover:bg-gray-50 transition-colors border-b border-gray-200">
          <TableCell className="p-0" />
          <TableCell className="p-0" />
          {!isSpreadsheetMode && <TableCell className="p-1" />}
          <TableCell colSpan={isSpreadsheetMode ? 4 : 4} className="p-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-700 h-6 text-xs"
              onClick={handleStartAdding}
            >
              <Plus className="h-3 w-3 mr-2" />
              Add new supplier (N)
            </Button>
          </TableCell>
        </TableRow>
      )
    }

    return (
      <TableRow className="hover:bg-gray-50 transition-colors border-b border-gray-200">
        <TableCell className="p-0" />
        <TableCell className="p-0" />
        {!isSpreadsheetMode && <TableCell className="p-1" />}
        <TableCell className="p-1" style={{ width: columnWidths.name }}>
          <FieldValidation error={getFieldError("name")}>
            <Input
              ref={nameInputRef}
              placeholder="Supplier name *"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (getFieldError("name")) {
                  onValidationChange(validationErrors.filter((error) => error.field !== "name"))
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, websiteInputRef)}
              className={`h-5 text-xs ${getFieldError("name") ? "border-red-500" : ""}`}
              disabled={loading}
            />
          </FieldValidation>
        </TableCell>
        <TableCell className="p-1" style={{ width: columnWidths.website }}>
          <Input
            ref={websiteInputRef}
            placeholder="Website *"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            onKeyDown={(e) => handleKeyDown(e, phoneInputRef)}
            className="h-5 text-xs"
            disabled={loading}
          />
        </TableCell>
        <TableCell className="p-1" style={{ width: columnWidths.phone }}>
          <Input
            ref={phoneInputRef}
            placeholder="Phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            onKeyDown={(e) => handleKeyDown(e)}
            className="h-5 text-xs"
            disabled={loading}
          />
        </TableCell>
        <TableCell className="p-1" style={{ width: columnWidths.status }}>
          <Select
            value={formData.status}
            onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
            disabled={loading}
          >
            <SelectTrigger className="h-5 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell className="p-1" style={{ width: columnWidths.created }}>
          <div className="flex gap-1 justify-center">
            <Button
              size="sm"
              variant="ghost"
              className="h-5 w-5 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
              onClick={handleSave}
              disabled={loading || !isFormValid()}
            >
              {loading ? <Loader2 className="h-2 w-2 animate-spin" /> : <Check className="h-2 w-2" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-5 w-5 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleCancel}
              disabled={loading}
            >
              <X className="h-2 w-2" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    )
  },
)

AddSupplierRow.displayName = "AddSupplierRow"
