"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-04-15T19:00:00Z");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0F172A]/80 z-10"></div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/stadium.png"
          alt="Champions League Stadium"
          fill
          className="object-cover"
          priority
        />
      </div>

      <motion.div
        className="relative z-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="mb-6" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <Image
            src="/logo.png"
            alt="Champions League Logo"
            width={120}
            height={120}
            className="mx-auto rounded-sm"
          />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">Champions League Quarter-Finals</h1>

        <div className="flex justify-center gap-4">
          {Object.entries(timeRemaining).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="bg-[#1E40AF] text-[#F8FAFC] w-14 h-14 rounded-lg flex items-center justify-center text-xl font-bold">
                {value}
              </div>
              <span className="text-xs text-[#94A3B8] mt-1 capitalize">{unit}</span>
            </div>
          ))}
        </div>

        {/* Favorites Link */}
        <Link
          href="/favorites"
          className="mt-6 inline-block text-[#38BDF8] hover:text-[#F8FAFC] font-medium text-sm underline transition-colors"
        >
          View Your Favorite Matches
        </Link>
      </motion.div>
    </div>
  );
}