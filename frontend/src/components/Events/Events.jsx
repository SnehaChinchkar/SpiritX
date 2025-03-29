import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Navbar from "../Navbar/Navbar";
import { useTheme } from "../../ThemeContext";
import "./Events.css";

function Events() {
    const [events, setEvents] = useState([]);
    const { theme } = useTheme();
    const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "", meetingLink: "" });
    const [isAddingEvent, setIsAddingEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/events");

                const formattedEvents = data.map(event => ({
                    id: event._id,
                    title: event.title,
                    date: event.date,
                    extendedProps: { 
                        description: event.description, 
                        meetingLink: event.meetingLink 
                    }
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleDateSelect = (selectInfo) => {
        setIsAddingEvent(true);
        setNewEvent({ title: "", date: selectInfo.startStr, description: "", meetingLink: "" });
    };

    const handleAddEvent = async () => {
        if (!newEvent.title.trim()) {
            alert("Please enter an event title");
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:5000/api/events", newEvent);

            setEvents([...events, {
                id: data.event._id,
                title: data.event.title,
                date: data.event.date,
                extendedProps: { 
                    description: data.event.description, 
                    meetingLink: data.event.meetingLink 
                }
            }]);

            setIsAddingEvent(false);
            setNewEvent({ title: "", date: "", description: "", meetingLink: "" });
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
    };

    return (
        <div className={`events-container ${theme}`}>
            <Navbar />
            <div className="events-content">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    selectable={true}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "",
                    }}
                    height="auto"
                    contentHeight="auto"
                    eventBackgroundColor="#0a66c2"
                    eventBorderColor="#0a66c2"
                    eventTextColor="#ffffff"
                />
            </div>

            {selectedEvent && (
                <div className="event-popup-overlay">
                    <div className="event-popup">
                        <h2>{selectedEvent.title}</h2>
                        <p><strong>Date:</strong> {selectedEvent.startStr}</p>
                        <p><strong>Description:</strong> {selectedEvent.extendedProps?.description || "No description"}</p>
                        {selectedEvent.extendedProps?.meetingLink ? (
                            <p>
                                <strong>Meeting Link:</strong> 
                                <a href={selectedEvent.extendedProps.meetingLink} target="_blank" rel="noopener noreferrer">
                                    Join Meeting
                                </a>
                            </p>
                        ) : (
                            <p>No meeting link available</p>
                        )}
                        <button className="close-btn" onClick={() => setSelectedEvent(null)}>Close</button>
                    </div>
                </div>
            )}

            {isAddingEvent && (
                <div className="event-popup-overlay">
                    <div className="event-popup">
                        <h2>Add Event on {newEvent.date}</h2>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Event Description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Meeting Link (optional)"
                            value={newEvent.meetingLink}
                            onChange={(e) => setNewEvent({ ...newEvent, meetingLink: e.target.value })}
                        />
                        <button className="add-event-btn" onClick={handleAddEvent}>Add Event</button>
                        <button className="close-btn" onClick={() => setIsAddingEvent(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Events;
