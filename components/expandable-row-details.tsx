"use client"

import { useState } from "react"
import { Mail, MapPin, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TableCell, TableRow } from "@/components/ui/table"
import type { Supplier } from "@/types/data-table"

interface ExpandableRowDetailsProps {
  supplier: Supplier
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (field: keyof Supplier, value: any) => void
  isEditing: boolean
  columnWidths: any
}

export const ExpandableRowDetails = ({
  supplier,
  isExpanded,
  onToggle,
  onUpdate,
  isEditing,
  columnWidths,
}: ExpandableRowDetailsProps) => {
  const [localData, setLocalData] = useState({
    email: supplier.email || "",
    address: supplier.address || "",
    notes: supplier.notes || "",
  })

  const handleSave = (field: keyof typeof localData) => {
    onUpdate(field as keyof Supplier, localData[field])
  }

  if (!isExpanded) return null

  return (
    <TableRow className="bg-gray-25 border-b border-gray-200">
      <TableCell className="table-cell-compact" />
      <TableCell colSpan={6} className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Mail className="h-4 w-4" />
              Email Address
            </div>
            {isEditing ? (
              <Input
                type="email"
                value={localData.email}
                onChange={(e) => setLocalData({ ...localData, email: e.target.value })}
                onBlur={() => handleSave("email")}
                placeholder="supplier@company.com"
                className="h-7"
              />
            ) : (
              <div className="text-sm">
                {supplier.email ? (
                  <a href={`mailto:${supplier.email}`} className="text-blue-600 hover:underline">
                    {supplier.email}
                  </a>
                ) : (
                  <span className="text-gray-400 italic">No email address</span>
                )}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4" />
              Address
            </div>
            {isEditing ? (
              <Input
                value={localData.address}
                onChange={(e) => setLocalData({ ...localData, address: e.target.value })}
                onBlur={() => handleSave("address")}
                placeholder="123 Main St, City, State 12345"
                className="h-7"
              />
            ) : (
              <div className="text-sm">
                {supplier.address || <span className="text-gray-400 italic">No address</span>}
              </div>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText className="h-4 w-4" />
              Notes
            </div>
            {isEditing ? (
              <Textarea
                value={localData.notes}
                onChange={(e) => setLocalData({ ...localData, notes: e.target.value })}
                onBlur={() => handleSave("notes")}
                placeholder="Additional notes about this supplier..."
                className="min-h-[60px] resize-none"
              />
            ) : (
              <div className="text-sm">{supplier.notes || <span className="text-gray-400 italic">No notes</span>}</div>
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
  )
}
