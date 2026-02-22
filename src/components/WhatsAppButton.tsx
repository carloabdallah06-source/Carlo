import React from 'react';
import { motion } from 'motion/react';
import { Phone as WhatsApp } from 'lucide-react';

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/96100000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 transition-shadow"
    >
      <WhatsApp size={28} fill="currentColor" />
    </motion.a>
  );
};
