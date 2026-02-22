import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Quote, Star, Loader2 } from 'lucide-react';
import { supabase, Testimonial } from '../lib/supabase';

const staticFeedbacks = [
  {
    name: 'Sarah & Marc',
    event: 'Wedding at Chateau Rweiss',
    text: 'PIXVIBE made our wedding truly magical. The 360 spinner was the highlight of the night, and the special effects during our first dance were breathtaking.',
    rating: 5,
  },
  {
    name: 'Corporate Gala',
    event: 'Four Seasons Beirut',
    text: 'Professional, elegant, and seamless. The hostesses and the mirror booth added a layer of sophistication to our corporate event that we hadn\'t seen before.',
    rating: 5,
  },
  {
    name: 'Lara Khoury',
    event: 'Birthday Celebration',
    text: 'The proposal setup was beyond my dreams. Every detail was perfect, from the lighting to the floral arrangements. Thank you for making it unforgettable.',
    rating: 5,
  },
  {
    name: 'Jean & Maria',
    event: 'Summer Wedding',
    text: 'The zaffeh and parade were so high energy! Our guests are still talking about the performers and the incredible atmosphere PIXVIBE created.',
    rating: 5,
  },
  {
    name: 'Royal Wedding',
    event: 'Grand Hills Hotel',
    text: 'Absolute perfection. The cold sparks and the dry ice machine created a cinematic experience for our entrance. Highly recommended for luxury events.',
    rating: 5,
  },
];

export const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data && data.length > 0) {
          setFeedbacks(data);
        } else {
          setFeedbacks(staticFeedbacks);
        }
      } catch (err) {
        console.warn('Supabase not configured, using static data');
        setFeedbacks(staticFeedbacks);
      }
      setLoading(false);
    };

    fetchFeedbacks();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
          >
            Testimonials
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif text-white mb-8"
          >
            Client <span className="italic text-gold-light">Feedbacks</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-lg max-w-2xl mx-auto font-light"
          >
            Hear from the couples and companies who have experienced the PIXVIBE magic.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gold" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="p-10 border border-white/10 bg-zinc-900/20 relative flex flex-col group hover:border-gold/50 transition-colors duration-500"
              >
                <Quote className="text-gold/20 absolute top-6 right-6 group-hover:text-gold/40 transition-colors" size={48} />
                
                <div className="flex mb-6">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-gold fill-gold mr-1" />
                  ))}
                </div>

                <p className="text-white/80 text-lg font-light leading-relaxed mb-8 italic">
                  "{feedback.text}"
                </p>

                <div className="mt-auto">
                  <h3 className="text-xl font-serif text-white mb-1">{feedback.name}</h3>
                  <p className="text-gold text-xs uppercase tracking-widest">{feedback.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-24 text-center">
          <p className="text-white/40 uppercase tracking-widest text-sm mb-8">Ready to create your own story?</p>
          <Link to="/contact" className="btn-gold">Book Your Event</Link>
        </div>
      </div>
    </motion.div>
  );
};
