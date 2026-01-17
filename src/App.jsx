import React, { useState, useEffect } from 'react';
import { Sun, Moon, Linkedin, Instagram, Mail, MessageCircle, Menu, X, Code2, Terminal, Database, Cpu, Rocket, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download } from 'lucide-react';

const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const skillItem = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const contactItem = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Toggle Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Lock body scroll when sidebar is open
  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function: Mengembalikan scroll jika komponen di-unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'project', 'contact'];

    // Ubah threshold menjadi lebih kecil dan tambahkan rootMargin
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2, // Section dianggap aktif saat 20% terlihat
        rootMargin: '-10% 0px -70% 0px', // Memfokuskan deteksi pada bagian atas layar
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScrollWindow = () => {
      const homeSection = document.getElementById('home');
      if (!homeSection) return;
      const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
      if (window.scrollY > homeBottom - 100) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScrollWindow);
    return () => window.removeEventListener('scroll', handleScrollWindow);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Project', href: '#project' },
    { name: 'Contact', href: '#contact' },
  ];

  const skills = [
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', accent: 'from-orange-500 to-red-500' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', accent: 'from-blue-500 to-indigo-500' },
    { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', accent: 'from-purple-600 to-violet-500' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', accent: 'from-blue-400 to-yellow-400' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', accent: 'from-yellow-400 to-orange-400' },
    { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', accent: 'from-slate-700 to-slate-900' },
    { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg', accent: 'from-orange-400 to-blue-500' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', accent: 'from-cyan-400 to-blue-500' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', accent: 'from-cyan-500 to-blue-600' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', accent: 'from-blue-500 to-orange-500' },
    { name: 'SAP', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg', accent: 'from-blue-600 to-blue-800' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', accent: 'from-indigo-400 to-indigo-700' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', accent: 'from-purple-500 to-indigo-600' },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Ambil ID target dari href
    const targetId = href.replace('#', '');

    // PAKSA update state agar indikator langsung berpindah
    setActiveSection(targetId);

    window.history.pushState('', document.title, window.location.pathname + window.location.search);

    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-500 font-sans overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center cursor-pointer group">
            <img src="/img/logo.png" alt="Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain transition-transform group-hover:scale-110 active:scale-95" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className={`relative text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400 hover:text-blue-500'}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                  </a>
                );
              })}
            </div>
            <div className="flex items-center gap-5 border-l pl-6 border-slate-300 dark:border-slate-700">
              <a href="https://www.linkedin.com/in/raihan-azka-hidayat-355772341" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-all hover:scale-110">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/azk.hy_?igsh=NTE0NHprOXNtb3Z1" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-all hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/+6289652249372" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-all hover:scale-110">
                <MessageCircle size={20} />
              </a>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-yellow-500 dark:text-yellow-400 hover:ring-2 ring-blue-500 transition-all">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Button Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-yellow-500 dark:text-yellow-400">
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-slate-800 dark:text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden" />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-70 h-full w-70 bg-white dark:bg-slate-900 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full p-8">
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <X size={24} />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-8">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.replace('#', '');
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleScroll(e, link.href)}
                        className={`text-3xl font-black italic uppercase transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 dark:text-slate-500 hover:text-blue-600'}`}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                </div>

                {/* Bottom Socials */}
                <div className="mt-auto pt-8 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Let's Connect</p>
                  <div className="flex gap-6">
                    <a href="https://www.linkedin.com/in/raihan-azka-hidayat-355772341" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600">
                      <Linkedin size={24} />
                    </a>
                    <a href="https://www.instagram.com/azk.hy_?igsh=NTE0NHprOXNtb3Z1" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-pink-500">
                      <Instagram size={24} />
                    </a>
                    <a href="https://wa.me/+6289652249372" target="_blank" rel="noreferrer" className="text-green-500">
                      <MessageCircle size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-6">
        {/* HOME SECTION */}
        <motion.section id="home" className="min-h-screen flex items-center pt-28 md:pt-0" variants={zoomIn} initial="hidden" animate="visible">
          <div className="w-full grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Tech Enthusiast</div>

              <p className="text-xl font-medium text-slate-400 mb-2">Hello, I Am</p>

              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4 tracking-tighter">
                <span className="bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Raihan Azka</span>
              </h1>

              {/* TYPING ANIMATION */}
              <div className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 h-12">
                <TypeAnimation
                  sequence={['Information Systems Student', 2000, 'Game Developer', 2000, 'Cyber Security Enthusiast', 2000, 'Front End Web Developer', 2000]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="inline-block"
                />
              </div>

              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
                Mahasiswa <span className="font-semibold text-slate-700 dark:text-slate-200">Sistem Informasi Telkom University</span> yang memiliki pengalaman sebagai <span className="font-semibold text-blue-500">Game Developer</span>{' '}
                selama 5 bulan di <span className="font-semibold text-cyan-400">PT. Teknoreka Inovasi Nusantara</span>.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 px-8 py-4 font-bold text-white transition-all bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 shadow-blue-500/30"
                >
                  <span>Let’s Talk</span>
                  <motion.span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20" animate={{ x: [0, 8, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </motion.span>
                </motion.a>

                <motion.a href="/cv.pdf" target="_blank" whileHover={{ x: 6 }} transition={{ duration: 0.3 }} className="group flex items-center gap-2 text-sm font-bold text-slate-500 transition-all hover:text-blue-600">
                  <Download size={18} className="transition opacity-70 group-hover:opacity-100" />
                  <span>Download CV</span>
                </motion.a>
              </div>
            </motion.div>

            {/* RIGHT CONTENT - Profile Image */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative flex justify-center">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute w-80 h-80 rounded-full bg-blue-600/30 blur-3xl" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05 }}
                className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-linear-to-tr from-blue-600 to-cyan-400 p-1"
              >
                <img
                  src="/img/profil2.png"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover object-top bg-slate-900 transition-all duration-500 hover:brightness-110 hover:drop-shadow-[0_20px_40px_rgba(0,140,255,0.45)]"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ABOUT SECTION */}
        <motion.section id="about" className="min-h-screen py-32 flex flex-col justify-center" variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }}>
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
                <img src="/img/telkom.jpg" alt="Telkom University" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black mb-6 bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent uppercase italic">Profil Saya</h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-6 text-justify">
                Halo! Saya adalah mahasiswa tahun pertama <span className="font-semibold text-slate-800 dark:text-slate-200">Sistem Informasi di Telkom University</span>. Saya memiliki minat besar dalam mengeksplorasi bagaimana teknologi
                dapat mentransformasi proses bisnis menjadi lebih efisien dan terintegrasi.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-8 text-justify">
                Saat ini, saya sedang aktif mendalami dasar-dasar <span className="font-semibold text-blue-500">logika pemrograman</span>, serta mulai mempelajari kompleksitas{' '}
                <span className="font-semibold text-indigo-500">Arsitektur Enterprise</span> dan sistem <span className="font-semibold text-emerald-500">ERP</span>. Selain akademik, saya menjaga keseimbangan hidup dengan berolahraga.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-10 text-slate-800 dark:text-slate-200 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
              Riwayat Pendidikan
            </h3>
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-12">
              {/* Education - University */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} className="relative pl-8 md:pl-12">
                <div className="absolute -left-2.75 top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-slate-50 dark:border-slate-950 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-blue-500/10 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <h4 className="text-xl font-black text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition-colors">Telkom University</h4>
                      <p className="text-blue-600 font-semibold italic">S1 Sistem Informasi</p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">2025 - Sekarang</span>
                      <span className="text-sm mt-1 opacity-60 font-medium italic">Mahasiswa Aktif</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider text-[10px]">Keahlian yang dikuasai:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Discrete Math', 'C# Programming', 'SAP', 'ERP Fundamentals', 'Business Process Analysis'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Education - SMK */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} className="relative pl-8 md:pl-12">
                <div className="absolute -left-2.75 top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-slate-50 dark:border-slate-950 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-blue-500/10 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <h4 className="text-xl font-black text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition-colors">SMKN 2 Magelang</h4>
                      <p className="text-blue-600 font-semibold italic">Rekayasa Perangkat Lunak</p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">2022 - 2025</span>
                      <span className="text-sm mt-1 opacity-60 font-medium italic">Lulus</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider text-[10px]">Keahlian yang dikuasai:</p>
                    <div className="flex flex-wrap gap-2">
                      {['HTML', 'CSS', 'C#', 'Python', 'JavaScript', 'Unity', '3D Modelling'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section id="skills" className="min-h-screen py-32" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
          <h2 className="mb-6 text-4xl font-black text-center uppercase italic bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Keahlian</h2>
          <p className="max-w-2xl mx-auto mb-20 text-center text-slate-500 dark:text-slate-400">Teknologi yang saya gunakan untuk membangun solusi, logika, dan pengalaman digital yang bermakna.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-32">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                custom={i}
                variants={skillItem}
                whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.2 } }}
                className="relative group bg-white dark:bg-slate-900 rounded-2xl p-5 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:border-transparent"
              >
                <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${skill.accent} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`} />
                <div className="relative z-10 w-16 h-16 mb-4 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl group-hover:bg-transparent transition-colors duration-300">
                  <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <span className="relative z-10 font-bold text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">{skill.name}</span>
                <div className={`mt-2 w-0 h-1 bg-linear-to-r ${skill.accent} rounded-full group-hover:w-full transition-all duration-500`} />
              </motion.div>
            ))}
          </div>

          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-10 text-slate-800 dark:text-slate-200 flex items-center gap-3">
              <span className="w-8 h-1 bg-cyan-400 rounded-full"></span>
              Pengalaman Magang
            </h3>
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} className="relative pl-8 md:pl-12">
                <div className="absolute -left-2.75 top-0 w-5 h-5 rounded-full bg-cyan-400 border-4 border-slate-50 dark:border-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-cyan-500/10 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <h4 className="text-xl font-black text-slate-800 dark:text-slate-200 group-hover:text-cyan-400 transition-colors">PT. Teknoreka Inovasi Nusantara</h4>
                      <p className="text-blue-500 font-semibold italic">Game Developer</p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <span className="px-4 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-bold whitespace-nowrap">Desember 2024 - Mei 2025</span>
                      <span className="text-sm mt-1 opacity-60 font-medium italic">5 Bulan</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider text-[10px]">Kontribusi & Teknologi:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Unity/C#', 'Logic Integration', 'Creative Solutions', 'Team Collaboration'].map((item) => (
                        <span key={item} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* PROJECT SECTION */}
        <motion.section id="project" className="min-h-screen py-32" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-black italic uppercase bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Daftar Projek</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Portofolio pengembangan game dan sistem informasi terintegrasi.</p>
            </div>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 hidden md:block mx-8 mb-4"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {[
              {
                title: 'Atom Eksplorer',
                desc: 'Game edukasi berbasis Unity yang mengajak pemain menjelajahi struktur atom.',
                tags: ['Unity', 'C#', 'Education'],
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
                gradient: 'from-slate-600/20 to-slate-400/20',
                border: 'group-hover:border-slate-500/50',
              },
              {
                title: 'BondMaster',
                desc: 'Game puzzle strategi fokus pada simulasi ikatan kimia dikembangkan dengan Unity.',
                tags: ['Unity', 'Game Dev', 'Logic'],
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
                gradient: 'from-slate-600/20 to-slate-400/20',
                border: 'group-hover:border-slate-500/50',
              },
              {
                title: 'Car Rental Management',
                desc: 'Website manajemen persewaan mobil dengan fitur armada dan database pelanggan.',
                tags: ['PHP', 'MySQL', 'Web'],
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
                gradient: 'from-indigo-600/20 to-purple-500/20',
                border: 'group-hover:border-indigo-500/50',
              },
              {
                title: 'Mitigasi Banjir',
                desc: 'Simulasi interaktif edukasi langkah-langkah penanganan bencana banjir.',
                tags: ['Unity', 'Simulation', 'Social'],
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
                gradient: 'from-slate-600/20 to-slate-400/20',
                border: 'group-hover:border-slate-500/50',
              },
              {
                title: 'Disaster Point',
                desc: 'Game aksi-petualangan bertema survival dalam situasi bencana alam.',
                tags: ['Unity', 'C#', 'Adventure'],
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
                gradient: 'from-slate-600/20 to-slate-400/20',
                border: 'group-hover:border-slate-500/50',
              },
            ].map((p, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className={`group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 ${p.border}`}>
                <div className={`absolute inset-0 bg-linear-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl group-hover:bg-white dark:group-hover:bg-slate-700 transition-all duration-500">
                      <img src={p.logo} alt="Project Type" className="w-10 h-10 object-contain" />
                    </div>
                    <div className="flex flex-wrap gap-2 max-w-[60%] justify-end">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">{p.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 h-20 overflow-hidden line-clamp-3">{p.desc}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                      View Project <ArrowRight size={16} />
                    </button>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                    <Github size={18} className="text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section id="contact" className="relative flex items-center min-h-screen py-32 overflow-hidden" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }}>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -top-24 -left-24" />
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl bottom-0 right-0" />
          </div>
          <div className="max-w-4xl px-6 mx-auto text-center">
            <motion.h2 variants={contactItem} custom={0} className="mb-6 text-4xl italic font-black uppercase text-transparent bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text md:text-5xl tracking-tight">
              Let’s Connect
            </motion.h2>
            <motion.p variants={contactItem} custom={1} className="max-w-2xl mx-auto mb-14 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Tertarik untuk berdiskusi, berkolaborasi, atau sekadar menyapa? Saya terbuka untuk peluang dan obrolan baru.
            </motion.p>
            <motion.div variants={contactItem} custom={1.5} className="grid grid-cols-1 gap-6 mb-16 sm:grid-cols-2 max-w-2xl mx-auto">
              <div className="group p-6 border backdrop-blur-md rounded-3xl bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 transition-all hover:border-blue-500/50">
                <p className="mb-2 text-xs font-bold text-blue-600 uppercase tracking-widest">Role</p>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200">Information Systems Student</p>
              </div>
              <div className="group p-6 border backdrop-blur-md rounded-3xl bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 transition-all hover:border-cyan-500/50">
                <p className="mb-2 text-xs font-bold text-cyan-500 uppercase tracking-widest">Focus</p>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200">Web, ERP, Game Dev</p>
              </div>
            </motion.div>
            <motion.div variants={contactItem} custom={2} className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <motion.a
                href="mailto:raihanazkahidayat90@gmail.com"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4 px-10 py-4 font-bold text-white transition-all bg-blue-600 rounded-full shadow-xl shadow-blue-500/25 hover:bg-blue-700"
              >
                <span>Contact Me</span>
                <motion.div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col items-center text-center">
          <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">Information Systems Student • Web & ERP Enthusiast</p>
          <span className="h-px w-16 bg-slate-300 dark:bg-slate-700 my-4" />
          <p className="text-xs opacity-50">© 2026 • Built with React & Tailwind</p>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            whileHover={{ scale: 1.15, rotate: -15, boxShadow: '0 0 30px rgba(59,130,246,0.8)' }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-blue-600 text-white"
          >
            <Rocket />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
