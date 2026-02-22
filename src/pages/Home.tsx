import React from 'react';
import { motion } from 'motion/react';
import { Hero } from '../components/Hero';
import { HomeServices } from '../components/HomeServices';
import { HomeAbout } from '../components/HomeAbout';
import { Testimonials } from '../components/Testimonials';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <HomeAbout />
      <HomeServices />
      
      <Testimonials />
    </motion.div>
  );
};
