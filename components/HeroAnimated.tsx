'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function HeroAnimated() {
  const containerRef = useRef<HTMLElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [assembled, setAssembled] = useState(false);

  const { scrollY } = useScroll();
  const burgerParallax = useTransform(scrollY, [0, 500], [0, -80]);
  const baguetteParallax = useTransform(scrollY, [0, 500], [0, -50]);
  const titleParallax = useTransform(scrollY, [0, 500], [0, -30]);

  const springConfig = { stiffness: 60, damping: 15 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  useSpring(mouseY, springConfig); // vertical spring — disponible pour extension future

  useEffect(() => {
    const timer = setTimeout(() => setAssembled(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMouseX(x);
    setMouseY(y);
  };

  const NUM_LAYERS = 6;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
      style={{ zIndex: 0 }}
    >
      {/* Fond radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,20,20,0.15) 0%, transparent 70%)',
        }}
      />

      {/* LAYOUT 3 colonnes */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 py-24">

        {/* ===== COLONNE GAUCHE : BURGER ===== */}
        <motion.div
          style={{ y: burgerParallax, x: mouseXSpring }}
          className="hidden lg:flex flex-col items-center justify-center"
        >
          <div className="relative w-[280px] h-[320px]">
            {Array.from({ length: NUM_LAYERS }).map((_, i) => {
              const layerIndex = NUM_LAYERS - 1 - i;
              return (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 80, scale: 0.7, filter: 'blur(8px)' }}
                  animate={assembled ? {
                    opacity: i === NUM_LAYERS - 1 ? 1 : 0.15 + (i / NUM_LAYERS) * 0.85,
                    y: -layerIndex * 3,
                    scale: 0.92 + (i / NUM_LAYERS) * 0.08,
                    filter: 'blur(0px)',
                  } : {}}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ zIndex: i }}
                >
                  <Image
                    src="/smash/Original_Smash_8.50euro.webp"
                    alt="Smash Burger"
                    fill
                    className="object-contain"
                    style={{
                      filter: i < NUM_LAYERS - 1
                        ? `brightness(${0.3 + (i / NUM_LAYERS) * 0.7}) saturate(${0.5 + (i / NUM_LAYERS) * 0.5})`
                        : 'none',
                      transform: `translateY(${-i * 2}px)`,
                    }}
                    priority
                    unoptimized
                    onError={() => {}}
                  />
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={assembled ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(239,68,68,0.4) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={assembled ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase">Smash Burger</p>
            <p className="text-white/30 text-xs mt-1">Viande du boucher · 120g</p>
          </motion.div>
        </motion.div>

        {/* ===== COLONNE CENTRE : TITRE ===== */}
        <motion.div
          style={{ y: titleParallax }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
            style={{
              borderColor: 'rgba(239,68,68,0.4)',
              background: 'rgba(239,68,68,0.1)',
              color: '#f87171',
            }}
          >
            🔥 100% Halal · Viande du boucher
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none"
            >
              BREAD
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 200 }}
            className="text-4xl md:text-5xl font-black text-red-500 my-1"
          >
            &amp;
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none"
            >
              SMASH
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-white/50 text-sm md:text-base mb-8 max-w-xs"
          >
            Smash burgers · Baguettes · Sandwiches · Frites maison
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="/menu"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-full text-sm transition-all duration-200 hover:scale-105 active:scale-95 text-center"
            >
              🍔 Voir le menu
            </a>
            <a
              href="/menu"
              className="border border-white/20 hover:border-white/40 text-white font-medium px-8 py-3 rounded-full text-sm transition-all duration-200 hover:bg-white/5 text-center"
            >
              Commander →
            </a>
          </motion.div>
        </motion.div>

        {/* ===== COLONNE DROITE : BAGUETTE ===== */}
        <motion.div
          style={{ y: baguetteParallax, x: mouseXSpring }}
          className="hidden lg:flex flex-col items-center justify-center"
        >
          <div className="relative w-[300px] h-[320px]">
            {Array.from({ length: NUM_LAYERS }).map((_, i) => {
              const layerIndex = NUM_LAYERS - 1 - i;
              return (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 80, scale: 0.7, filter: 'blur(8px)' }}
                  animate={assembled ? {
                    opacity: i === NUM_LAYERS - 1 ? 1 : 0.15 + (i / NUM_LAYERS) * 0.85,
                    y: -layerIndex * 3,
                    scale: 0.92 + (i / NUM_LAYERS) * 0.08,
                    filter: 'blur(0px)',
                  } : {}}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ zIndex: i }}
                >
                  <Image
                    src="/baguettes/Bavette_10.90euro.png"
                    alt="Baguette Bavette"
                    fill
                    className="object-contain"
                    style={{
                      filter: i < NUM_LAYERS - 1
                        ? `brightness(${0.3 + (i / NUM_LAYERS) * 0.7}) saturate(${0.5 + (i / NUM_LAYERS) * 0.5})`
                        : 'none',
                      transform: `translateY(${-i * 2}px)`,
                    }}
                    priority
                    unoptimized
                    onError={() => {}}
                  />
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={assembled ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-44 h-8 rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(251,191,36,0.35) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={assembled ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">Baguette</p>
            <p className="text-white/30 text-xs mt-1">Frites maison incluses</p>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs tracking-widest uppercase">Menu</span>
        <span className="text-xl">↓</span>
      </motion.div>
    </section>
  );
}
