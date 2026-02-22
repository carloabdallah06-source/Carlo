import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Camera, Sparkles, Users, Music, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'PhotoBooths',
    description: 'Mirror photo booth, 360 spinner, audio guestbook, and telephone cabinet.',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Special Effects',
    description: 'Confetti, bubble, balloons, CO2 guns, dry ice, fireworks, LED sticks & more.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Performers',
    description: 'Shots girl, glitter, cigar, mirror characters, tall dress violinist & more.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Setups',
    description: 'Bespoke proposal and birthday decorations tailored to you.',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
  },
];

export const HomeServices = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 px-6 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif text-white"
          >
            Bespoke Event Solutions
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index + 0.3 }}
              className="luxury-card group overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-black/60 backdrop-blur-md border border-gold/30 flex items-center justify-center text-gold">
                  <service.icon size={20} />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link to="/services" className="text-gold text-[10px] uppercase tracking-widest font-bold flex items-center group/link">
                  Learn More
                  <ArrowRight size={12} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArrowRight = ({ size, className }: { size: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
