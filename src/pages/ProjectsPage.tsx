import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiTag } from 'react-icons/fi';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  team: string[];
}

export default function ProjectsPage() {
  // Mock data - replace with actual API call
  const projects: Project[] = [
    {
      id: '1',
      title: 'Autonomous Robot',
      description: 'An autonomous robot capable of navigating complex environments using computer vision and machine learning.',
      image: 'https://example.com/project1.jpg',
      tags: ['Robotics', 'AI', 'Computer Vision'],
      githubLink: 'https://github.com/example/project1',
      demoLink: 'https://example.com/demo1',
      team: ['John Doe', 'Jane Smith']
    },
    // Add more projects...
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
            Our <span className="text-yellow-500">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our innovative projects in robotics, automation, and artificial intelligence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl"
            >
              <div className="relative h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full 
                        text-sm font-medium bg-yellow-500/10 text-yellow-500"
                    >
                      <FiTag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-400 mb-6">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.team.map((member, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-yellow-500 flex items-center 
                          justify-center text-gray-900 font-bold text-sm ring-2 ring-gray-800"
                      >
                        {member.charAt(0)}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-yellow-500 
                          transition-colors duration-200"
                      >
                        <FiGithub className="w-5 h-5" />
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-yellow-500 
                          transition-colors duration-200"
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 