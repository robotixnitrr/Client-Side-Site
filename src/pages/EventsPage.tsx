import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiPlus, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { createEvent, Event, NewEvent } from '../api/eventApi';

export default function EventsPage() {
  const user = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([/* your events data */]);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    capacity: 0,
    registrationLink: ''
  });

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createEvent(newEvent);
      setEvents(prev => [...prev, response.data.data]);
      setIsModalOpen(false);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        image: '',
        capacity: 0,
        registrationLink: ''
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 pt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Add Event Button */}
        <div className="text-center mb-16 relative">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Upcoming <span className="text-yellow-500">Events</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Join us for exciting events, workshops, and competitions throughout the year.
          </p>
          
          {user.isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 
                bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 
                transition-colors duration-200"
            >
              <FiPlus className="w-5 h-5" />
              Add Event
            </button>
          )}
        </div>

        {/* Event Creation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Event</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                      focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    required
                  />
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                      focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    required
                  />
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                      focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                      focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Capacity"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) })}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                      focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={newEvent.image}
                    onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                      focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    required
                  />
                </div>
                
                <textarea
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                    focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  rows={4}
                  required
                />

                <input
                  type="url"
                  placeholder="Registration Link"
                  value={newEvent.registrationLink}
                  onChange={(e) => setNewEvent({ ...newEvent, registrationLink: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                    focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  required
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-700 text-white 
                      hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-yellow-500 text-gray-900 
                      hover:bg-yellow-400 transition-colors duration-200"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div
              key={event._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiClock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiUsers className="w-4 h-4 mr-2" />
                    <span>{event.capacity} seats</span>
                  </div>
                </div>

                <p className="text-gray-400 mb-6 line-clamp-3">
                  {event.description}
                </p>

                <a
                  href={event.registrationLink}
                  className="inline-block w-full text-center px-6 py-3 bg-yellow-500 
                    text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 
                    transition-colors duration-200"
                >
                  Register Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 