import * as XLSX from 'xlsx'
import { MasterSchedule } from './types'

export const parseExcelFile = async (
  file: File
): Promise<MasterSchedule[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: '',
        })

        const schedules: MasterSchedule[] = []

        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i]

          if (!row[0]) continue

          const schedule: MasterSchedule = {
            date: String(row[0] || ''),
            day: String(row[1] || ''),
            raceCalendar: String(row[2] || ''),
            fiaPeriod: String(row[3] || ''),
            morning: String(row[4] || ''),
            evening: String(row[5] || ''),
            night: String(row[6] || ''),
          }

          schedules.push(schedule)
        }

        resolve(schedules)
      } catch (error) {
        reject(error)
      }
    }

    reader.readAsArrayBuffer(file)
  })
}
