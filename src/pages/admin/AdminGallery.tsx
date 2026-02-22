import React, { useEffect, useState, useCallback } from 'react';
import { supabase, GalleryItem, Category } from '../../lib/supabase';
import { 
  Plus, 
  Trash2, 
  Upload, 
  X, 
  Loader2, 
  Image as ImageIcon, 
  Video,
  Filter,
  Check
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAdding, setIsAdding] = useState(false);
  const [uploadData, setUploadData] = useState({
    category: '',
    type: 'image' as 'image' | 'video'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [itemsRes, catsRes] = await Promise.all([
      supabase.from('gallery').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name')
    ]);

    if (!itemsRes.error && itemsRes.data) setItems(itemsRes.data);
    if (!catsRes.error && catsRes.data) {
      setCategories(catsRes.data);
      if (catsRes.data.length > 0) {
        setUploadData(prev => ({ ...prev, category: catsRes.data[0].name }));
      }
    }
    setLoading(false);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!uploadData.category) {
      alert('Please select a category first');
      return;
    }

    setUploading(true);
    for (const file of acceptedFiles) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('assets')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('assets')
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase
          .from('gallery')
          .insert([{
            url: publicUrl,
            type: file.type.startsWith('video') ? 'video' : 'image',
            category: uploadData.category
          }]);

        if (dbError) throw dbError;
      } catch (err: any) {
        console.error('Upload error:', err);
        alert(`Failed to upload ${file.name}: ${err.message}`);
      }
    }
    setUploading(false);
    setIsAdding(false);
    fetchData();
  }, [uploadData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov', '.webm']
    }
  } as any);

  const handleDelete = async (item: GalleryItem) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // Extract file path from URL
      const urlParts = item.url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `gallery/${fileName}`;

      await supabase.storage.from('assets').remove([filePath]);
      const { error } = await supabase.from('gallery').delete().eq('id', item.id);
      
      if (!error) fetchData();
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(i => i.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Gallery Management</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest">Upload and organize media</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-zinc-900 border border-white/10 p-1 rounded-sm">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={cn(
                "px-4 py-2 text-[10px] uppercase tracking-widest transition-all",
                selectedCategory === 'all' ? "bg-gold text-black" : "text-white/60 hover:text-white"
              )}
            >
              All
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={cn(
                  "px-4 py-2 text-[10px] uppercase tracking-widest transition-all",
                  selectedCategory === cat.name ? "bg-gold text-black" : "text-white/60 hover:text-white"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="btn-gold flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => !uploading && setIsAdding(false)} />
            <div className="relative bg-zinc-900 border border-white/10 p-10 max-w-xl w-full rounded-sm shadow-2xl">
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-serif text-white mb-8">Upload Media</h2>
              
              <div className="space-y-6 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Select Category</label>
                  <select
                    value={uploadData.category}
                    onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div 
                  {...getRootProps()} 
                  className={cn(
                    "border-2 border-dashed rounded-sm p-12 text-center transition-all cursor-pointer",
                    isDragActive ? "border-gold bg-gold/5" : "border-white/10 hover:border-gold/50",
                    uploading && "opacity-50 pointer-events-none"
                  )}
                >
                  <input {...getInputProps()} />
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="animate-spin text-gold mb-4" size={32} />
                      <p className="text-white/60 text-sm">Uploading your files...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="text-gold mb-4" size={32} />
                      <p className="text-white text-sm mb-2">Drag & drop files here</p>
                      <p className="text-white/40 text-xs uppercase tracking-widest">or click to browse</p>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[10px] text-white/30 text-center uppercase tracking-widest">
                Supports JPG, PNG, WEBP, MP4, MOV (Max 50MB)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gold" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="relative aspect-square group overflow-hidden bg-zinc-900"
            >
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video size={48} className="text-white/20" />
                  <video 
                    src={item.url} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                <span className="text-[10px] text-gold uppercase tracking-[0.2em] mb-4 font-bold">
                  {item.category}
                </span>
                <button 
                  onClick={() => handleDelete(item)}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="absolute top-3 left-3 p-1.5 bg-black/60 backdrop-blur-md rounded-sm border border-white/10">
                {item.type === 'image' ? <ImageIcon size={12} /> : <Video size={12} />}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && !loading && (
            <div className="col-span-full text-center py-32 border border-dashed border-white/10">
              <p className="text-white/40 uppercase tracking-widest text-sm">No media found in this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
