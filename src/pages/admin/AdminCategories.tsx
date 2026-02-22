import React, { useEffect, useState } from 'react';
import { supabase, Category } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Save, X, Loader2, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (!error && data) {
      setCategories(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!newName.trim()) return;

    if (editingId) {
      const { error } = await supabase
        .from('categories')
        .update({ name: newName })
        .eq('id', editingId);
      
      if (!error) {
        setEditingId(null);
        setNewName('');
        fetchCategories();
      }
    } else {
      const { error } = await supabase
        .from('categories')
        .insert([{ name: newName }]);
      
      if (!error) {
        setIsAdding(false);
        setNewName('');
        fetchCategories();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure? Deleting a category might affect items linked to it.')) {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (!error) {
        fetchCategories();
      }
    }
  };

  const startEdit = (c: Category) => {
    setEditingId(c.id);
    setNewName(c.name);
    setIsAdding(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Categories</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest">Organize your gallery</p>
        </div>
        <button 
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setNewName('');
          }}
          className="btn-gold flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add Category</span>
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
            <div className="space-y-2 mb-6">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Category Name</label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-grow bg-black border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  placeholder="e.g. Weddings, Corporate, Special Effects"
                />
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      setIsAdding(false);
                      setEditingId(null);
                    }}
                    className="p-3 text-white/40 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={!newName.trim()}
                    className="btn-gold p-3 disabled:opacity-50"
                  >
                    <Save size={20} />
                  </button>
                </div>
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
        <div className="grid grid-cols-1 gap-4">
          {categories.map((c) => (
            <div 
              key={c.id}
              className="bg-zinc-900/50 border border-white/5 p-4 flex items-center justify-between group hover:border-white/20 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-gold/50 group-hover:text-gold transition-colors">
                  <Tag size={18} />
                </div>
                <span className="text-lg font-serif text-white">{c.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => startEdit(c)}
                  className="p-2 text-white/40 hover:text-gold transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(c.id)}
                  className="p-2 text-white/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {categories.length === 0 && !loading && (
            <div className="text-center py-20 border border-dashed border-white/10">
              <p className="text-white/40 uppercase tracking-widest text-sm">No categories created yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
