'use client'

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/Calendar'
import { EventModal } from '@/components/EventModal'
import { EventList } from '@/components/EventList'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Event } from '@/types/event'

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [filterKeyword, setFilterKeyword] = useState('')

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents')
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events))
  }, [events])

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  const handleAddEvent = (newEvent: Event) => {
    if (isEventOverlapping(newEvent)) {
      alert('This event overlaps with an existing event. Please choose a different time.')
      return
    }
    setEvents(prevEvents => [...prevEvents, newEvent])
    setIsModalOpen(false)
  }

  const handleEditEvent = (updatedEvent: Event) => {
    if (isEventOverlapping(updatedEvent, updatedEvent.id)) {
      alert('This event overlaps with an existing event. Please choose a different time.')
      return
    }
    setEvents(prevEvents => prevEvents.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ))
    setIsModalOpen(false)
    setEditingEvent(null)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId))
    setIsModalOpen(false)
    setEditingEvent(null)
  }

  const isEventOverlapping = (newEvent: Event, excludeEventId?: string) => {
    return events.some(existingEvent => {
      if (excludeEventId && existingEvent.id === excludeEventId) return false
      if (existingEvent.date !== newEvent.date) return false
      
      const newStart = new Date(`${newEvent.date}T${newEvent.startTime}`)
      const newEnd = new Date(`${newEvent.date}T${newEvent.endTime}`)
      const existingStart = new Date(`${existingEvent.date}T${existingEvent.startTime}`)
      const existingEnd = new Date(`${existingEvent.date}T${existingEvent.endTime}`)

      return (newStart < existingEnd && newEnd > existingStart)
    })
  }

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
    event.description?.toLowerCase().includes(filterKeyword.toLowerCase())
  )

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dynamic Event Calendar</h1>
        <ThemeToggle />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter events..."
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <Calendar
        currentDate={currentDate}
        events={filteredEvents}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onDayClick={handleDayClick}
      />
      {selectedDate && (
        <EventList
          date={selectedDate}
          events={filteredEvents.filter(event => event.date === formatDate(selectedDate))}
          onEditEvent={(event) => {
            setEditingEvent(event)
            setIsModalOpen(true)
          }}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingEvent(null)
          }}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
        />
      )}
    </div>
  )
}

