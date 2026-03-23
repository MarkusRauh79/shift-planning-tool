export interface MasterSchedule {
  date: string
  day: string
  raceCalendar: string
  fiaPeriod: string
  morning: string
  evening: string
  night: string
}

export interface Employee {
  id: string
  name: string
  department: string
  color: string
}

export interface Shift {
  id: string
  employeeId: string
  date: string
  shiftType: 'morning' | 'evening' | 'night'
  program: string
}

export interface DashboardState {
  masterSchedule: MasterSchedule[]
  employees: Employee[]
  shifts: Shift[]
  sharePointPath: string
  lastUpdated: string
}
