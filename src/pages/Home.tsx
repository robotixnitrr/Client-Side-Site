import { memo, useEffect, useRef } from 'react';
import "../styles/Home.css";
import { gsap } from "gsap";
import { Flip, ScrollTrigger } from "gsap/all";
import { motion } from 'framer-motion';

gsap.registerPlugin(Flip, ScrollTrigger);

function Home() {
  console.clear();
  const animat = (planet: gsap.core.Timeline) => {
    // Inner to outer orbit speeds (slower to faster)
    const orbitSpeeds = [20, 60, 42, 55, 68];  // Orbit ring speeds (inner to outer)
    const planetSpeeds = [15, 24, 36, 48, 60];  // Planet speeds (inner to outer)

    // Animate dot-lines (orbits)
    const dotLines = document.querySelectorAll('.dot-line');
    // const reversedDotLines = Array.from(dotLines).reverse(); // Reverse to match inner-to-outer order
    dotLines.forEach((line, index) => {
      planet.to(line, {
        repeat: -1,
        rotation: "+=360",
        duration: orbitSpeeds[index] || 100,
        ease: "none",
        transformOrigin: "center center"
      }, 0);
    });

    // Animate planets
    const planets = document.querySelectorAll('.planet-ab');
    const reversedPlanets = Array.from(planets).reverse(); // Reverse to match inner-to-outer order
    reversedPlanets.forEach((planetEl, index) => {
      planet.to(planetEl, {
        repeat: -1,
        rotation: "+=360",
        duration: planetSpeeds[index] || 30,
        ease: "none",
        svgOrigin: "566.76 566.76"
      }, 0);
    });
  };

  const featuredText = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Existing GSAP animations
    const tl = gsap.timeline();
    const planet = gsap.timeline();
    animat(planet);
    if (featuredText.current) {
      animation(tl, featuredText.current);
    }
    animationScroll(".box", 500, 1);
    animationScroll(".box1", 200, 1);
  }, []);

  const animation = (tl: gsap.core.Timeline, el: HTMLElement) => {
    tl.from(el, {
      opacity: 1,
      duration: 3,
      x: 1000,
      ease: "elastic",
    });
  };

  const animationScroll = (element: string, xValue: number, delay: number) => {
    gsap.to(element, {
      scrollTrigger: element,
      x: xValue,
      delay: delay,
    });
  };

  const spaceRef = useRef<HTMLDivElement>(null);
  const planetsRef = useRef<(HTMLDivElement | null)[]>([]);

  const planets = [
    { name: 'Projects', color: '#FCD34D', description: 'Innovative robotics projects' },
    { name: 'Workshops', color: '#F59E0B', description: 'Hands-on learning experiences' },
    { name: 'Competitions', color: '#D97706', description: 'Exciting robotics challenges' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden body"
    >
      <div className="main_section">
        <motion.main
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="main_content"
        >
          <motion.div
            id="about"
            className="about sec pl-28"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="about_txt lg:min-w-[630px] flex"
              // initial={{ x: -50 }}
              // animate={{ x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.section
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative h-screen flex justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-center z-10 max-w-6xl lg:mt-32 sm:mt-20 p-4"
                >
                  <h1 className="text-6xl md:text-8xl  font-bold text-yellow-500 mb-4 uppercase">
                    Robotix Club
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-100">
                    Innovate. Create. Automate.
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-gray-400 mt-2"
                  >
                    The Robotix Club of NIT RAIPUR is a <span className='text-yellow-500 uppercase'>Vibrant</span> and innovative community that brings together students with a passion for robotics, automation, and technology. Founded on the principles of collaboration, creativity, and hands-on learning, it serves as a dynamic hub where students explore the fascinating world of robotics through various projects, workshops, competitions, and events.
                  </motion.p>
                </motion.div>
              </motion.section>
            </motion.div>
            <div className="about_graphic hidden lg:block">
              <svg viewBox="-25 -5 1700.51 1300.51">
                <g>
                  <circle className="solid_white" cx="566.76" cy="566.76" r="124.77" />
                  <circle className="white_line dot-line" cx="566.76" cy="566.76" r="212.78" />
                  <circle className="white_line dot-line" cx="566.76" cy="566.76" r="300.8" />
                  <circle className="white_line dot-line" cx="566.76" cy="566.76" r="388.38" />
                  <circle className="white_line dot-line" cx="566.76" cy="566.76" r="476.39" />
                  <circle className="white_line dot-line" cx="566.76" cy="566.76" r="566.1" />
                  <circle className="solid_white" cx="566.76" cy="566.76" r="124.77" />

                  <g className="planet-ab">
                    <ellipse cx="1013.63" cy="220.76" rx="19.5" ry="19.66" />
                    <path className="yellow_fill" d="M1020.96,220.76c0,4.05-3.28,7.33-7.33,7.33s-7.33-3.28-7.33-7.33,3.28-7.33,7.33-7.33,7.33,3.28,7.33,7.33Z" />
                  </g>

                  <g className="planet-ab">
                    <ellipse cx="792.68" cy="986.97" rx="19.5" ry="19.66" />
                    <path className="yellow_fill" d="M800.01,986.97c0,4.05-3.28,7.33-7.33,7.33s-7.33-3.28-7.33-7.33,3.28-7.33,7.33-7.33,7.33,3.28,7.33,7.33Z" />
                  </g>
                  <g className="planet-ab">
                    <ellipse cx="954.34" cy="560.72" rx="19.5" ry="19.66" />
                    <path className="yellow_fill" d="M961.67,560.72c0,4.05-3.28,7.33-7.33,7.33s-7.33-3.28-7.33-7.33,3.28-7.33,7.33-7.33,7.33,3.28,7.33,7.33Z" />
                  </g>
                  <g className="planet-ab">
                    <ellipse cx="566.6" cy="265.8" rx="19.5" ry="19.66" />
                    <path className="yellow_fill" d="M573.93,265.8c0,4.05-3.28,7.33-7.33,7.33s-7.33-3.28-7.33-7.33,3.28-7.33,7.33-7.33,7.33,3.28,7.33,7.33Z" />
                  </g>
                  <g className="planet-ab">
                    <ellipse cx="738.96" cy="445.59" rx="19.5" ry="19.66" />
                    <path className="yellow_fill" d="M746.29,445.59c0,4.05-3.28,7.33-7.33,7.33s-7.33-3.28-7.33-7.33,3.28-7.33,7.33-7.33,7.33,3.28,7.33,7.33Z" />
                  </g>
                </g>
              </svg>
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10 py-16 bg-black"
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {planets.map((planet, index) => (
                  <motion.div
                    key={planet.name}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="planet-card bg-gray-900 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="planet-container" ref={el => planetsRef.current[index] = el}>
                      <div className="planet" style={{ backgroundColor: planet.color }}></div>
                    </div>
                    <h3 className="text-xl font-semibold text-yellow-500 mt-4">{planet.name}</h3>
                    <p className="text-gray-400 mt-2">{planet.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </motion.main>
      </div>
    </motion.div >
  );
}

export default memo(Home);
