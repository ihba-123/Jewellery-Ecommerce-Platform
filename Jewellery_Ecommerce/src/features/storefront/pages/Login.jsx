import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";

const inputClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-white/35 focus:border-[#d4af37] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#d4af37]/15";

const Login = () => {
  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]" />
      <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-80 w-80 rounded-full bg-[#d4af37]/20 blur-3xl" />

      {/* Card */}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
        {/* Header */}
        <div className="mb-7 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#f5d97c]">
            Welcome Back
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Sign In
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/65">
            Login to continue shopping and manage your account.
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(event) => event.preventDefault()}
        >
          {/* Email */}
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/90">
              Email Address
            </span>

            <div className="relative">
              <Mail
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45"
              />

              <input
                type="email"
                placeholder="Enter your email"
                className={inputClassName}
              />
            </div>
          </label>

          {/* Password */}
          <label className="block">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-white/90">
                Password
              </span>

              <button
                type="button"
                className="text-xs font-medium text-[#f5d97c] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <Lock
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45"
              />

              <input
                type="password"
                placeholder="Enter your password"
                className={inputClassName}
              />
            </div>
          </label>

          {/* Remember me */}
          <label className="flex items-center gap-3 pt-1 text-sm text-white/70">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-white/10 accent-[#d4af37]"
            />
            Remember me
          </label>

          {/* Button */}
          <button
            type="submit"
            className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99]"
          >
            Login
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* Divider */}
          <div className="relative py-2 text-center">
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
            <span className="relative bg-transparent px-3 text-xs text-white/40">
              OR
            </span>
          </div>

          {/* Signup */}
          <p className="text-center text-sm text-white/65">
            New here?{" "}
            <Link
              to="/signup/customer"
              className="font-semibold text-[#f5d97c] hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;