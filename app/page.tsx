import { ModernDataTable } from "@/components/modern-data-table"

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Management</h1>
        <p className="text-gray-600">
          Manage your suppliers with inline editing, keyboard navigation, and bulk operations.
        </p>
      </div>

      <ModernDataTable />
    </div>
  )
}
