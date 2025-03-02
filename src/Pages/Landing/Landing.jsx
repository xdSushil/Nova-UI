import { ReactLenis } from "@studio-freight/react-lenis";
import React, { useState, useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./background/background.jpeg";
import Features from "./features";
import {
  FiArrowRight,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiToggleLeft,
  FiUsers,
  FiShoppingCart,
  FiRepeat,
  FiGlobe,
  FiActivity,
  FiSearch,
  FiSettings,
  FiZap,
  FiDatabase,
  FiShield,
} from "react-icons/fi";
import { SiShopify, SiHandshake } from "react-icons/si";

const Landing = () => {
  return (
    <div className="bg-zinc-950">
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Nav />
        <Hero />
        <Features />
      </ReactLenis>
    </div>
  );
};

export default Landing;

// DottedButton Component
const DottedButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="rounded-xl border border-dashed border-white bg-transparent px-4 py-2 text-xs font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:rounded-md hover:shadow-[2px_2px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none"
  >
    {children}
  </button>
);

// Navbar
const Nav = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-2 text-white bg-zinc-900/70 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="NOVA Logo" className="h-6" />
        <button
          onClick={() => {
            document.getElementById("features-section")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="text-xs text-zinc-400 hover:text-white transition"
        >
          Know More
        </button>
      </div>

      <div className="flex gap-2">
        {user ? (
          <p className="text-xs text-zinc-300">{user.name}</p>
        ) : (
          <>
            <DottedButton onClick={() => navigate("/register")}>Register</DottedButton>
            <DottedButton onClick={() => navigate("/login")}>Login</DottedButton>
          </>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const SECTION_HEIGHT = 1500;

const Hero = () => (
  <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative w-full">
    <CenterImage />
    <ParallaxImages />
    <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
  </div>
);

const CenterImage = () => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => (
  <div className="mx-auto max-w-5xl px-4 pt-[200px]">
    <ParallaxImg src={backgroundImage} alt="Nova" start={-200} end={200} className="w-1/3" />
    <ParallaxImg src={backgroundImage} alt="Nova" start={200} end={-250} className="mx-auto w-2/3" />
    <ParallaxImg src={backgroundImage} alt="Nova" start={-200} end={200} className="ml-auto w-1/3" />
    <ParallaxImg src={backgroundImage} alt="Nova" start={0} end={-500} className="ml-24 w-5/12" />
  </div>
);

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return <motion.img src={src} alt={alt} className={className} ref={ref} style={{ transform, opacity }} />;
};

// FeaturesSection - Bento Style with Icons & Hover Effects
const Block = ({ icon: Icon, title, description, className }) => (
  <motion.div
    initial={{ scale: 0.5, y: 50, opacity: 0 }}
    whileInView={{ scale: 1, y: 0, opacity: 1 }}
    transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
    viewport={{ once: true }}
    className={`col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-transform hover:scale-105 ${className}`}
  >
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-3xl text-cyan-400" />
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
    <p className="text-zinc-400 text-sm">{description}</p>
  </motion.div>
);

// Complete FeaturesSection
