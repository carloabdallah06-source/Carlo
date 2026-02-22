import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex flex-col items-start mb-6">
            <span className="text-2xl font-serif tracking-[0.2em] text-white">PIXVIBE</span>
            <span className="text-[10px] tracking-[0.5em] text-gold uppercase -mt-1">EVENTS</span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Elevating wedding experiences across Lebanon with cinematic production, premium entertainment, and bespoke event services.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'About', 'Services', 'Gallery', 'Feedbacks', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-white/60 hover:text-gold text-sm transition-colors uppercase tracking-wider">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Services</h4>
          <ul className="space-y-4">
            {['PhotoBooths', 'Performers', 'Special Effects', 'Live Musicians', 'Zaffeh & Parade', 'Hostesses'].map((item) => (
              <li key={item}>
                <Link to="/services" className="text-white/60 hover:text-gold text-sm transition-colors uppercase tracking-wider">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 text-white/60 text-sm">
              <MapPin size={18} className="text-gold shrink-0" />
              <span>Antelias, Lebanon</span>
            </li>
            <li className="flex items-center space-x-3 text-white/60 text-sm">
              <Phone size={18} className="text-gold shrink-0" />
              <span>+961 03 427 919</span>
            </li>
            <li className="flex items-center space-x-3 text-white/60 text-sm">
              <Mail size={18} className="text-gold shrink-0" />
              <span>ManagementPixVibe@hotmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/30">
        <p>© {new Date().getFullYear()} PixVibe Events Lebanon. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Crafted for Excellence</p>
      </div>
    </footer>
  );
};
