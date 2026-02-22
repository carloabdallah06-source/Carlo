import React from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  message: string;
};

export const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert('Thank you for your inquiry. Our team will contact you shortly.');
  };

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
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif text-white mb-8"
          >
            Request a <span className="italic text-gold-light">Quote</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-serif text-white mb-8">Contact Information</h2>
            <p className="text-white/50 text-lg mb-12 font-light leading-relaxed">
              We would love to hear about your upcoming event. Fill out the form or reach out directly via WhatsApp for immediate assistance.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl mb-1">Our Office</h4>
                  <p className="text-white/40 text-sm uppercase tracking-widest">Antelias, Lebanon</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl mb-1">Phone & WhatsApp</h4>
                  <p className="text-white/40 text-sm uppercase tracking-widest">+961 03 427 919</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl mb-1">Email</h4>
                  <p className="text-white/40 text-sm uppercase tracking-widest">ManagementPixVibe@hotmail.com</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 p-10 border border-white/5"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Full Name</label>
                  <input
                    {...register('name', { required: true })}
                    className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Email Address</label>
                  <input
                    {...register('email', { required: true })}
                    className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Phone Number</label>
                  <input
                    {...register('phone', { required: true })}
                    className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                    placeholder="+961 03 427 919"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Event Date</label>
                  <input
                    {...register('date', { required: true })}
                    type="date"
                    className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Service Interested In</label>
                <select
                  {...register('service', { required: true })}
                  className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="photobooth">Luxury PhotoBooth</option>
                  <option value="360-spinner">360 Spinner</option>
                  <option value="effects">Special Effects (Fireworks, Smoke, etc.)</option>
                  <option value="performers">Performers (Shots Girl, Characters, etc.)</option>
                  <option value="musicians">Live Musicians</option>
                  <option value="zaffeh">Zaffeh & Parade</option>
                  <option value="audio-guestbook">Audio Guest Book</option>
                  <option value="hostesses">Hostesses</option>
                  <option value="setups">Setups (Proposal, Birthday, etc.)</option>
                  <option value="full-package">Full Event Package</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Message</label>
                <textarea
                  {...register('message', { required: true })}
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  placeholder="Tell us about your event..."
                />
              </div>

              <button type="submit" className="btn-gold w-full flex items-center justify-center space-x-2">
                <span>Send Inquiry</span>
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
