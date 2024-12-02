import { motion } from 'framer-motion';
import NumberAnimation from "../components/Animation/Animation";
import { FiUsers, FiAward, FiActivity } from 'react-icons/fi';

function About() {
  const stats = [
    { 
      icon: <FiUsers className="w-8 h-8" />,
      title: "Total Members",
      count: 100,
      description: "Active club participants"
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Events Organized",
      count: 50,
      description: "Successful workshops & competitions"
    },
    {
      icon: <FiActivity className="w-8 h-8" />,
      title: "Total Participations",
      count: 250,
      description: "Competition entries"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-yellow-900/10 to-black text-white"
    >
      {/* Enhanced Hero Section */}
      <motion.section 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="relative min-h-[90vh] flex items-center py-15 px-4 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent" />
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-yellow-500/5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-yellow-500 text-xl font-semibold mb-4 mt-0">Welcome to</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent">
              Robotix Club NIT Raipur
            </h1>
            <div className="flex justify-between">
            <div className="h-1 w-32 bg-yellow-500 rounded-full mb-8" />
            <div className="h-1 w-32 bg-yellow-500 rounded-full mb-8" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-yellow-500 font-semibold">Since 2014</span>, we've been a convergence 
                of innovators, contributors, and experts in the field of Robotics. Our journey has been 
                marked by continuous growth and technological advancement.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Under the guidance of our esteemed faculty In-charge, 
                <span className="text-yellow-500 font-semibold uppercase"> Dr. Rajesh Doriya </span> 
                (Department of Information Technology), we continue to push the boundaries of robotics 
                and automation.
              </p>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4 pt-4"
              >
                <button className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Join Us
                </button>
                <button className="px-6 py-3 border border-yellow-500 text-yellow-500 rounded-lg font-semibold hover:bg-yellow-500/10 transition-colors">
                  Learn More
                </button>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 backdrop-blur-sm rounded-lg p-8 border border-yellow-500/20"
              >
                <h2 className="text-2xl font-bold text-yellow-500 mb-4 mt-1">Our Vision</h2>
                <p className="text-gray-300 leading-relaxed">
                  We strive to foster technological skills in mechatronics and robotics by translating 
                  theoretical knowledge into real-life applications. Our focus is on providing simple 
                  yet creative solutions for complex real-world problems.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-black/50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800/50 rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center mb-4 text-yellow-500">
                  {stat.icon}
                </div>
                <h3 className="text-xl font-semibold text-yellow-500 mb-2">
                  {stat.title}
                </h3>
                <div className="text-4xl font-bold text-white mb-2">
                  <NumberAnimation targetNumber={stat.count} />
                </div>
                <p className="text-gray-400">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-yellow-500 mb-12">Our Team</h2>
          {/* Add team members grid here */}
        </div>
      </motion.section>
    </motion.div>
  );
}

export default About;