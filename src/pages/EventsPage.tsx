import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiPlus, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Event, getAllEvents } from '../api/eventApi';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents(); // Using getAllEvents
        setEvents(response.data); // Setting events state with fetched data
        console.log("RESPONSE: ",response);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);


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
        </div>

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
                  src={event.imageUrl}
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
                    <span>{event.venue}</span>
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