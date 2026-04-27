import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lock, ArrowLeft, Phone } from 'lucide-react'

const ForgotPasswordOTP = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const phoneNumber = location.state?.phoneNumber
  const inputRefs = useRef([])

  // Redirect if no phone number
  useEffect(() => {
    if (!phoneNumber) {
      navigate('/login')
    }
  }, [phoneNumber, navigate])

  // Timer for resend button
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleChange = (e, index) => {
    const value = e.target.value
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError('')

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text')
    const digits = paste.replace(/\D/g, '').slice(0, 6).split('')

    const newOtp = [...otp]
    digits.forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit
    })
    setOtp(newOtp)

    const lastIndex = digits.length - 1
    if (lastIndex < 5) {
      inputRefs.current[lastIndex + 1]?.focus()
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    const otpCode = otp.join('')

    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Demo: accept 123456 as valid OTP
      if (otpCode === '123456') {
        navigate('/reset-password', {
          state: { phoneNumber },
          replace: true
        })
      } else {
        setError('Invalid OTP. Please try again.')
        setOtp(['', '', '', '', '', ''])
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = () => {
    setOtp(['', '', '', '', '', ''])
    setError('')
    setResendTimer(30)
    inputRefs.current[0]?.focus()
  }

  const handleBack = () => {
    navigate('/login', { replace: true })
  }

  if (!phoneNumber) {
    return null
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
            <div className='grid place-items-center h-16 w-16 rounded-2xl bg-violet-100 text-violet-600'>
              <Phone size={32} />
            </div>
          </div>
          <p className='text-xs font-semibold uppercase tracking-[0.25em] text-gray-200'>Password Recovery</p>
          <h1 className='mt-2 text-2xl sm:text-3xl font-bold text-white'>Verify Your Number</h1>
          <p className='mt-3 text-sm text-white/70'>
            We've sent a 6-digit verification code to <br />
            <span className='font-semibold text-white/90'>{phoneNumber}</span>
          </p>
        </div>

        {/* OTP Input */}
        <form onSubmit={handleVerify} className='grid gap-6'>
          <div className='grid gap-4'>
            <label className='text-sm font-medium text-white/85'>Verification Code</label>
            <div className='flex gap-2 sm:gap-3 justify-center sm:justify-between' onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => inputRefs.current[index] = el}
                  type='text'
                  inputMode='numeric'
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength='1'
                  className='w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-white/10 bg-white/6 text-center text-lg sm:text-xl font-bold text-white placeholder:text-white/35 outline-none transition-all duration-200 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 hover:border-white/20'
                  placeholder='–'
                  disabled={isLoading}
                />
              ))}
            </div>
            {error && <span className='text-xs text-rose-400 text-center mt-2'>{error}</span>}
          </div>

          {/* Verify Button */}
          <button
            type='submit'
            disabled={isLoading || otp.join('').length !== 6}
            className='h-11 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>

          {/* Resend OTP */}
          <div className='text-center'>
            <p className='text-sm text-white/70'>Didn't receive the code?</p>
            <button
              type='button'
              onClick={handleResend}
              disabled={resendTimer > 0 || isLoading}
              className='mt-2 text-sm font-semibold text-[#f5d97c] hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-opacity'
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
            </button>
          </div>
        </form>

        {/* Info Text */}
        <p className='mt-6 text-center text-xs text-white/60'>
          For demo purposes, use <span className='font-mono font-semibold text-white/80'>123456</span> as OTP
        </p>
      </div>
    </section>
  )
}

export default ForgotPasswordOTP
