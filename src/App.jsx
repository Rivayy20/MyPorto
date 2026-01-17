import React, { useState, useEffect } from 'react';
import { Sun, Moon, Linkedin, Instagram, Mail, MessageCircle, Menu, X, Code2, Terminal, Database, Cpu, Rocket, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation'; // Pastikan sudah install: npm install react-type-animation
import { ArrowRight } from 'lucide-react';
import { Download } from 'lucide-react';

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
      delay: i * 0.08, // lebih cepat & halus
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

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'project', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
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
      const aboutSection = document.getElementById('home');
      if (!aboutSection) return;

      const aboutBottom = aboutSection.offsetTop + aboutSection.offsetHeight;

      if (window.scrollY > aboutBottom - 100) {
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
    {
      name: 'C#',
      desc: 'Logic, console app, OOP dasar',
      icon: <Terminal className="text-purple-500" />,
      accent: 'from-purple-500 to-indigo-500',
    },
    {
      name: 'React',
      desc: 'Component-based UI & state',
      icon: <Code2 className="text-blue-500" />,
      accent: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Tailwind CSS',
      desc: 'Modern UI & responsive design',
      icon: <Cpu className="text-cyan-500" />,
      accent: 'from-cyan-500 to-emerald-500',
    },
    {
      name: 'SQL / ERP',
      desc: 'Business process & data flow',
      icon: <Database className="text-orange-500" />,
      accent: 'from-orange-500 to-amber-500',
    },
  ];

  // Fungsi navigasi yang stabil untuk Mobile & Desktop
  const handleScroll = (e, href) => {
    e.preventDefault();

    // 1. Tutup menu mobile terlebih dahulu
    setIsMenuOpen(false);

    // 2. Jeda sedikit agar animasi menu selesai, lalu scroll
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 300); // Durasi disesuaikan dengan transisi AnimatePresence
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-500 font-sans">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center cursor-pointer group">
            {/* Logo Image Only - No Background/Outline */}
            <img src="/src/assets/img/logo.png" alt="Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain transition-transform group-hover:scale-110 active:scale-95" />
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

                    {/* underline */}
                    <span className={`absolute -bottom-1 left-0 h-2px bg-blue-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
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

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-yellow-500 dark:text-yellow-400">
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="flex flex-col gap-6 px-6 py-8">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');

                  return (
                    <a key={link.name} href={link.href} onClick={(e) => handleScroll(e, link.href)} className={`text-2xl font-bold transition-colors ${isActive ? 'text-blue-600' : 'hover:text-blue-600'}`}>
                      {link.name}
                    </a>
                  );
                })}

                <div className="flex gap-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <a href="https://www.linkedin.com/in/raihan-azka-hidayat-355772341" target="_blank" rel="noreferrer">
                    <Linkedin size={26} />
                  </a>
                  <a href="https://www.instagram.com/azk.hy_?igsh=NTE0NHprOXNtb3Z1" target="_blank" rel="noreferrer">
                    <Instagram size={26} />
                  </a>
                  <a href="https://wa.me/+6289652249372" target="_blank" rel="noreferrer" className="text-green-500">
                    <MessageCircle size={26} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-6xl mx-auto px-6">
        {/* HOME SECTION */}
        <motion.section id="home" className="min-h-screen flex items-center pt-28 md:pt-0" variants={zoomIn} initial="hidden" animate="visible">
          <div className="w-full grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Ready to Collaborate</div>

              <p className="text-xl font-medium text-slate-400 mb-2">Hello, I Am</p>

              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4 tracking-tighter">
                <span className="bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Raihan Azka</span>
              </h1>

              {/* TYPING ANIMATION */}
              <div className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 h-12">
                <TypeAnimation
                  sequence={[
                    'Information Systems Student', //
                    2000,
                    'Game Developer', //
                    2000,
                    'Cyber Security Enthusiast', //
                    2000,
                    'Front End Web Developer', //
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="inline-block"
                />
              </div>

              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
                Mahasiswa <span className="font-semibold text-slate-700 dark:text-slate-200">Sistem Informasi Telkom University</span> yang memiliki pengalaman sebagai <span className="font-semibold text-blue-500">Game Developer</span>{' '}
                selama 5 bulan di <span className="font-semibold text-cyan-400">PT. Teknoreka Inovasi Nusantara</span>. Berfokus pada integrasi teknologi dan solusi kreatif.
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

            {/* RIGHT CONTENT */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative flex justify-center">
              {/* Glow */}
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute w-80 h-80 rounded-full bg-blue-600/30 blur-3xl" />

              {/* Ring */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05 }}
                className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-linear-to-tr from-blue-600 to-cyan-400 p-1"
              >
                <img
                  src="/src/assets/img/profil2.png"
                  alt="Profile"
                  className="
                    w-full h-full
                    rounded-full
                    object-cover object-top
                    bg-slate-900
                    transition-all duration-500
                    hover:brightness-110
                    hover:drop-shadow-[0_20px_40px_rgba(0,140,255,0.45)]
                  "
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ABOUT SECTION */}
        <motion.section id="about" className="min-h-screen py-32 flex items-center" variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Visual Element */}
            <div className="relative group">
              {/* Glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

              {/* Card */}
              <div className="relative aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
                {/* Foto */}
                <img src="/src/assets/img/telkom.jpg" alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1" />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
            </div>

            {/* Content Element */}
            <div>
              <h2 className="text-4xl font-black mb-6 bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent uppercase italic">Profil Saya</h2>

              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-6 text-justify">
                Halo! Saya adalah mahasiswa tahun pertama <span className="font-semibold text-slate-800 dark:text-slate-200">Sistem Informasi di Telkom University</span>. Saya memiliki minat besar dalam mengeksplorasi bagaimana teknologi
                dapat mentransformasi proses bisnis menjadi lebih efisien dan terintegrasi.
              </p>

              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-8 text-justify">
                Saat ini, saya sedang aktif mendalami dasar-dasar <span className="font-semibold text-blue-500">logika pemrograman</span>, serta mulai mempelajari kompleksitas{' '}
                <span className="font-semibold text-indigo-500">Arsitektur Enterprise</span> dan sistem <span className="font-semibold text-emerald-500">ERP</span>. Selain akademik, saya menjaga keseimbangan hidup dengan berolahraga seperti{' '}
                <span className="font-semibold">running</span> dan <span className="font-semibold">hiking</span> untuk menjaga produktivitas.
              </p>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="font-bold text-blue-600 mb-1 italic">Pendidikan</h3>
                  <p className="text-sm opacity-70">S1 Sistem Informasi - Telkom University</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="font-bold text-cyan-500 mb-1 italic">Fokus Minat</h3>
                  <p className="text-sm opacity-70">Cybersecurity, Web Developer, ERP</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section id="skills" className="min-h-screen py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {/* Title */}
          <h2 className="mb-6 text-4xl font-black text-center uppercase italic bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Keahlian</h2>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto mb-20 text-center text-slate-500 dark:text-slate-400">Teknologi yang saya gunakan untuk membangun solusi, logika, dan pengalaman digital yang bermakna.</p>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                custom={i}
                variants={skillItem}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.2 },
                }}
                className="relative group rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-6 cursor-pointer overflow-hidden"
              >
                {/* Accent Glow */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${skill.accent}`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                  {/* Icon */}
                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 transition-transform duration-200 group-hover:scale-110">{skill.icon}</div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{skill.name}</h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">{skill.desc}</p>
                </div>

                {/* Hover Overlay (very subtle) */}
                <div className="absolute inset-0 bg-slate-100/0 dark:bg-slate-800/0 transition group-hover:bg-slate-100/40 dark:group-hover:bg-slate-800/40" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PROJECT SECTION */}
        <motion.section id="project" className="min-h-screen py-32" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
          <h2 className="mb-16 text-4xl font-bold">Projek Pilihan</h2>

          <div className="grid gap-10 md:grid-cols-2">
            {[
              {
                title: 'Hospital Management System',
                desc: 'Sistem manajemen rumah sakit untuk alur data pasien & layanan.',
                built: 'React, Tailwind',
                focus: 'UI Flow & Logic',
                emoji: '🏥',
                gradient: 'from-blue-600/90 to-cyan-500/90',
                button: 'View Case Study →',
                textColor: 'text-blue-600',
              },
              {
                title: 'ERP Sales & Marketing Analysis',
                desc: 'Analisis proses bisnis dan integrasi modul ERP.',
                built: 'UML, ERP Concept',
                focus: 'Business Flow',
                emoji: '📊',
                gradient: 'from-cyan-600/90 to-emerald-500/90',
                button: 'What I Learned →',
                textColor: 'text-cyan-600',
              },
            ].map((p, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="group relative min-h-[260px] overflow-hidden rounded-3xl bg-slate-200 shadow-2xl dark:bg-slate-800 md:aspect-video">
                {/* THUMBNAIL */}
                <div className="absolute inset-0 flex items-center justify-center text-6xl transition-all duration-300 group-hover:scale-90 group-hover:blur-sm">{p.emoji}</div>

                {/* OVERLAY */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 pt-12 text-white transition-all duration-300 scale-95 opacity-0 bg-linear-to-br ${p.gradient} group-hover:scale-100 group-hover:opacity-100 md:justify-center md:p-8 md:pt-8`}
                >
                  <h3 className="mb-2 text-lg font-bold leading-tight md:text-2xl">{p.title}</h3>

                  <p className="max-w-md mb-4 text-sm opacity-90">{p.desc}</p>

                  <div className="mb-5 space-y-1 text-xs opacity-90">
                    <p>
                      <span className="font-semibold">Built with:</span> {p.built}
                    </p>
                    <p>
                      <span className="font-semibold">Focus:</span> {p.focus}
                    </p>
                  </div>

                  <button className={`self-start px-5 py-2 text-sm font-bold transition bg-white rounded-full hover:bg-slate-100 md:self-center ${p.textColor}`}>{p.button}</button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section id="contact" className="relative flex items-center min-h-screen py-32 overflow-hidden" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          {/* Ambient Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -top-24 -left-24" />
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl bottom-0 right-0" />
          </div>

          <div className="max-w-4xl px-6 mx-auto text-center">
            {/* Title */}
            <motion.h2 variants={contactItem} custom={0} className="mb-6 text-4xl italic font-black uppercase text-transparent bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text md:text-5xl">
              Let’s Connect
            </motion.h2>

            {/* Subtitle */}
            <motion.p variants={contactItem} custom={1} className="max-w-2xl mx-auto mb-14 text-lg text-slate-600 dark:text-slate-400">
              Tertarik untuk berdiskusi, berkolaborasi, atau sekadar menyapa? Saya terbuka untuk peluang dan obrolan baru 🚀
            </motion.p>

            {/* Info Cards */}
            <motion.div variants={contactItem} custom={1.5} className="grid grid-cols-1 gap-4 mb-16 sm:grid-cols-3">
              <div className="p-4 border backdrop-blur rounded-2xl bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800">
                <p className="mb-1 text-xs font-bold text-blue-600 uppercase">Role</p>
                <p className="text-sm opacity-80">Information Systems Student</p>
              </div>

              <div className="p-4 border backdrop-blur rounded-2xl bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800">
                <p className="mb-1 text-xs font-bold text-cyan-500 uppercase">Focus</p>
                <p className="text-sm opacity-80">Web, ERP, Cybersecurity</p>
              </div>

              <div className="p-4 border backdrop-blur rounded-2xl bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800">
                <p className="mb-1 text-xs font-bold text-emerald-500 uppercase">Status</p>
                <p className="text-sm opacity-80">Open to Collaboration</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={contactItem} custom={2} className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              {/* Primary CTA */}
              <motion.a
                href="mailto:raihanazkahidayat90@gmail.com"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-10 py-4 font-bold text-white transition-all bg-blue-600 rounded-full shadow-lg group hover:bg-blue-700 shadow-blue-500/30"
              >
                Contact Me
                <motion.span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20" animate={{ x: [0, 8, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
                  <ArrowRight size={20} strokeWidth={2.5} />
                </motion.span>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a href="https://linkedin.com" target="_blank" whileHover={{ x: 8 }} className="flex items-center gap-2 text-sm font-bold transition-all text-slate-500 hover:text-blue-600">
                Let’s Connect on LinkedIn
                <span className="opacity-60">↗</span>
              </motion.a>
            </motion.div>

            {/* Micro Hint */}
            <motion.div animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} className="mt-20 text-sm opacity-50">
              ↓ Let’s build something meaningful together
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Name */}
            <h3 className="text-lg font-semibold tracking-wide">Raihan Azka Hidayat</h3>

            {/* Tagline */}
            <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">Information Systems Student • Web & ERP Enthusiast</p>

            {/* Divider */}
            <span className="h-px w-16 bg-slate-300 dark:bg-slate-700" />

            {/* Copyright */}
            <p className="text-xs opacity-50">© 2026 • Built with React & Tailwind</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            whileHover={{
              scale: 1.15,
              rotate: -15,
              boxShadow: '0 0 30px rgba(59,130,246,0.8)',
            }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-blue-600 text-white"
            aria-label="Back to top"
          >
            <Rocket />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
