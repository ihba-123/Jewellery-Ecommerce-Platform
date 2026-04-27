import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react'

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState({})
  const phoneNumber = location.state?.phoneNumber

  // Redirect if no phone number
  if (!phoneNumber) {
    navigate('/login')
    return null
  }

  const errors = {}
  if (touched.password && !password) {
    errors.password = 'Password is required'
  } else if (touched.password && password.length < 6) {
    errors.password = 'Minimum 6 characters'
  }

  if (touched.confirmPassword && !confirmPassword) {
    errors.confirmPassword = 'Confirm password is required'
  } else if (touched.confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({ password: true, confirmPassword: true })

    // Validate
    if (Object.keys(errors).length > 0) {
      return
    }

    if (!password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Show success and redirect to login
      navigate('/login', {
        state: { message: 'Password updated successfully. Please login with your new password.' },
        replace: true
      })
    } catch (err) {
      setError('Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/login', { replace: true })
  }

  return (
    <section className='min-h-screen bg-transparent px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center'>
      {/* Background Glow */}
      <div className='absolute inset-0 -z-10 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]' />
      <div className='absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-white/10 blur-3xl' />
      <div className='absolute bottom-[-140px] right-[-120px] h-80 w-80 rounded-full bg-[#d4af37]/20 blur-3xl' />

      <div className='w-full max-w-md rounded-3xl border border-white/12 bg-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl p-5 sm:p-8 text-white relative z-10'>
        {/* Back Button */}
        <button
          onClick={handleBack}
          className='mb-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium'
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='mb-4 flex justify-center'>
            <div className='grid place-items-center h-16 w-16 rounded-2xl bg-emerald-100 text-emerald-600'>
              <Lock size={32} />
            </div>
          </div>
          <p className='text-xs font-semibold uppercase tracking-[0.25em] text-gray-200'>Set New Password</p>
          <h1 className='mt-2 text-2xl sm:text-3xl font-bold text-white'>Create New Password</h1>
          <p className='mt-3 text-sm text-white/70'>
            Enter a strong password to secure your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='grid gap-5'>
          {/* Error Message */}
          {error && (
            <div className='rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-sm text-rose-300'>
              {error}
            </div>
          )}

          {/* Password */}
          <label className='grid gap-2'>
            <span className='text-sm font-medium text-white/85'>New Password</span>
            <div className='relative'>
              <Lock
                size={17}
                className='absolute left-4 top-1/2 -translate-y-1/2 text-white/45 pointer-events-none'
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                placeholder='Enter new password'
                className={`w-full h-11 rounded-xl border px-4 pl-12 pr-12 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/6 ${
                  touched.password && errors.password
                    ? 'border-rose-400/70 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10'
                    : touched.password && !errors.password
                    ? 'border-emerald-400/70 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10'
                    : 'border-white/10 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10'
                }`}
                disabled={isLoading}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-white/45 hover:text-white/70 transition-colors'
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className='text-xs text-rose-400'>{errors.password}</span>
            )}
            {touched.password && !errors.password && (
              <span className='text-xs text-emerald-400 flex items-center gap-1'>
                <CheckCircle size={14} /> Strong password
              </span>
            )}
          </label>

          {/* Confirm Password */}
          <label className='grid gap-2'>
            <span className='text-sm font-medium text-white/85'>Confirm Password</span>
            <div className='relative'>
              <Lock
                size={17}
                className='absolute left-4 top-1/2 -translate-y-1/2 text-white/45 pointer-events-none'
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder='Confirm new password'
                className={`w-full h-11 rounded-xl border px-4 pl-12 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/6 ${
                  touched.confirmPassword && errors.confirmPassword
                    ? 'border-rose-400/70 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10'
                    : touched.confirmPassword && !errors.confirmPassword
                    ? 'border-emerald-400/70 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10'
                    : 'border-white/10 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10'
                }`}
                disabled={isLoading}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-white/45 hover:text-white/70 transition-colors'
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <span className='text-xs text-rose-400'>{errors.confirmPassword}</span>
            )}
            {touched.confirmPassword && !errors.confirmPassword && password && (
              <span className='text-xs text-emerald-400 flex items-center gap-1'>
                <CheckCircle size={14} /> Passwords match
              </span>
            )}
          </label>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isLoading}
            className='mt-2 h-11 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          >
            {isLoading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>

        {/* Password Requirements */}
        <div className='mt-6 p-3 rounded-lg bg-white/5 border border-white/10'>
          <p className='text-xs font-semibold text-white/80 mb-2'>Password Requirements:</p>
          <ul className='text-xs text-white/60 space-y-1'>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-white/40'></span>
              At least 6 characters
            </li>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-white/40'></span>
              Mix of uppercase and lowercase
            </li>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-white/40'></span>
              Include numbers and symbols
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
