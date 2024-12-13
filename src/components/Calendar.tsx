import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Event } from '@/types/event'

interface CalendarProps {
  currentDate: Date
  events: Event[]
  onPrevMonth: () => void
  onNextMonth: () => void
  onDayClick: (date: Date) => void
}

const categoryColors = {
  work: 'bg-blue-200 dark:bg-blue-800',
  personal: 'bg-green-200 dark:bg-green-800',
  other: 'bg-yellow-200 dark:bg-yellow-800'
}

export function Calendar({ currentDate, events, onPrevMonth, onNextMonth, onDayClick }: CalendarProps) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const generateCalendarDays = () => {
    const days = []
    const previousMonth = new Date(year, month - 1, 1)
    const nextMonth = new Date(year, month + 1, 1)

    // Previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, getDaysInMonth(year, month - 1) - i),
        isCurrentMonth: false
      })
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      })
    }

    // Next month's days
    const remainingDays = 42 - days.length // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isWeekend = (date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6
  }

  return (
    <Card className="p-4 bg-background">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={onPrevMonth}>&lt; Previous</Button>
        <h2 className="text-xl font-bold">{monthNames[month]} {year}</h2>
        <Button onClick={onNextMonth}>Next &gt;</Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center font-bold p-2">{day}</div>
        ))}
        {calendarDays.map(({ date, isCurrentMonth }) => (
          <div
            key={date.toISOString()}
            onClick={() => onDayClick(date)}
            className={`
              p-2 rounded cursor-pointer
              ${!isCurrentMonth ? 'text-muted-foreground' : ''}
              ${isToday(date) ? 'bg-primary/10' : ''}
              ${isWeekend(date) ? 'bg-muted/50' : 'bg-background'}
              hover:bg-accent hover:text-accent-foreground
              transition-colors
            `}
          >
            <div className="font-bold">{date.getDate()}</div>
            {events
              .filter(event => event.date === formatDate(date))
              .slice(0, 3)
              .map(event => (
                <div 
                  key={event.id} 
                  className={`text-xs truncate p-1 mt-1 rounded ${categoryColors[event.category]}`}
                >
                  {event.name}
                </div>
              ))}
            {events.filter(event => event.date === formatDate(date)).length > 3 && (
              <div className="text-xs text-muted-foreground mt-1">+ more</div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

