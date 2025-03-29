import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useTheme } from '../../ThemeContext';
import './Events.css';

function Events() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2));
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const sampleEvents = [
      { id: 1, title: 'Team Meeting', date: '2025-03-05', description: 'Weekly sync', meetingLink: 'https://zoom.us/j/123456789' },
      { id: 2, title: 'Project Deadline', date: '2025-03-15', description: 'Submit final report', meetingLink: null },
      { id: 3, title: 'Demo Day', date: '2025-03-28', description: 'Showcase project', meetingLink: 'https://meet.google.com/abc-defg-hij' },
    ];
    setEvents(sampleEvents);
  }, []);

  const handleDatesSet = (dateInfo) => {
    setCurrentDate(dateInfo.view.currentStart);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  const isToday = (eventDate) => {
    const today = new Date(2025, 2, 28);
    const event = new Date(eventDate);
    return (
      today.getDate() === event.getDate() &&
      today.getMonth() === event.getMonth() &&
      today.getFullYear() === event.getFullYear()
    );
  };

  return (
    <div className={`events-container ${theme}`}>
      <Navbar />
      <div className="events-content">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          initialDate={currentDate}
          events={events}
          datesSet={handleDatesSet}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: '',
          }}
          height="auto"
          contentHeight="auto"
          eventBackgroundColor="#0a66c2"
          eventBorderColor="#0a66c2"
          eventTextColor="#ffffff"
          eventClick={handleEventClick}
        />
      </div>

      {selectedEvent && (
        <div className="event-popup-overlay">
          <div className="event-popup">
            <h2>{selectedEvent.title}</h2>
            <p><strong>Date:</strong> {selectedEvent.start.toLocaleDateString()}</p>
            <p><strong>Description:</strong> {selectedEvent.extendedProps.description || 'No description'}</p>
            {selectedEvent.extendedProps.meetingLink ? (
              <p>
                <strong>Meeting Link:</strong>{' '}
                <a href={selectedEvent.extendedProps.meetingLink} target="_blank" rel="noopener noreferrer">
                  Join Meeting
                </a>
              </p>
            ) : (
              <p>No meeting link available</p>
            )}
            {isToday(selectedEvent.start) && selectedEvent.extendedProps.meetingLink && (
              <button className="join-now-btn">Join Now</button>
            )}
            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;