import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventDialog } from "@/components/EventDialog";
import { useEvents } from "@/hooks/useEvents";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const { events } = useEvents();
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Find the day of the week (0-6) for the first day of the month
  const startDay = monthStart.getDay();
  
  // Generate grid with empty cells for proper alignment
  const totalCells = Math.ceil((days.length + startDay) / 7) * 7;
  const daysWithEmptyCells = Array(totalCells).fill(null);
  
  days.forEach((day, index) => {
    daysWithEmptyCells[index + startDay] = day;
  });
  
  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < daysWithEmptyCells.length; i += 7) {
    weeks.push(daysWithEmptyCells.slice(i, i + 7));
  }
  
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };
  
  const handleAddEvent = () => {
    setSelectedDate(new Date());
    setIsDialogOpen(true);
  };
  
  const getEventsForDate = (date: Date) => {
    if (!date) return [];
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Button onClick={handleAddEvent} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add Event</span>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex items-center justify-between bg-primary text-primary-foreground">
          <Button variant="ghost" onClick={handlePreviousMonth} size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button variant="ghost" onClick={handleNextMonth} size="icon">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-7 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 divide-x divide-y">
          {weeks.map((week, weekIndex) => (
            week.map((day, dayIndex) => {
              const dayEvents = day ? getEventsForDate(day) : [];
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`min-h-[100px] p-2 ${
                    day && isSameMonth(day, currentDate) 
                      ? 'bg-white cursor-pointer hover:bg-gray-50' 
                      : 'bg-gray-50 cursor-default'
                  }`}
                  onClick={() => day && isSameMonth(day, currentDate) && handleDateClick(day)}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium rounded-full w-7 h-7 flex items-center justify-center ${
                        isToday(day) 
                          ? 'bg-primary text-primary-foreground' 
                          : ''
                      }`}>
                        {format(day, 'd')}
                      </div>
                      <div className="mt-1">
                        {dayEvents.slice(0, 2).map((event, index) => (
                          <div 
                            key={index}
                            className="text-xs mb-1 truncate bg-blue-100 text-blue-800 px-1 py-0.5 rounded"
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>
      
      {selectedDate && (
        <EventDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen} 
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}