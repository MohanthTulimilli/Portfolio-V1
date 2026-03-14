import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white"
        aria-hidden
      />
    </div>
  );
}
