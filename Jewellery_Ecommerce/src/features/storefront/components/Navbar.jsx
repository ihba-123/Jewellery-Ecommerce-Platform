import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const navLinkClasses = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/8 hover:text-[#f5d97c] md:text-[0.95rem] ${
    isActive ? 'bg-white/10 text-[#f5d97c] shadow-[0_6px_16px_rgba(212,175,55,0.12)]' : 'text-white/80'
  }`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { categories, products } = useAppContext()

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

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return
    }

    setMenuOpen(false)
    setSignupOpen(false)

    const categoryMatch = categories.find(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query),
    )

    if (categoryMatch) {
      navigate(`/categories/${categoryMatch.slug}`)
      setMobileSearchOpen(false)
      return
    }

    const productMatch = products.find(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query),
    )

    if (productMatch) {
      navigate(`/products/${productMatch.id}`)
      setMobileSearchOpen(false)
      return
    }

    navigate('/')
    setMobileSearchOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`flex min-h-[var(--dashboard-topbar-height)] w-full items-center gap-2 border-b border-white/14 px-md py-sm shadow-[0_12px_34px_rgba(82,92,196,0.18)] transition-all duration-300 lg:gap-4 lg:px-lg ${
          isScrolled
            ? 'bg-linear-to-r from-[#667eea]/82 via-[#6f70d3]/78 to-[#764ba2]/82 backdrop-blur-2xl'
            : 'bg-linear-to-r from-[#667eea]/72 via-[#6f70d3]/66 to-[#764ba2]/72 backdrop-blur-xl'
        }`}
      >
        <div className="flex shrink-0 items-center md:flex-1 md:justify-start">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-linear-to-br from-[#f4d279] to-[#8f6b1f] shadow-[0_8px_18px_rgba(212,175,55,0.22)]" />
            <span className="hidden font-['Playfair_Display'] text-lg font-semibold tracking-wide text-white xl:inline xl:text-xl">
              Jewellery Store
            </span>
          </Link>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="relative hidden min-w-0 flex-1 md:mx-6 md:flex md:flex-none md:w-full md:max-w-80 lg:max-w-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
          </svg>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search jewellery"
            className="w-full rounded-full border border-white/22 bg-white/10 py-2.5 pl-9 pr-20 text-sm text-white placeholder:text-white/62 outline-none transition focus:border-[#f5d97c]/70 focus:bg-white/14 sm:text-base"
            aria-label="Search jewellery products and categories"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/50 bg-[#d4af37]/18 px-3.5 py-2 text-xs font-semibold text-[#fff2be] transition hover:border-[#d4af37]/70 hover:bg-[#d4af37]/26"
          >
            Search
          </button>
        </form>

        <div className="ml-auto flex min-w-0 items-center gap-2 md:hidden">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              mobileSearchOpen ? 'max-w-[min(70vw,18rem)] opacity-100' : 'max-w-0 opacity-0'
            }`}
          >
            <form onSubmit={handleSearchSubmit} className="relative w-[min(70vw,18rem)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
              </svg>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search"
                className="w-full rounded-full border border-white/22 bg-white/10 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/62 outline-none transition focus:border-[#f5d97c]/70 focus:bg-white/14"
                aria-label="Search jewellery products and categories"
              />
            </form>
          </div>

          <button
            type="button"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[#d4af37]/40 bg-[#d4af37]/10 text-white transition hover:bg-[#d4af37]/18"
            aria-label={mobileSearchOpen ? 'Close search bar' : 'Open search bar'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-6 w-6"
            >
              {mobileSearchOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
              )}
            </svg>
          </button>

          <button
            type="button"
            onClick={() => {
              setMenuOpen(true)
              setSignupOpen(false)
              setMobileSearchOpen(false)
            }}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[#d4af37]/40 bg-[#d4af37]/10 text-white transition hover:bg-[#d4af37]/18"
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
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-2 lg:gap-3">
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
              className="rounded-md border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/18"
              onClick={() => setSignupOpen((prev) => !prev)}
            >
              Signup
            </button>

            {signupOpen ? (
              <div className="absolute left-0 mt-3 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#0f0f11]/95 shadow-2xl backdrop-blur-md">
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

        <div className="hidden h-11 w-11 md:block" aria-hidden="true" />
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
          className={`absolute left-0 top-0 h-full w-[min(88vw,20rem)] border-r border-white/12 bg-linear-to-b from-[#667eea]/92 to-[#764ba2]/94 px-md py-md shadow-xl transition-transform duration-300 ease-out backdrop-blur-2xl ${
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
              className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/8 hover:text-[#f5d97c]"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <button
              type="button"
              className="rounded-lg px-4 py-3 text-left text-sm font-medium text-white/80 transition hover:bg-white/8 hover:text-[#f5d97c]"
              onClick={handleCategoriesClick}
            >
              Categories
            </button>
            <button
              type="button"
              className="rounded-lg px-4 py-3 text-left text-sm font-medium text-white/80 transition hover:bg-white/8 hover:text-[#f5d97c]"
              onClick={() => {
                setMenuOpen(false)
                navigate('/login')
              }}
            >
              Login
            </button>
            <button
              type="button"
              className="rounded-lg px-4 py-3 text-sm font-medium text-[#f5d97c] transition hover:bg-white/8"
              onClick={() => {
                setMenuOpen(false)
                navigate('/signup/customer')
              }}
            >
              Signup as Customer
            </button>
            <button
              type="button"
              className="rounded-lg px-4 py-3 text-sm font-medium text-[#f5d97c] transition hover:bg-white/8"
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
