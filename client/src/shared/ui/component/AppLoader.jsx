import React from "react";
import { Command, Loader2 } from "lucide-react";

/**
 * @param {string} variant - "fullscreen" | "overlay" | "inline"
 * @param {string} label - Optional subtle text below/next to the loader
 */
const AppLoader = ({ variant = "fullscreen", label = "" }) => {
  // 1. INLINE: For inside cards, tables, or skill-gap widgets
  if (variant === "inline") {
    return (
      <div className="w-full py-8 flex items-center justify-center gap-2 text-zinc-500">
        <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
        {label && <span className="text-xs font-medium">{label}</span>}
      </div>
    );
  }

  // 2. OVERLAY: Frosted glass lock over forms or resume preview during AI actions
  if (variant === "overlay") {
    return (
      <div className="fixed inset-0 z-50 bg-zinc-50/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 select-none">
        <div className="bg-white border border-zinc-200/80 rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
          <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
          <span className="text-xs font-medium text-zinc-800">
            {label || "Processing..."}
          </span>
        </div>
      </div>
    );
  }

  // 3. FULLSCREEN (Default): For page refresh (F5), JWT checks, & route redirects
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      {/* Keyframes for smooth top & bottom indeterminate shimmer */}
      <style>{`
        @keyframes progress-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-bar {
          animation: progress-slide 1.4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>

      {/* Top 2px Browser-Edge Progress Bar (Indigo AI Accent) */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-zinc-200/60 overflow-hidden z-50">
        <div className="w-full h-full bg-indigo-600 animate-progress-bar" />
      </div>

      {/* Minimal Center Brand Mark (No bulky card) */}
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {/* Outer subtle spinning ring */}
          <div className="w-12 h-12 rounded-2xl border border-zinc-200/80 bg-white shadow-2xs flex items-center justify-center">
            <div className="w-9 h-9 bg-zinc-900 text-white rounded-xl flex items-center justify-center">
              <Command className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Ultra-minimal horizontal shimmer pill */}
        <div className="w-16 h-1 bg-zinc-200/80 rounded-full overflow-hidden mt-4">
          <div className="w-full h-full bg-zinc-900 rounded-full animate-progress-bar" />
        </div>

        {/* Optional Status Label */}
        {label && (
          <p className="text-xs font-medium text-zinc-500 mt-3 tracking-tight">
            {label}
          </p>
        )}
      </div>
    </div>
  );
};

export default AppLoader;
