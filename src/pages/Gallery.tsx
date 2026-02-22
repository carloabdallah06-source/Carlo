import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase, GalleryItem } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

const staticGalleryItems = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', category: 'Wedding' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', category: 'Effects' },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800', category: 'PhotoBooth' },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=800', category: 'Performers' },
  { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800', category: 'Effects' },
  { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800', category: 'Hostesses' },
  { id: '7', type: 'image', url: 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?auto=format&fit=crop&q=80&w=800', category: 'Audio Guest Book' },
  { id: '8', type: 'image', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800', category: 'Wedding' },
  { id: '9', type: 'image', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800', category: 'Wedding' },
];

export const Gallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data && data.length > 0) {
          setItems(data);
        } else {
          setItems(staticGalleryItems);
        }
      } catch (err) {
        console.warn('Supabase not configured, using static data');
        setItems(staticGalleryItems);
      }
      setLoading(false);
    };

    fetchGallery();
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
            Our Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif text-white mb-8"
          >
            Visual <span className="italic text-gold-light">Excellence</span>
          </motion.h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gold" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square group overflow-hidden cursor-pointer bg-zinc-900"
              >
                {item.type === 'video' ? (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    muted
                    loop
                    onMouseOver={(e) => e.currentTarget.play()}
                    onMouseOut={(e) => e.currentTarget.pause()}
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={`Gallery ${item.id}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                  <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-white font-serif text-2xl">
                    {item.type === 'video' ? 'Play Moment' : 'View Moment'}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
