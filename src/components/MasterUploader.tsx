import React, { useRef } from 'react'
import { Upload, RefreshCw } from 'lucide-react'
import { parseExcelFile } from '../utils/excelParser'

interface MasterUploaderProps {
  onDataLoaded: (data: any[]) => void
  sharePointPath: string
  onPathChange: (path: string) => void
  isLoading: boolean
}

export const MasterUploader: React.FC<MasterUploaderProps> = ({
  onDataLoaded,
  sharePointPath,
  onPathChange,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const data = await parseExcelFile(file)
      onDataLoaded(data)
      onPathChange(file.name)
      console.log('Master Schedule geladen:', data.length, 'Einträge')
      alert(`✅ Datei erfolgreich geladen! ${data.length} Einträge`)
    } catch (error) {
      console.error('Fehler beim Parsen:', error)
      alert('❌ Fehler beim Laden der Datei')
    }
  }

  const handleRefresh = async () => {
    if (!sharePointPath) {
      alert('Bitte erst eine Datei hochladen')
      return
    }

    alert('Refresh-Funktion: Laden Sie die aktualisierte Datei neu hoch.')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex gap-4 items-center flex-wrap">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Upload size={20} />
          Master Plan hochladen
        </button>

        <button
          onClick={handleRefresh}
          disabled={isLoading || !sharePointPath}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          <RefreshCw size={20} />
          Aktualisieren
        </button>

        {sharePointPath && (
          <div className="text-sm text-gray-600">
            <p className="font-semibold">Datei:</p>
            <p className="truncate text-xs">{sharePointPath}</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xlsm,.xls"
          onChange={handleFileUpload}
          hidden
        />
      </div>
    </div>
  )
}
