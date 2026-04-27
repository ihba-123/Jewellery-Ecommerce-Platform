import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle, Phone } from "lucide-react";

const inputClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-white/35 focus:border-[#d4af37] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#d4af37]/15";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPhone, setForgotPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Show success message from password reset
  const successMessage = location.state?.message;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo login - accept any email/password
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!forgotPhone) {
      setError("Please enter your phone number");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to send OTP to phone
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to forgot password OTP page
      navigate("/forgot-password-otp", {
        state: {
          phoneNumber: forgotPhone,
        },
      });
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setForgotPhone("");
    setError("");
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]" />
      <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-80 w-80 rounded-full bg-[#d4af37]/20 blur-3xl" />

      {/* Card */}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
        {!isForgotPassword ? (
          <>
            {/* Login Form */}
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

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-sm text-emerald-300 flex items-start gap-3">
                <CheckCircle size={18} className="mt-0.5 flex-shrink-0" />
                <p>{successMessage}</p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-sm text-rose-300 flex items-start gap-3">
                  <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClassName}
                    disabled={isLoading}
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
                    onClick={() => setIsForgotPassword(true)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClassName}
                    disabled={isLoading}
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
                disabled={isLoading}
                className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Logging in..." : "Login"}
                {!isLoading && (
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
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
          </>
        ) : (
          <>
            {/* Forgot Password Form */}
            <div className="mb-7 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#f5d97c]">
                Password Recovery
              </p>

              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Forgot Password?
              </h1>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Enter your phone number to receive a verification code.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleForgotPassword}>
              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-sm text-rose-300 flex items-start gap-3">
                  <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {/* Phone Input */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/90">
                  Phone Number
                </span>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45"
                  />

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={forgotPhone}
                    onChange={(e) => setForgotPhone(e.target.value)}
                    className={inputClassName}
                    disabled={isLoading}
                  />
                </div>
              </label>

              {/* Info Text */}
              <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                <p className="text-xs text-violet-300">
                  We'll send a 6-digit verification code to this phone number.
                </p>
              </div>

              {/* Send OTP Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Sending..." : "Send OTP"}
                {!isLoading && (
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>

              {/* Back to Login */}
              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full text-center text-sm font-medium text-[#f5d97c] hover:underline pt-2"
              >
                Back to Login
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default Login;
