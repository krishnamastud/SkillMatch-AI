import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Command, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Login Payload:", data);
      reset();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = () => {
    // window.location.href = "http://localhost:5000/api/auth/google";
    console.log("Redirecting to Google OAuth...");
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex items-center justify-center p-4 selection:bg-indigo-50 selection:text-indigo-600">
      {/* Surface Card */}
      <div className="w-full max-w-[400px] bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        
        {/* Brand Logo & Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm ring-1 ring-zinc-900/5">
            <Command className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Welcome back
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Sign in to continue to your resume workspace
          </p>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 rounded-lg py-2.5 px-4 text-xs font-medium transition-all duration-150 shadow-2xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.9C3.5 21.4 7.4 24 12 24z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Minimal Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="border-t border-zinc-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
            or
          </span>
          <div className="border-t border-zinc-200 w-full"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-zinc-700 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              className={`w-full px-3 py-2 bg-zinc-50/50 focus:bg-white border rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-3 transition-all duration-150 ${
                errors.email
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                  : "border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900/5"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1.5 text-[11px] text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-zinc-700"
              >
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className={`w-full px-3 py-2 pr-9 bg-zinc-50/50 focus:bg-white border rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-3 transition-all duration-150 ${
                  errors.password
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                    : "border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900/5"
                }`}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors p-0.5"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-[11px] text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-900/60 disabled:cursor-not-allowed text-white font-medium text-xs py-2.5 px-4 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 shadow-xs focus:outline-none focus:ring-3 focus:ring-zinc-900/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-zinc-900 hover:text-zinc-700 font-medium underline underline-offset-4 transition-colors"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;