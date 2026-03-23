import React from 'react'
import { Download, Upload } from 'lucide-react'
import { DashboardState } from '../utils/types'
import { storageManager } from '../utils/storageManager'

interface ControlBarProps {
  state: DashboardState
  onStateLoaded: (state: DashboardState) => void
}

export const ControlBar: React.FC<ControlBarProps> = ({
  state,
  onStateLoaded,
}) => {
  const handleExport = () => {
    storageManager.downloadBackup(state)
    alert('✅ Backup heruntergeladen!')
  }

  const handleImport = async () => {
    const recovered = await storageManager.uploadRecovery()
    if (recovered) {
      onStateLoaded(recovered)
      alert('✅ Backup erfolgreich wiederhergestellt!')
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg flex gap-4 mb-6 flex-wrap">
      <button
        onClick={handleExport}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        <Download size={20} />
        Backup exportieren
      </button>

      <button
        onClick={handleImport}
        className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
      >
        <Upload size={20} />
        Backup wiederherstellen
      </button>
    </div>
  )
}
