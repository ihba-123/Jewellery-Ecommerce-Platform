import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const fieldBaseClassName =
  'h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition-all duration-200 placeholder:text-white/40'

const labelClassName = 'text-sm font-medium text-white'
const helperClassName = 'text-xs text-[#dc2626]'

const businessFields = [
  { name: 'businessName', label: 'Business Name', type: 'text' },
  { name: 'contactPerson', label: 'Contact Person', type: 'text' },
  { name: 'businessEmail', label: 'Business Email', type: 'email' },
  { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  { name: 'registrationNumber', label: 'Registration Number', type: 'text' },
  { name: 'businessType', label: 'Business Type', type: 'text' },
  { name: 'website', label: 'Website', type: 'url' },
  { name: 'addressLine1', label: 'Address Line 1', type: 'text', span: 'full' },
  { name: 'addressLine2', label: 'Address Line 2', type: 'text', span: 'full' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'state', label: 'State / Province', type: 'text' },
  { name: 'country', label: 'Country', type: 'text' },
  { name: 'postalCode', label: 'Postal Code', type: 'text' },
  { name: 'businessDescription', label: 'Business Description', type: 'textarea', span: 'full' },
]

const customerFields = [
  { name: 'fullName', label: 'Full Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
  { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
  { name: 'addressLine1', label: 'Address Line 1', type: 'text', span: 'full' },
  { name: 'addressLine2', label: 'Address Line 2', type: 'text', span: 'full' },
  { name: 'country', label: 'Country', type: 'text' },
  { name: 'postalCode', label: 'Postal Code', type: 'text' },
  { name: 'preferredStyle', label: 'Preferred Style', type: 'textarea', span: 'full' },
]

const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(value)

const SignupExperience = ({ mode = 'customer' }) => {
  const activeMode = mode === 'business' ? 'business' : 'customer'
  const formFields = activeMode === 'business' ? businessFields : customerFields

  const initialValues = useMemo(
    () =>
      formFields.reduce((acc, field) => {
        acc[field.name] = ''
        return acc
      }, {}),
    [formFields],
  )

  const [formValues, setFormValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const errors = useMemo(() => {
    const next = {}

    formFields.forEach((field) => {
      if (!formValues[field.name]?.trim()) {
        next[field.name] = `${field.label} is required.`
      }
    })

    if (formValues.email && !isValidEmail(formValues.email.trim())) {
      next.email = 'Enter a valid email address.'
    }

    if (formValues.businessEmail && !isValidEmail(formValues.businessEmail.trim())) {
      next.businessEmail = 'Enter a valid email address.'
    }

    if (formValues.password && formValues.password.length < 6) {
      next.password = 'Password must be at least 6 characters.'
    }

    if (formValues.confirmPassword && formValues.password !== formValues.confirmPassword) {
      next.confirmPassword = 'Passwords do not match.'
    }

    return next
  }, [formFields, formValues])

  const isFormValid = Object.keys(errors).length === 0

  const ctaLabel = activeMode === 'business' ? 'Create Business Account' : 'Create Customer Account'
  const formTitle = activeMode === 'business' ? 'Business Signup' : 'Customer Signup'
  const formSubtitle =
    activeMode === 'business'
      ? 'Create your business account and manage your brand professionally.'
      : 'Create your customer account for a faster and smoother checkout.'

  const gridClassName = activeMode === 'business' ? 'grid gap-4 sm:grid-cols-2' : 'grid gap-4 sm:grid-cols-2'
  const cardWidthClass = 'max-w-2xl'

  const getInputClassName = (name) => {
    const showState = touched[name] || submitAttempted

    if (showState && errors[name]) {
      return `${fieldBaseClassName} border-[#dc2626] focus:border-[#dc2626] focus:ring-4 focus:ring-[#dc2626]/15`
    }

    if (touched[name] && !errors[name]) {
      return `${fieldBaseClassName} border-[#16a34a] focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/15`
    }

    return `${fieldBaseClassName} border-[#eadfc6] focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/15`
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitAttempted(true)

    const allTouched = formFields.reduce((acc, field) => {
      acc[field.name] = true
      return acc
    }, {})

    setTouched(allTouched)

    if (!isFormValid) {
      return
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-var(--dashboard-topbar-height))] w-full max-w-7xl items-center justify-center px-md py-lg sm:px-lg lg:px-xl">
      <div className={`w-full ${cardWidthClass} rounded-3xl border border-white/10 bg-white/5 p-md shadow-[0_20px_55px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-lg`}>
        <div className="mb-5 border-b border-white/10 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f5d97c]">Create account</p>
          <h1 className="mt-2 font-['Playfair_Display'] text-h2 font-semibold text-white">{formTitle}</h1>
          <p className="mt-2 text-sm text-white/72">{formSubtitle}</p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
          <Link
            to="/signup/customer"
            className={`rounded-lg border px-3 py-2 text-center text-small font-semibold transition-all duration-200 ${
              activeMode === 'customer'
                ? 'border-[#d4af37]/50 bg-[#d4af37]/15 text-[#f5d97c]'
                : 'border-transparent text-white/70 hover:bg-white/8'
            }`}
          >
            Customer
          </Link>
          <Link
            to="/signup/business"
            className={`rounded-lg border px-3 py-2 text-center text-small font-semibold transition-all duration-200 ${
              activeMode === 'business'
                ? 'border-[#d4af37]/50 bg-[#d4af37]/15 text-[#f5d97c]'
                : 'border-transparent text-white/70 hover:bg-white/8'
            }`}
          >
            Business
          </Link>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className={gridClassName}>
            {formFields.map((field) => (
              <label
                key={field.name}
                className={field.span === 'full' ? 'grid gap-2 sm:col-span-2' : 'grid gap-2'}
              >
                <span className={labelClassName}>{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    rows={field.name === 'businessDescription' ? 4 : 3}
                    value={formValues[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getInputClassName(field.name)} h-auto py-3 resize-none`}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formValues[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName(field.name)}
                  />
                )}
                {(touched[field.name] || submitAttempted) && errors[field.name] ? (
                  <span className={helperClassName}>{errors[field.name]}</span>
                ) : null}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-xl bg-linear-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] px-6 text-sm font-semibold text-[#231806] transition-all duration-200 hover:brightness-105 active:translate-y-px"
          >
            {ctaLabel}
          </button>

          <div className="text-center text-sm text-white/72">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#f5d97c] underline-offset-4 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SignupExperience