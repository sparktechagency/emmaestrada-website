'use client'

import { useEffect, useState } from 'react';

export default function Loader() {
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const next = prev + Math.floor(Math.random() * 15) + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setHidden(true), 500); // hide loader after small delay
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-700 ${
        hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Pulsing Ring */}
      <div
        className="absolute w-40 h-40 border-2 border-orange-500 rounded-full opacity-20"
        style={{ animation: 'pulse-ring 2s infinite' }}
      ></div>

      {/* Bouncing Bars */}
      <div className="flex items-end space-x-1 h-12 mb-8">
        {[6, 10, 8, 12, 7].map((h, i) => (
          <div
            key={i}
            className="w-1 bg-primary rounded"
            style={{
              height: `${h}rem`,
              animation: `bounce-custom 0.8s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Text */}
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase bg-gradient-to-r from-orange-500 via-purple-500 to-primary bg-clip-text text-transparent animate-[gradient-text_5s_ease_infinite]">
        Whop
      </h1>

      {/* Loading Percentage */}
      <p className="mt-4 text-zinc-500 font-mono text-sm tracking-widest uppercase">
        Tuning the vibe... {count}%
      </p>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-zinc-800 mt-6 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-cyan-500 transition-all duration-300"
          style={{ width: `${count}%` }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes gradient-text {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes bounce-custom {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
