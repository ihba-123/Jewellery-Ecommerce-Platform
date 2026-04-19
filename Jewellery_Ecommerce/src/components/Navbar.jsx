import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

const navLinkClasses = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/8 hover:text-[#f5d97c] md:text-[0.95rem] ${
    isActive ? 'bg-white/10 text-[#f5d97c] shadow-[0_6px_16px_rgba(212,175,55,0.12)]' : 'text-white/80'
  }`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCategoriesClick = () => {
    setMenuOpen(false)
    setSignupOpen(false)

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
      return
    }

    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`flex h-18 w-full items-center justify-between border-b border-white/14 px-4 shadow-[0_12px_34px_rgba(82,92,196,0.18)] transition-all duration-300 sm:h-20 sm:px-6 lg:px-8 ${
          isScrolled
            ? 'bg-linear-to-r from-[#667eea]/82 via-[#6f70d3]/78 to-[#764ba2]/82 backdrop-blur-2xl'
            : 'bg-linear-to-r from-[#667eea]/72 via-[#6f70d3]/66 to-[#764ba2]/72 backdrop-blur-xl'
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-linear-to-br from-[#f4d279] to-[#8f6b1f] shadow-[0_8px_18px_rgba(212,175,55,0.22)]" />
          <span className="font-['Playfair_Display'] text-lg font-semibold tracking-wide text-white sm:text-xl">
            Jewellery Store
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex lg:gap-5">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <button
            type="button"
            onClick={handleCategoriesClick}
            className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/8 hover:text-[#f5d97c] md:text-[0.95rem]"
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/8 hover:text-[#f5d97c] md:text-[0.95rem]"
          >
            Login
          </button>

          <div className="relative">
            <button
              type="button"
              className="rounded-md border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d4af37]/18 hover:border-[#d4af37]/60"
              onClick={() => setSignupOpen((prev) => !prev)}
            >
              Signup
            </button>

            {signupOpen ? (
              <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#0f0f11]/95 shadow-2xl backdrop-blur-md">
                <button
                  type="button"
                  className="block px-4 py-3 text-sm text-white/80 transition hover:bg-white/8 hover:text-[#f5d97c]"
                  onClick={() => {
                    setSignupOpen(false)
                    navigate('/signup/customer')
                  }}
                >
                  Signup as Customer
                </button>
                <button
                  type="button"
                  className="block px-4 py-3 text-sm text-white/80 transition hover:bg-white/8 hover:text-[#f5d97c]"
                  onClick={() => {
                    setSignupOpen(false)
                    navigate('/signup/business')
                  }}
                >
                  Signup as Business
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setMenuOpen(true)
            setSignupOpen(false)
          }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#d4af37]/40 bg-[#d4af37]/10 text-white transition hover:bg-[#d4af37]/18 md:hidden"
          aria-label="Open navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-60 md:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <button
          type="button"
          aria-label="Close mobile menu overlay"
          className={`absolute inset-0 bg-[#5640a5]/28 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-[82%] max-w-xs border-r border-white/12 bg-linear-to-b from-[#667eea]/92 to-[#764ba2]/94 px-5 py-5 shadow-xl transition-transform duration-300 ease-out backdrop-blur-2xl ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-['Playfair_Display'] text-lg font-semibold text-white">
              Menu
            </span>
            <button
              type="button"
              className="rounded-md p-2 text-white transition hover:bg-white/8"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="rounded-md px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/8 hover:text-[#f5d97c]"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-left text-sm font-medium text-white/80 transition hover:bg-white/8 hover:text-[#f5d97c]"
              onClick={handleCategoriesClick}
            >
              Categories
            </button>
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-left text-sm font-medium text-white/80 transition hover:bg-white/8 hover:text-[#f5d97c]"
              onClick={() => {
                setMenuOpen(false)
                navigate('/login')
              }}
            >
              Login
            </button>
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-sm font-medium text-[#f5d97c] transition hover:bg-white/8"
              onClick={() => {
                setMenuOpen(false)
                navigate('/signup/customer')
              }}
            >
              Signup as Customer
            </button>
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-sm font-medium text-[#f5d97c] transition hover:bg-white/8"
              onClick={() => {
                setMenuOpen(false)
                navigate('/signup/business')
              }}
            >
              Signup as Business
            </button>
          </div>
        </aside>
      </div>
    </header>
  )
}

export default Navbar
