import { DashboardState } from './types'

const STORAGE_KEY = 'aero-dashboard-state'

const DEFAULT_STATE: DashboardState = {
  masterSchedule: [],
  employees: [],
  shifts: [],
  sharePointPath: '',
  lastUpdated: new Date().toISOString(),
}

export const storageManager = {
  load: (): DashboardState => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_STATE
  },

  save: (state: DashboardState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  },

  exportToJSON: (state: DashboardState): string => {
    return JSON.stringify(state, null, 2)
  },

  importFromJSON: (jsonString: string): DashboardState | null => {
    try {
      return JSON.parse(jsonString)
    } catch (e) {
      console.error('JSON Import failed:', e)
      return null
    }
  },

  downloadBackup: (state: DashboardState) => {
    const dataStr = JSON.stringify(state, null, 2)
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

    const exportFileDefaultName = `aero-dashboard-backup-${
      new Date().toISOString().split('T')[0]
    }.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  },

  uploadRecovery: (): Promise<DashboardState | null> => {
    return new Promise(resolve => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json'
      input.onchange = async (e: any) => {
        const file = e.target.files[0]
        const text = await file.text()
        resolve(storageManager.importFromJSON(text))
      }
      input.click()
    })
  },
}
