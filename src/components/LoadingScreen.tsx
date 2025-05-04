// src/components/LoadingScreen.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setShow(false), 500); // Fade out after completion
          return 100;
        }
        return Math.min(oldProgress + Math.random() * 10, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground"
    >
      {/* Animated logo or spinner */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        }}
        className="mb-8 h-16 w-16 rounded-full bg-primary/20 p-2"
      >
        <div className="h-full w-full rounded-full border-4 border-primary border-t-transparent" />
      </motion.div>

      {/* Progress bar */}
      <div className="relative h-2 w-64 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="absolute left-0 top-0 h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Percentage text */}
      <motion.p
        className="mt-4 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Loading {progress}%
      </motion.p>
    </motion.div>
  );
};