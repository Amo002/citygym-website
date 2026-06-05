"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function Hero({ data }: { data: SiteContent["hero"] }) {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/80 to-bg" />
        <div className="absolute inset-0 lines-bg opacity-40" />
        <div className="glow-orange absolute inset-x-0 top-0 h-[60vh]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-24 sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-bg-elevated/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {data.eyebrow}
        </motion.span>

        <h1 className="hero-title font-display mt-6 text-[18vw] leading-[0.85] sm:text-[14vw] lg:text-[11rem]">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            {data.titleTop}
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-gradient inline-block">{data.titleHighlight}</span>{" "}
            <span className="text-fg">{data.titleBottom}</span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 max-w-xl text-lg text-fg-muted"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-brand-ink transition-transform hover:scale-105"
          >
            {data.ctaPrimary}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#classes"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/50 px-7 py-3.5 font-semibold backdrop-blur transition-colors hover:border-brand"
          >
            <Play size={16} className="text-brand" />
            {data.ctaSecondary}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
        >
          {data.stats.map((s) => (
            <div key={s.label} className="bg-bg-elevated px-6 py-6">
              <div className="font-display text-4xl text-brand">{s.value}</div>
              <div className="mt-1 text-sm text-fg-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
