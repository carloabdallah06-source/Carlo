import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Tag, 
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminOverview = () => {
  const [stats, setStats] = useState({
    testimonials: 0,
    gallery: 0,
    categories: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [t, g, c] = await Promise.all([
        supabase.from('testimonials').select('id', { count: 'exact' }),
        supabase.from('gallery').select('id', { count: 'exact' }),
        supabase.from('categories').select('id', { count: 'exact' })
      ]);

      setStats({
        testimonials: t.count || 0,
        gallery: g.count || 0,
        categories: c.count || 0
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    { 
      name: 'Testimonials', 
      value: stats.testimonials, 
      icon: MessageSquare, 
      path: '/admin/dashboard/testimonials',
      color: 'text-blue-400'
    },
    { 
      name: 'Gallery Items', 
      value: stats.gallery, 
      icon: ImageIcon, 
      path: '/admin/dashboard/gallery',
      color: 'text-gold'
    },
    { 
      name: 'Categories', 
      value: stats.categories, 
      icon: Tag, 
      path: '/admin/dashboard/categories',
      color: 'text-emerald-400'
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-serif text-white mb-2">Welcome Back</h1>
        <p className="text-white/40 text-xs uppercase tracking-widest">Here's what's happening with PixVibe</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {cards.map((card) => (
          <Link 
            key={card.name}
            to={card.path}
            className="bg-zinc-900/50 border border-white/10 p-8 rounded-sm group hover:border-gold/50 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 bg-white/5 rounded-sm ${card.color}`}>
                <card.icon size={24} />
              </div>
              <ArrowUpRight className="text-white/20 group-hover:text-gold transition-colors" size={20} />
            </div>
            <h3 className="text-4xl font-serif text-white mb-1">{card.value}</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">{card.name}</p>
          </Link>
        ))}
      </div>

      <div className="bg-zinc-900/30 border border-white/5 p-10 rounded-sm">
        <h2 className="text-2xl font-serif text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/dashboard/gallery" className="btn-outline text-center py-4">Upload Media</Link>
          <Link to="/admin/dashboard/testimonials" className="btn-outline text-center py-4">Add Testimonial</Link>
          <Link to="/gallery" target="_blank" className="btn-outline text-center py-4">View Website</Link>
          <Link to="/contact" target="_blank" className="btn-outline text-center py-4">Check Inquiries</Link>
        </div>
      </div>
    </div>
  );
};
