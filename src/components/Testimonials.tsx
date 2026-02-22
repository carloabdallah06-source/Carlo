import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Nadine & Marc',
    role: 'Wedding at Chateau Rweiss',
    text: 'The special effects during our first dance were absolutely magical. The heavy fog and cold sparks made it feel like we were dancing in the clouds. PixVibe exceeded all our expectations.',
  },
  {
    name: 'Sami Haddad',
    role: 'Corporate Gala, Beirut',
    text: 'Professionalism at its finest. The performers were world-class and the PhotoBooth was the highlight of the evening for our guests. Highly recommended for premium events.',
  },
  {
    name: 'Layla K.',
    role: 'Private Engagement',
    text: 'The Audio Guest Book was such a unique touch! Listening back to the voices of our loved ones is a treasure we will keep forever. Thank you PixVibe for the beautiful memories.',
  },
];

export const Testimonials = () => {
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
            Client Experiences
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif text-white"
          >
            Voices of Elegance
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index + 0.3 }}
              className="p-10 bg-zinc-900/30 border border-white/5 relative"
            >
              <Quote className="text-gold/20 absolute top-8 right-8" size={40} />
              <p className="text-white/70 text-lg italic mb-8 leading-relaxed font-light">
                "{t.text}"
              </p>
              <div>
                <h4 className="text-white font-serif text-xl">{t.name}</h4>
                <p className="text-gold text-xs uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
