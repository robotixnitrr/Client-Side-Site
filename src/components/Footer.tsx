import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="container mx-auto my-0 ">
      <footer className="bg-gray-900 text-center text-yellow-500">
        <div className="p-4 pb-0">
          <section className="mb-4">
            <a
              className="inline-block p-2 border border-yellow-500 rounded-full m-1 hover:bg-gray-700"
              href="https://www.facebook.com/nitrrobots16/"
              role="button"
            >
              <FaFacebookF />
            </a>
            <a
              className="inline-block p-2 border border-yellow-500 rounded-full m-1 hover:bg-gray-700"
              href="https://x.com/robotixr?lang=en"
              role="button"
            >
              <FaTwitter />
            </a>
            <a
              className="inline-block p-2 border border-yellow-500 rounded-full m-1 hover:bg-gray-700"
              href="https://www.instagram.com/robotix_nitrr/?hl=en"
              role="button"
            >
              <FaInstagram />
            </a>
            <a
              className="inline-block p-2 border border-yellow-500 rounded-full m-1 hover:bg-gray-700"
              href="https://www.linkedin.com/company/robotix-club-nit-raipur/posts/?feedView=all"
              role="button"
            >
              <FaLinkedinIn />
            </a>
            <a
              className="inline-block p-2 border border-yellow-500 rounded-full m-1 hover:bg-gray-700"
              href="https://github.com/murtazanarwar/RobotixClub2024"
              role="button"
            >
              <FaGithub />
            </a>
          </section>
        </div>
        <div className="text-center p-3 bg-gray-800 text-right">
          © Copyright Robotix Club NITRR
        </div>
      </footer>
    </div>
  );
};

export default Footer;