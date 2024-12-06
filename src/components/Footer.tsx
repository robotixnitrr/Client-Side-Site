import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-black to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-yellow-500 font-bold text-xl mb-4">Robotix Club NITRR</h3>
            <p className="text-gray-400 mb-4">
              Innovating the future through robotics and automation. Join us in our journey of technological advancement.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-500 font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-yellow-500 transition-colors">About Us</a></li>
              <li><a href="/projects" className="hover:text-yellow-500 transition-colors">Projects</a></li>
              <li><a href="/workshops" className="hover:text-yellow-500 transition-colors">Workshops</a></li>
              <li><a href="/competitions" className="hover:text-yellow-500 transition-colors">Competitions</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-yellow-500 font-bold text-xl mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">NIT Raipur, Chhattisgarh</p>
            <p className="text-gray-400">robotixclub@nitrr.ac.in</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex justify-center space-x-4 mb-8">
            <a
              href="https://www.facebook.com/nitrrobots16/"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/robotixr?lang=en"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300"
              aria-label="Twitter"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/robotix_nitrr/?hl=en"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/robotix-club-nit-raipur/posts/?feedView=all"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/murtazanarwar/RobotixClub2024"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-8">
            <p>© {new Date().getFullYear()} Robotix Club NITRR. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;