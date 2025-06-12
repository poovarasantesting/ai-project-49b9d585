import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string | null;
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  
  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("calendar-events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);
  
  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);
  
  const addEvent = (event: Event) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };
  
  const updateEvent = (updatedEvent: Event) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };
  
  const deleteEvent = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };
  
  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}