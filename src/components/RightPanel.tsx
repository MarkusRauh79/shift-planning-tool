import React from 'react'
import { Employee, Shift } from '../utils/types'

interface RightPanelProps {
  employees: Employee[]
  shifts: Shift[]
  dateRange: string[]
}

export const RightPanel: React.FC<RightPanelProps> = ({
  employees,
  shifts,
  dateRange,
}) => {
  if (employees.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500 text-center py-12">
          Keine Mitarbeiter definiert. Bitte füge Mitarbeiter hinzu.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Schicht-Matrix</h2>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left font-semibold sticky left-0 bg-gray-100 z-10">
              Mitarbeiter
            </th>
            {dateRange.slice(0, 14).map(date => (
              <th key={date} className="border p-2 text-center text-xs font-semibold">
                {new Date(date).toLocaleDateString('de-DE', {
                  weekday: 'short',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="border p-2 font-semibold bg-gray-50 sticky left-0 z-9">
                <span
                  className="inline-block w-4 h-4 rounded mr-2"
                  style={{ backgroundColor: emp.color }}
                />
                {emp.name}
              </td>
              {dateRange.slice(0, 14).map(date => {
                const dayShifts = shifts.filter(
                  s => s.employeeId === emp.id && s.date === date
                )
                return (
                  <td
                    key={`${emp.id}-${date}`}
                    className="border p-2 text-center text-xs h-12"
                  >
                    {dayShifts.length > 0 && (
                      <div className="space-y-1">
                        {dayShifts.map(shift => (
                          <div
                            key={shift.id}
                            className="bg-blue-200 p-1 rounded text-xs truncate"
                            title={shift.program}
                          >
                            {shift.program}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
