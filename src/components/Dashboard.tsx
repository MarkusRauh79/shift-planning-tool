import React, { useState, useEffect } from 'react'
import {
  DashboardState,
  MasterSchedule,
  Employee,
} from '../utils/types'
import { storageManager } from '../utils/storageManager'
import { MasterUploader } from './MasterUploader'
import { ControlBar } from './ControlBar'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'

export const Dashboard: React.FC = () => {
  const [state, setState] = useState<DashboardState>(storageManager.load())
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    storageManager.save(state)
  }, [state])

  const handleMasterDataLoaded = (masterSchedule: MasterSchedule[]) => {
    setState(prev => ({
      ...prev,
      masterSchedule,
      lastUpdated: new Date().toISOString(),
    }))
  }

  const handleStateLoaded = (newState: DashboardState) => {
    setState(newState)
  }

  const handlePathChange = (path: string) => {
    setState(prev => ({
      ...prev,
      sharePointPath: path,
    }))
  }

  useEffect(() => {
    if (state.employees.length === 0) {
      const demoEmployees: Employee[] = [
        {
          id: '1',
          name: 'John Doe',
          department: 'Aerodynamics',
          color: '#3B82F6',
        },
        {
          id: '2',
          name: 'Jane Smith',
          department: 'Aerodynamics',
          color: '#EF4444',
        },
        {
          id: '3',
          name: 'Bob Wilson',
          department: 'Aerodynamics',
          color: '#10B981',
        },
      ]
      setState(prev => ({
        ...prev,
        employees: demoEmployees,
      }))
    }
  }, [])

  const generateDateRange = (): string[] => {
    const dates: string[] = []
    const today = new Date()
    for (let i = 0; i < 28; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const dateRange = generateDateRange()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            AERO Schichtplanungs-Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Zuletzt aktualisiert:{' '}
            {new Date(state.lastUpdated).toLocaleString('de-DE')}
          </p>
        </div>

        <ControlBar state={state} onStateLoaded={handleStateLoaded} />

        <MasterUploader
          onDataLoaded={handleMasterDataLoaded}
          sharePointPath={state.sharePointPath}
          onPathChange={handlePathChange}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            <LeftPanel masterSchedule={state.masterSchedule} currentWeek={1} />
          </div>

          <div className="lg:col-span-2">
            <RightPanel
              employees={state.employees}
              shifts={state.shifts}
              dateRange={dateRange}
            />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Master Einträge:{' '}
            <span className="font-bold">{state.masterSchedule.length}</span> |
            Mitarbeiter:{' '}
            <span className="font-bold">{state.employees.length}</span> |
            Schichten: <span className="font-bold">{state.shifts.length}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
