import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Building2, Mail, Lock, Phone, Globe, MapPin } from 'lucide-react'

const inputBase = 'w-full h-11 rounded-xl border bg-white px-4 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:ring-4';
const labelBase = 'text-sm font-medium text-white/85';

const businessFields = [
  { name: 'businessName', label: 'Business Name', type: 'text' },
  { name: 'contactPerson', label: 'Contact Person', type: 'text' },
  { name: 'businessEmail', label: 'Business Email', type: 'email' },
  { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  { name: 'registrationNumber', label: 'Registration Number', type: 'text' },
  { name: 'website', label: 'Website', type: 'url' },
  { name: 'addressLine1', label: 'Address Line 1', type: 'text', span: 'full' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'country', label: 'Country', type: 'text' },
]

const customerFields = [
  { name: 'fullName', label: 'Full Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
  { name: 'country', label: 'Country', type: 'text' },
  { name: 'addressLine1', label: 'Address Line 1', type: 'text', span: 'full' },
]

const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v)

export default function SignupExperience({ mode = 'customer' }) {
  const activeMode = mode === 'business' ? 'business' : 'customer'
  const fields = activeMode === 'business' ? businessFields : customerFields

  const initialValues = useMemo(() => fields.reduce((a, c) => ({ ...a, [c.name]: '' }), {}), [fields])
  const [formValues, setFormValues] = useState(initialValues)
  const [touched, setTouched] = useState({})

  const errors = useMemo(() => {
    const e = {}
    fields.forEach((f) => { if (!formValues[f.name]?.trim()) e[f.name] = `${f.label} is required` })
    const emailKey = activeMode === 'business' ? 'businessEmail' : 'email'
    if (formValues[emailKey] && !isValidEmail(formValues[emailKey])) e[emailKey] = 'Invalid email'
    if (formValues.password && formValues.password.length < 6) e.password = 'Minimum 6 characters'
    if (formValues.confirmPassword && formValues.password !== formValues.confirmPassword) e.confirmPassword = 'Passwords do not match'
    return e
  }, [fields, formValues, activeMode])

  const onChange = (e) => setFormValues((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleTabMouseDown = (e) => e.preventDefault()
  const onBlur = (e) => setTouched((p) => ({ ...p, [e.target.name]: true }))

  const getClass = (name) => {
    if (touched[name] && errors[name]) return `${inputBase} border-rose-400/70 bg-white/6 text-white placeholder:text-white/35 focus:border-rose-400 focus:ring-rose-500/10`
    if (touched[name] && !errors[name]) return `${inputBase} border-emerald-400/70 bg-white/6 text-white placeholder:text-white/35 focus:border-emerald-400 focus:ring-emerald-500/10`
    return `${inputBase} border-white/10 bg-white/6 text-white placeholder:text-white/35 focus:border-violet-400 focus:ring-violet-500/10`
  }

  return (
    <section className='min-h-screen bg-transparent px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center'>
      <div className='w-full max-w-3xl rounded-3xl border border-white/12 bg-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl p-5 sm:p-8 text-white'>
        <div className='mb-6 flex items-center justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.25em] text-gray-200'>Create Account</p>
            <h1 className='mt-2 text-2xl sm:text-3xl font-bold text-white'>{activeMode === 'business' ? 'Business Signup' : 'Customer Signup'}</h1>
            <p className='mt-1 text-sm text-white/70'>Modern, secure and responsive signup experience.</p>
          </div>
          <div className='hidden sm:grid place-items-center h-14 w-14 rounded-2xl bg-violet-100 text-violet-600'>
            {activeMode === 'business' ? <Building2 size={26}/> : <User size={26}/>}
          </div>
        </div>

        <div className='mb-6 grid grid-cols-2 rounded-2xl bg-white/6 p-1 gap-1 border border-white/10'>
          <Link to='/signup/customer' onMouseDown={handleTabMouseDown} className={`rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-all duration-200 ${activeMode==='customer'?'bg-white/12 text-white border border-white/10':'text-white/65 hover:text-white hover:bg-white/6'}`}>Customer</Link>
          <Link to='/signup/business' onMouseDown={handleTabMouseDown} className={`rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-all duration-200 ${activeMode==='business'?'bg-white shadow text-gray-900':'text-white/65 hover:text-white/85'}`}>Business</Link>
        </div>

        <form className='grid gap-4' onSubmit={(e)=>e.preventDefault()}>
          <div className='grid gap-4 sm:grid-cols-2'>
            {fields.map((field) => (
              <label key={field.name} className={`grid gap-2 ${field.span==='full'?'sm:col-span-2':''}`}>
                <span className={labelBase}>{field.label}</span>
                <input type={field.type} name={field.name} value={formValues[field.name]} onChange={onChange} onBlur={onBlur} className={getClass(field.name)} placeholder={`Enter ${field.label.toLowerCase()}`} />
                {touched[field.name] && errors[field.name] && <span className='text-xs text-rose-500'>{errors[field.name]}</span>}
              </label>
            ))}
          </div>

          <button type='submit' className='mt-2 h-11 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99]'>
            {activeMode === 'business' ? 'Create Business Account' : 'Create Customer Account'}
          </button>

          <p className='text-center text-sm text-slate-900'>Already have an account? <Link to='/login' className='font-semibold text-[#f5d97c] hover:underline'> login</Link></p>
        </form>
      </div>
    </section>

  )
}
