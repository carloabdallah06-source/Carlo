import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Phone as WhatsApp, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { 
    name: 'Services', 
    path: '/services',
    subLinks: [
      { name: 'Photobooth', path: '/services?category=photobooth' },
      { name: 'Show Performers & Characters', path: '/services?category=performers' },
      { name: 'Zaffe & Parade', path: '/services?category=zaffe' },
      { name: 'Live Musicians', path: '/services?category=musicians' },
      { name: 'Special Effects', path: '/services?category=effects' },
      { name: 'Hostesses', path: '/services?category=hostesses' },
      { name: 'Setups', path: '/services?category=setups' },
    ]
  },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Feedbacks', path: '/feedbacks' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4',
        scrolled ? 'glass-nav py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col items-center group">
          <span className="text-2xl md:text-3xl font-serif tracking-[0.2em] text-white group-hover:text-gold transition-colors duration-300">
            PIXVIBE
          </span>
          <span className="text-[10px] md:text-xs tracking-[0.5em] text-gold uppercase -mt-1">
            EVENTS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div 
              key={link.path} 
              className="relative group/nav"
              onMouseEnter={() => link.name === 'Services' && setServicesOpen(true)}
              onMouseLeave={() => link.name === 'Services' && setServicesOpen(false)}
            >
              <Link
                to={link.path}
                className={cn(
                  'text-[11px] uppercase tracking-widest hover:text-gold transition-colors duration-300 flex items-center gap-1',
                  location.pathname === link.path ? 'text-gold' : 'text-white/80'
                )}
              >
                {link.name}
                {link.subLinks && <ChevronDown size={12} className={cn('transition-transform duration-300', servicesOpen && 'rotate-180')} />}
              </Link>

              {link.subLinks && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-64 bg-black/90 backdrop-blur-xl border border-white/10 mt-4 py-4 shadow-2xl"
                    >
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-6 py-2 text-[10px] uppercase tracking-widest text-white/70 hover:text-gold hover:bg-white/5 transition-all"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <a
            href="https://wa.me/96100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gold hover:text-white transition-colors duration-300"
          >
            <WhatsApp size={16} />
            <span className="text-[11px] uppercase tracking-widest">WhatsApp</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 md:hidden flex flex-col items-center py-8 space-y-6 max-h-[80vh] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <div key={link.path} className="w-full text-center">
                {link.subLinks ? (
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={cn(
                        'text-sm uppercase tracking-widest flex items-center gap-2',
                        location.pathname === link.path ? 'text-gold' : 'text-white'
                      )}
                    >
                      {link.name}
                      <ChevronDown size={16} className={cn('transition-transform', mobileServicesOpen && 'rotate-180')} />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col items-center space-y-4 mt-4 bg-white/5 w-full py-4"
                        >
                          {link.subLinks.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="text-xs uppercase tracking-widest text-white/60 hover:text-gold"
                            >
                              {sub.name}
                            </Link>
                          ))}
                          <Link to="/services" className="text-xs uppercase tracking-widest text-gold font-bold pt-2">
                            View All Services
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      'text-sm uppercase tracking-widest',
                      location.pathname === link.path ? 'text-gold' : 'text-white'
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex space-x-6 pt-4">
              <a href="#" className="text-white hover:text-gold">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold">
                <WhatsApp size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

