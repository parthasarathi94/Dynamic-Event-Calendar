import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Event, EventCategory } from '@/types/event'

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Event) => void;
  onEditEvent: (event: Event) => void;
  selectedDate: Date | null;
  editingEvent: Event | null;
}

export function EventModal({ isOpen, onClose, onAddEvent, onEditEvent, selectedDate, editingEvent }: EventModalProps) {
  const [eventName, setEventName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<EventCategory>('other')

  useEffect(() => {
    if (editingEvent) {
      setEventName(editingEvent.name)
      setStartTime(editingEvent.startTime)
      setEndTime(editingEvent.endTime)
      setDescription(editingEvent.description || '')
      setCategory(editingEvent.category)
    } else {
      setEventName('')
      setStartTime('')
      setEndTime('')
      setDescription('')
      setCategory('other')
    }
  }, [editingEvent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const event: Event = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      name: eventName,
      date: selectedDate ? formatDate(selectedDate) : '',
      startTime,
      endTime,
      description,
      category
    }
    if (editingEvent) {
      onEditEvent(event)
    } else {
      onAddEvent(event)
    }
    onClose()
  }

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select value={category} onValueChange={(value: EventCategory) => setCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">{editingEvent ? 'Update Event' : 'Add Event'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

