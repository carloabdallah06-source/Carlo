import React, { useEffect, useState } from 'react';
import { supabase, Testimonial } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Star, Save, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    event: '',
    text: '',
    rating: 5
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setTestimonials(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (editingId) {
      const { error } = await supabase
        .from('testimonials')
        .update(formData)
        .eq('id', editingId);
      
      if (!error) {
        setEditingId(null);
        fetchTestimonials();
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert([formData]);
      
      if (!error) {
        setIsAdding(false);
        setFormData({ name: '', event: '', text: '', rating: 5 });
        fetchTestimonials();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (!error) {
        fetchTestimonials();
      }
    }
  };

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setFormData(t);
    setIsAdding(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Testimonials</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest">Manage client feedback</p>
        </div>
        <button 
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setFormData({ name: '', event: '', text: '', rating: 5 });
          }}
          className="btn-gold flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>

      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-zinc-900 border border-gold/30 p-8 mb-10 rounded-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Client Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  placeholder="e.g. Sarah & Marc"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Event Details</label>
                <input
                  type="text"
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  placeholder="e.g. Wedding at Chateau Rweiss"
                />
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Testimonial Text</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={4}
                className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                placeholder="What did the client say?"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={cn(
                        "transition-colors",
                        (formData.rating || 0) >= star ? "text-gold" : "text-white/20"
                      )}
                    >
                      <Star size={20} fill={(formData.rating || 0) >= star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                  }}
                  className="px-6 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="btn-gold flex items-center space-x-2"
                >
                  <Save size={18} />
                  <span>{editingId ? 'Update' : 'Save'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gold" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {testimonials.map((t) => (
            <div 
              key={t.id}
              className="bg-zinc-900/50 border border-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between group hover:border-white/20 transition-all"
            >
              <div className="flex-grow mr-8">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex text-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">{t.event}</span>
                </div>
                <h3 className="text-xl font-serif text-white mb-2">{t.name}</h3>
                <p className="text-white/60 text-sm font-light italic leading-relaxed">"{t.text}"</p>
              </div>
              <div className="flex items-center space-x-2 mt-6 md:mt-0">
                <button 
                  onClick={() => startEdit(t)}
                  className="p-3 bg-white/5 text-white/60 hover:text-gold hover:bg-gold/10 transition-all rounded-sm"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(t.id)}
                  className="p-3 bg-white/5 text-white/60 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-sm"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {testimonials.length === 0 && !loading && (
            <div className="text-center py-20 border border-dashed border-white/10">
              <p className="text-white/40 uppercase tracking-widest text-sm">No testimonials found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
