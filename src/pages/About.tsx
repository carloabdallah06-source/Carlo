import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Shield, Award, Users, Clock } from 'lucide-react';

const values = [
  {
    title: 'Excellence',
    description: 'We strive for perfection in every detail, ensuring your event is nothing short of extraordinary.',
    icon: Award,
  },
  {
    title: 'Reliability',
    description: 'Our team is dedicated to providing a seamless experience, from planning to execution.',
    icon: Shield,
  },
  {
    title: 'Creativity',
    description: 'We bring fresh, innovative ideas to every event, making it unique and memorable.',
    icon: Clock,
  },
  {
    title: 'Professionalism',
    description: 'Our staff are trained to the highest standards of hospitality and event production.',
    icon: Users,
  },
];

export const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif text-white mb-8"
          >
            Architects of <span className="italic text-gold-light">Atmosphere</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
              A Decade of <br />
              <span className="text-gold italic">Luxury Production</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6 font-light">
              Founded in Beirut, PixVibe Events emerged from a passion for cinematic storytelling and world-class entertainment. We recognized that Lebanon's most prestigious events required a level of production that went beyond the ordinary.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-8 font-light">
              Today, we are proud to be the preferred partner for luxury weddings, high-end private galas, and corporate events across the region. Our team combines technical expertise with an artistic eye to deliver experiences that are as seamless as they are spectacular.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold uppercase tracking-widest text-xs font-bold">The PixVibe Standard</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000"
                alt="Luxury Event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gold p-8 hidden md:block">
              <p className="text-black font-serif text-4xl leading-none mb-2">10+</p>
              <p className="text-black/60 text-[10px] uppercase tracking-widest font-bold">Years of Experience</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" ref={ref}>
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto mb-6">
                <value.icon size={32} />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">{value.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed font-light">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
