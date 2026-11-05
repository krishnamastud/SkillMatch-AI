import React, { useState, useEffect } from "react";
import { Command, Sparkles, Check, Loader2 } from "lucide-react";

const LOADING_STEPS = [
  "Verifying credentials...",
  "Loading your resume workspace...",
  "Initializing AI skill-gap engine...",
];

const WorkspaceLoader = ({ message }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < LOADING_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 650);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col items-center justify-center p-4 selection:bg-indigo-50 selection:text-indigo-600">
      <div className="w-full max-w-[340px] bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center">
        
        {/* Animated Brand Mark */}
        <div className="relative mb-5">
          {/* Subtle Indigo AI Pulse Ring */}
          <div className="absolute -inset-1.5 bg-indigo-500/10 rounded-2xl animate-pulse" />
          
          <div className="relative w-11 h-11 bg-zinc-900 text-white rounded-xl flex items-center justify-center shadow-sm">
            <Command className="w-5 h-5" />
          </div>

          {/* Floating AI Badge */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-md flex items-center justify-center shadow-2xs">
            <Sparkles className="w-3 h-3" />
          </div>
        </div>

        {/* Primary Status */}
        <h2 className="text-sm font-semibold tracking-tight text-zinc-900">
          {message || "Setting up your workspace"}
        </h2>
        <p className="text-xs text-zinc-500 mt-1 h-4 transition-all duration-200">
          {LOADING_STEPS[currentStep]}
        </p>

        {/* Sleek Minimal Progress Bar */}
        <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden mt-5 mb-4">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep + 1) / LOADING_STEPS.length) * 100}%`,
            }}
          />
        </div>

        {/* Step Checklist */}
        <div className="w-full space-y-2 pt-2 border-t border-zinc-100 text-left">
          {LOADING_STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div
                key={step}
                className={`flex items-center gap-2.5 text-[11px] transition-colors duration-200 ${
                  isCompleted
                    ? "text-zinc-500"
                    : isActive
                    ? "text-zinc-900 font-medium"
                    : "text-zinc-300"
                }`}
              >
                {isCompleted ? (
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                ) : isActive ? (
                  <Loader2 className="w-3.5 h-3.5 text-indigo-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-zinc-200 shrink-0" />
                )}
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Footer Hint */}
      <p className="text-[11px] text-zinc-400 mt-4">
        Redirecting to dashboard...
      </p>
    </div>
  );
};

export default WorkspaceLoader;