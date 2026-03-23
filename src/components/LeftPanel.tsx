import React from 'react'
import { MasterSchedule } from '../utils/types'

interface LeftPanelProps {
  masterSchedule: MasterSchedule[]
  currentWeek?: number
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  masterSchedule,
  currentWeek = 1,
}) => {
  const getPrograms = () => {
    const programs = new Set<string>()
    masterSchedule.forEach(schedule => {
      if (schedule.morning) programs.add(schedule.morning)
      if (schedule.evening) programs.add(schedule.evening)
      if (schedule.night) programs.add(schedule.night)
    })
    return Array.from(programs).sort()
  }

  const programs = getPrograms()

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Windkanal-Auslastung</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Aktuelle Periode: <span className="font-bold">P{currentWeek}</span>
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">
          Programme ({programs.length})
        </h3>
        <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded border-l-4 border-blue-600 text-sm"
            >
              <p className="font-mono text-xs">{program}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-600">Einträge</p>
          <p className="text-2xl font-bold">{masterSchedule.length}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-600">Auslastung</p>
          <p className="text-2xl font-bold">
            {Math.round(
              (masterSchedule.filter(
                s => s.morning || s.evening || s.night
              ).length /
                (masterSchedule.length || 1)) *
                100
            )}
            %
          </p>
        </div>
      </div>
    </div>
  )
}
