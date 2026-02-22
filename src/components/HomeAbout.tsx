import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export const HomeAbout = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-32 px-6 bg-zinc-950 relative overflow-hidden" ref={ref}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] relative z-10">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000"
              alt="Luxury Event Planning"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square border border-gold/20 z-0" />
          <div className="absolute top-1/2 -left-10 w-32 h-32 bg-gold/10 backdrop-blur-3xl rounded-full z-0" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
            The PixVibe Legacy
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
            Crafting Cinematic <br />
            <span className="italic text-gold-light">Celebrations</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8 font-light">
            Based in Lebanon, PixVibe Events is a premier event production company. We specialize in creating elegant and memorable experiences for high-end weddings and corporate events.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-12 font-light">
            Our commitment to luxury is reflected in every detail, from the precision of our special effects to the caliber of our international performers. We don't just host events; we create legacies.
          </p>
          
          <div className="grid grid-cols-1 gap-8 mb-12">
            <div>
              <h4 className="text-3xl font-serif text-gold mb-1">500+</h4>
              <p className="text-white/40 text-xs uppercase tracking-widest">Events Perfected</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline"
          >
            Our Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
