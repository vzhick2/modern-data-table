# 🗂️ Modern Data Table

A professional, feature-rich data table component built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Designed for power users who need Excel-like functionality in web applications.

![Modern Data Table Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.2-black)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

## ✨ Features

### 🔥 **Power User Features**
- **📊 Spreadsheet Mode** - Excel-like bulk editing with Tab/Arrow navigation
- **⌨️ Keyboard Navigation** - Full keyboard control (Ctrl+A, Ctrl+N, Delete, etc.)
- **🖱️ Advanced Selection** - Shift-click range selection, visual focus states
- **📏 Column Resizing** - Drag-to-resize columns with persistence
- **💾 Bulk Operations** - Archive, delete, export multiple records
- **🔍 Smart Search** - Search across all fields including dates
- **📋 Inline Editing** - Edit rows directly in the table
- **📈 Purchase History** - Modal with sortable transaction history

### 🎯 **Core Functionality**
- **🔄 Real-time Updates** - Optimistic updates with loading states
- **✅ Form Validation** - Inline validation without layout shifts
- **📱 Responsive Design** - Mobile-friendly adaptive layout
- **🎨 Status Management** - Visual status badges and filtering
- **📄 Pagination** - Efficient data pagination
- **📤 Data Export** - CSV export functionality
- **🗂️ Row Expansion** - Expandable details for each record
- **⚡ Performance** - Optimized for large datasets

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui + Radix UI primitives
- **Table Engine**: TanStack Table v8 (React Table)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd modern-data-table

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the table in action.

## 📋 Usage

### Basic Implementation

```tsx
import { ModernDataTable } from '@/components/modern-data-table'

export default function MyPage() {
  return (
    <div className="container mx-auto py-8">
      <ModernDataTable />
    </div>
  )
}
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + N` | Add new record |
| `Ctrl/Cmd + A` | Select all rows |
| `Delete` | Delete selected rows |
| `Tab` | Navigate cells (spreadsheet mode) |
| `Shift + Tab` | Navigate cells backwards |
| `Arrow Keys` | Move between cells/rows |
| `Escape` | Exit spreadsheet mode |
| `Enter` | Edit focused row |

### Spreadsheet Mode

1. Click the **"Spreadsheet Mode"** button in floating controls
2. Use Tab/Shift+Tab to navigate between editable cells
3. Use Arrow keys for directional movement
4. Make changes to multiple rows
5. Click **"Save All Changes"** to commit bulk updates
6. Or **"Cancel"** to discard changes

## 🧩 Component Architecture

### Core Components
- `ModernDataTable` - Main table component
- `EditableSupplierRow` - Individual row with inline editing
- `SpreadsheetCell` - Excel-like cell editing
- `FloatingControls` - Action buttons and mode toggles
- `PurchaseHistoryModal` - Related data modal

### Essential Hooks
- `useDataTable` - Core data management and CRUD operations
- `useSpreadsheetMode` - Bulk editing state and change tracking
- `useKeyboardNavigation` - Keyboard shortcuts and focus management
- `useColumnWidths` - Column resizing and layout persistence
- `useSelection` - Multi-row selection with shift-click

### Utility Components
- `FieldValidation` - Inline error display wrapper
- `StatusBadge` - Visual status indicators
- `ConfirmationDialog` - Safe destructive action dialogs
- `ColumnResizer` - Drag-to-resize column handles

## 🎨 Customization

### Adapting for Your Data

1. **Update Type Definitions** (`types/data-table.ts`)
```typescript
export interface YourDataType {
  id: string
  // Your fields here
  status: "active" | "inactive"
  createdAt: Date
}
```

2. **Modify Column Definitions** (`components/modern-data-table.tsx`)
```typescript
const columns = useMemo(() => [
  columnHelper.accessor("yourField", {
    header: "Your Field",
    cell: ({ getValue }) => getValue(),
  }),
  // Add your columns
], [])
```

3. **Update Data Hook** (`hooks/use-data-table.ts`)
```typescript
// Replace mock data with your API calls
const { data, loading, error } = useYourDataAPI()
```

## 📊 Performance

- **Optimized Rendering**: Only re-renders changed components
- **Efficient State Management**: Minimal re-renders with proper memoization
- **Bulk Operations**: Batched API calls for better performance
- **Virtual Scrolling Ready**: Can be extended with react-virtual for 1000+ rows

## 🧪 Testing

```bash
# Run tests (when implemented)
pnpm test

# Run linting
pnpm lint

# Type checking
pnpm type-check
```

## 📈 Roadmap

- [ ] Virtual scrolling for large datasets
- [ ] Column sorting persistence
- [ ] Advanced filtering UI
- [ ] Drag & drop row reordering
- [ ] Column hiding/showing
- [ ] Data import from CSV/Excel
- [ ] Real-time collaborative editing
- [ ] Undo/Redo system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [v0.dev](https://v0.dev) for rapid prototyping
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Table functionality powered by [TanStack Table](https://tanstack.com/table)
- Icons from [Lucide React](https://lucide.dev/)

---

**⭐ Star this repo if you find it useful!**
