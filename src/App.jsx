import React, { useState, useEffect } from 'react';
import { Sun, Moon, Linkedin, Instagram, Mail, MessageCircle, Menu, X, Code2, Terminal, Database, Cpu, Rocket, Github } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download } from 'lucide-react';
import Lenis from '@studio-freight/lenis';

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

const sidebarVariants = {
  closed: { x: '100%', transition: { type: 'spring', damping: 25, stiffness: 200 } },
  opened: {
    x: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: 20 },
  opened: { opacity: 1, x: 0 },
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'project', 'contact'];

    const observerOptions = {
      // Memberikan batas deteksi:
      // -20% dari atas (mengabaikan navbar)
      // -40% dari bawah (agar tidak mendeteksi section yang baru muncul sedikit di bawah)
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0, 0.1, 0.2, 0.3], // Deteksi bertahap untuk akurasi lebih baik
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Hanya update jika section tersebut benar-benar masuk ke area fokus
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScrollWindow = () => {
      window.requestAnimationFrame(() => {
        const homeSection = document.getElementById('home');
        if (!homeSection) return;

        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        setShowBackToTop(window.scrollY > homeBottom - 100);
      });
    };

    window.addEventListener('scroll', handleScrollWindow, { passive: true });
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

    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);

    if (target) {
      // Set aktif segera agar animasi layoutId langsung berpindah ke target
      setActiveSection(targetId);

      const navHeight = 80;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleLaunch = () => {
    setIsLaunching(true);

    // PAKSA aktifkan section home agar highlight di sidebar/navbar langsung berpindah
    setActiveSection('home');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Reset status roket setelah animasi selesai
    setTimeout(() => {
      setIsLaunching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-500 font-sans overflow-x-hidden">
      {/* PROGRESS BAR - PASTI MUNCUL */}
      <motion.div className="fixed top-0 left-0 right-0 h-[4px] bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600 z-[100] origin-left shadow-[0_1px_10px_rgba(37,99,235,0.8)]" style={{ scaleX: scrollYProgress }} />
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
                    {/* ANIMASI HIGHLIGHT HALUS */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-highlight"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
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
              variants={sidebarVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="fixed top-0 right-0 z-70 h-full w-72 bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl border-l border-white/20 dark:border-slate-800/50 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full p-8 relative overflow-hidden">
                {/* Dekorasi Cahaya Halus di dalam Sidebar agar efek kaca lebih hidup */}
                <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Close Button */}
                <div className="flex justify-end mb-12 relative z-10">
                  <button onClick={() => setIsMenuOpen(false)} className="p-3 rounded-full bg-slate-100/50 dark:bg-slate-800/50 text-slate-800 dark:text-white backdrop-blur-md transition-transform active:scale-90">
                    <X size={24} />
                  </button>
                </div>

                {/* Nav Links & Socials Wrapper */}
                <div className="flex flex-col gap-12 relative z-10">
                  {/* Nav Links */}
                  <div className="flex flex-col gap-6">
                    {navLinks.map((link) => {
                      const isActive = activeSection === link.href.replace('#', '');
                      return (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          variants={linkVariants}
                          onClick={(e) => handleScroll(e, link.href)}
                          className={`text-4xl font-black italic uppercase transition-all ${isActive ? 'text-blue-600 translate-x-2' : 'text-slate-500/80 dark:text-slate-400/80 hover:text-blue-500'}`}
                        >
                          {link.name}
                        </motion.a>
                      );
                    })}
                  </div>

                  {/* Bottom Socials */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Let's Connect</p>
                    <div className="flex gap-6">
                      <a
                        href="https://www.linkedin.com/in/raihan-azka-hidayat-355772341"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all active:scale-90"
                      >
                        <Linkedin size={22} />
                      </a>
                      <a
                        href="https://www.instagram.com/azk.hy_?igsh=NTE0NHprOXNtb3Z1"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-pink-500 transition-all active:scale-90"
                      >
                        <Instagram size={22} />
                      </a>
                      <a href="https://wa.me/+6289652249372" target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 text-green-500 transition-all active:scale-90">
                        <MessageCircle size={22} />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-6">
        {/* HOME SECTION */}
        <motion.section id="home" className="min-h-screen flex items-center pt-28 md:pt-0" variants={zoomIn} initial="hidden" animate="visible">
          {/* Perubahan: flex-col-reverse agar Profile Image (bawah di kode) naik ke atas pada mobile */}
          <div className="w-full flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT (Sekarang di bawah pada mobile) */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1 w-full">
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

                <motion.a href="#" onClick={(e) => e.preventDefault()} whileHover={{ x: 6 }} transition={{ duration: 0.3 }} className="group flex items-center gap-2 text-sm font-bold text-slate-500 cursor-default">
                  <Download size={18} className="transition opacity-70" />
                  <span>Download CV</span>
                </motion.a>
              </div>
            </motion.div>

            {/* RIGHT CONTENT - Profile Image (Sekarang di atas pada mobile) */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative flex justify-center items-center py-6 md:py-0 w-full">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  boxShadow: ['0 0 20px rgba(34, 211, 238, 0.3)', '0 0 50px rgba(34, 211, 238, 0.6)', '0 0 20px rgba(34, 211, 238, 0.3)'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.05 }}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-linear-to-tr from-blue-600 to-cyan-400 p-1"
              >
                <img src="/img/profil2.png" alt="Profile" className="w-full h-full rounded-full object-cover object-top bg-slate-900 transition-all duration-500 hover:brightness-110" loading="lazy" decoding="async" />
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
          {/* SKILLS GRID CONTAINER */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-32 px-4 py-12">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                custom={i}
                variants={skillItem}
                // Animasi angkat hanya aktif di desktop (layar md ke atas)
                whileHover={window.innerWidth > 768 ? { y: -12, scale: 1.02 } : {}}
                className="relative group bg-white dark:bg-slate-900 rounded-3xl p-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-500 md:hover:border-transparent"
              >
                {/* 1. DYNAMIC BACKGROUND GLOW - Hanya aktif di Desktop (md:) */}
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${skill.accent} opacity-0 md:group-hover:opacity-15 blur-2xl transition-all duration-500 -z-10`} />

                {/* 2. DYNAMIC BORDER GLOW - Hanya aktif di Desktop (md:) */}
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${skill.accent} opacity-0 md:group-hover:opacity-30 p-1px -z-10 transition-all duration-500`} />

                {/* ICON CONTAINER */}
                <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl md:group-hover:bg-white dark:md:group-hover:bg-slate-800 transition-all duration-500">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    // Mobile: Langsung berwarna (grayscale-0)
                    // Desktop: Grayscale awal, lalu berwarna saat hover (md:grayscale md:group-hover:grayscale-0)
                    className="w-10 h-10 md:w-12 md:h-12 object-contain grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-500 md:group-hover:scale-110"
                  />
                </div>

                {/* TEXT LABEL */}
                <span className="relative z-10 font-bold text-xs md:text-sm text-slate-700 dark:text-slate-200 md:text-slate-500 md:dark:text-slate-400 md:group-hover:text-slate-900 md:dark:group-hover:text-white transition-colors duration-300">
                  {skill.name}
                </span>

                {/* PROGRESS BAR - Kita buat tetap ada tapi warnanya statis di mobile agar lebih minimalis */}
                <div className="mt-3 w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  {/* Mobile: Langsung penuh tapi tipis | Desktop: Mengisi saat hover */}
                  <div className={`h-full bg-linear-to-r ${skill.accent} rounded-full w-full md:w-0 md:group-hover:w-full transition-all duration-700 ease-out`} />
                </div>
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
        <motion.section id="contact" className="relative flex items-center min-h-screen py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-400px h-400px bg-blue-500/20 rounded-full blur-[100px] -top-20 -left-20"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-400px h-400px bg-cyan-400/20 rounded-full blur-[100px] -bottom-20 -right-20"
            />
          </div>

          <div className="max-w-4xl px-6 mx-auto text-center relative z-10">
            <motion.h2 variants={contactItem} custom={0} className="mb-6 text-4xl italic font-black uppercase text-transparent bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text md:text-5xl tracking-tight">
              Let’s Connect
            </motion.h2>

            <motion.p variants={contactItem} custom={1} className="max-w-2xl mx-auto mb-14 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Tertarik untuk berdiskusi, berkolaborasi, atau sekadar menyapa? Saya terbuka untuk peluang dan obrolan baru.
            </motion.p>

            <motion.div variants={contactItem} custom={1.5} className="grid grid-cols-1 gap-6 mb-16 sm:grid-cols-2 max-w-2xl mx-auto">
              <div className="group p-6 border backdrop-blur-xl rounded-3xl bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 transition-all hover:border-blue-500/50 hover:shadow-(--color-blue-500/10)">
                <p className="mb-2 text-xs font-bold text-blue-600 uppercase tracking-widest">Role</p>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200">Information Systems Student</p>
              </div>

              <div className="group p-6 border backdrop-blur-xl rounded-3xl bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 transition-all hover:border-cyan-500/50 hover:shadow-(--color-cyan-500/10)">
                <p className="mb-2 text-xs font-bold text-cyan-500 uppercase tracking-widest">Focus</p>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200">Front End Web Developer</p>
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
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col items-center text-center">
          <p className="text-[10px] uppercase tracking-widest opacity-60">© 2026 • Raihan Azka • Built with React & Tailwind</p>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={isLaunching ? { y: -1000, opacity: 0, scale: 1.5 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            whileHover={!isLaunching ? { scale: 1.15, rotate: -15, boxShadow: '0 0 30px rgba(59,130,246,0.8)' } : {}}
            transition={{ duration: isLaunching ? 0.8 : 0.3, ease: isLaunching ? 'easeIn' : 'easeOut' }}
            onClick={handleLaunch}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg"
          >
            <motion.div animate={isLaunching ? { x: [0, 2, -2, 0], y: [0, -2, 2, 0] } : {}} transition={{ repeat: Infinity, duration: 0.1 }}>
              <Rocket size={24} className={isLaunching ? 'fill-white' : ''} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
