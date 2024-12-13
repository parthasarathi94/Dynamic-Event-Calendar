import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Event } from '@/types/event'

interface EventListProps {
  date: Date
  events: Event[]
  onEditEvent: (event: Event) => void
  onDeleteEvent: (eventId: string) => void
}

const categoryColors = {
  work: 'bg-blue-200 dark:bg-blue-800',
  personal: 'bg-green-200 dark:bg-green-800',
  other: 'bg-yellow-200 dark:bg-yellow-800'
}

export function EventList({ date, events, onEditEvent, onDeleteEvent }: EventListProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Events for {formatDate(date)}</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p>No events for this day.</p>
        ) : (
          <ul className="space-y-2">
            {events.map(event => (
              <li key={event.id} className={`flex justify-between items-center p-2 rounded ${categoryColors[event.category]}`}>
                <div>
                  <strong>{event.name}</strong>
                  <p className="text-sm text-gray-500">
                    {event.startTime} - {event.endTime}
                  </p>
                  {event.description && <p className="text-sm">{event.description}</p>}
                </div>
                <div>
                  <Button variant="outline" size="sm" onClick={() => onEditEvent(event)} className="mr-2">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDeleteEvent(event.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

