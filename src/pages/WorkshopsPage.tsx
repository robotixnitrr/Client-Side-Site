import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiBook, FiDollarSign } from 'react-icons/fi';

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  instructor: string;
  capacity: number;
  price: number;
  topics: string[];
  image: string;
  registrationLink: string;
}

export default function WorkshopsPage() {
  // Mock data - replace with actual API call
  const workshops: Workshop[] = [
    {
      id: '1',
      title: 'Introduction to Arduino',
      description: 'Learn the basics of Arduino programming and hardware interfacing in this hands-on workshop.',
      date: '2024-04-20',
      time: '2:00 PM',
      location: 'Electronics Lab, NITRR',
      instructor: 'Dr. John Doe',
      capacity: 30,
      price: 499,
      topics: ['Arduino Basics', 'Sensors', 'Actuators', 'Project Building'],
      image: 'https://example.com/workshop1.jpg',
      registrationLink: '#'
    },
    // Add more workshops...
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 pt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Technical <span className="text-yellow-500">Workshops</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Enhance your skills with our hands-on technical workshops led by industry experts.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {workshops.map((workshop) => (
            <motion.div
              key={workshop.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col"
            >
              <div className="relative h-64">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {workshop.title}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-400">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiClock className="w-4 h-4 mr-2" />
                    <span>{workshop.time}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    <span>{workshop.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiUsers className="w-4 h-4 mr-2" />
                    <span>{workshop.capacity} seats</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiBook className="w-4 h-4 mr-2" />
                    <span>{workshop.instructor}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiDollarSign className="w-4 h-4 mr-2" />
                    <span>₹{workshop.price}</span>
                  </div>
                </div>

                <p className="text-gray-400 mb-6 flex-1">
                  {workshop.description}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {workshop.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 rounded-full text-sm font-medium 
                          bg-yellow-500/10 text-yellow-500"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <a
                    href={workshop.registrationLink}
                    className="block w-full text-center px-6 py-3 bg-yellow-500 
                      text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 
                      transition-colors duration-200"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 