import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Search, X, Menu, ChevronDown,
  Home, LayoutGrid, LogIn, UserPlus
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

// ── Ghost nav button ───────────────────────────────────────────────
const NavBtn = ({ onClick, children, gold = false, className = '' }) => (
  <button type="button" onClick={onClick}
    style={{ minHeight: 'unset', minWidth: 'unset' }}
    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.78rem] font-medium tracking-wide transition-all duration-200
      ${gold
        ? 'border border-[#d4af37]/45 bg-[#d4af37]/12 text-[#ffeea0] hover:bg-[#d4af37]/24 hover:border-[#d4af37]/65'
        : 'text-white/72 hover:text-white hover:bg-white/8'}
      ${className}`}>
    {children}
  </button>
)

// ── Circle icon button (mobile) ────────────────────────────────────
const CircleBtn = ({ onClick, children, label }) => (
  <button type="button" onClick={onClick} aria-label={label}
    style={{ minHeight: 'unset', minWidth: 'unset' }}
    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/30 bg-white/8 text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95">
    {children}
  </button>
)

// ── Search form ────────────────────────────────────────────────────
const SearchForm = ({ value, onChange, onSubmit, compact = false }) => (
  <form onSubmit={onSubmit} className={`relative flex items-center ${compact ? 'w-full' : 'w-[17rem]'}`}>
    <Search size={16} className="pointer-events-none absolute left-3 top-1/2  -translate-y-1/2 text-white/45" />
    <input
      type="search" value={value} onChange={onChange}
      placeholder={compact ? 'Search…' : 'Search jewellery…'}
      aria-label="Search jewellery" autoComplete="off"
      className="w-full rounded-full border border-white/30 bg-transparent
        py-[5px] pl-[28px] pr-[58px]
        text-sm font-light tracking-wide text-white flex justify-center align-center placeholder:text-white/40 placeholder:pl-3 placeholder:text-[15px]
        outline-none transition-all duration-200
        focus:border-white/55 focus:bg-white/5
        [&::-webkit-search-cancel-button]:hidden"
    />
    {!compact && (
      <button type="submit"
        style={{ minHeight: 'unset', minWidth: 'unset' }}
        className="absolute right-1 top-1/2 -translate-y-1/2
          rounded-full border border-white/20 bg-white/12
          px-2.5 py-[3px] text-[0.6rem] font-medium tracking-wide text-white/70
          transition-all hover:bg-white/20 hover:text-white active:scale-95">
        Search
      </button>
    )}
  </form>
)

// ── Navbar ─────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [signupOpen,   setSignupOpen]   = useState(false)
  const [isScrolled,   setIsScrolled]   = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const [searchTerm,   setSearchTerm]   = useState('')
  const signupRef = useRef(null)
  const location  = useLocation()
  const navigate  = useNavigate()
  const { categories, products } = useAppContext()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false); setSignupOpen(false); setMobileSearch(false)
  }, [location.pathname])

  useEffect(() => {
    if (!signupOpen) return
    const handler = (e) => { if (!signupRef.current?.contains(e.target)) setSignupOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [signupOpen])

  const scrollToCategories = () => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 50)
      return
    }
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchTerm.trim().toLowerCase()
    if (!q) return
    setMenuOpen(false); setMobileSearch(false)
    const cat = categories.find(c => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q))
    if (cat) { navigate(`/categories/${cat.slug}`); return }
    const prod = products.find(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
    navigate(prod ? `/products/${prod.id}` : '/')
  }

  const searchProps = { value: searchTerm, onChange: e => setSearchTerm(e.target.value), onSubmit: handleSearch }

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 text-[0.78rem] font-medium tracking-wide rounded-full transition-all duration-200
     ${isActive ? 'bg-white/10 text-[#f5d97c]' : 'text-white/72 hover:text-white hover:bg-white/8'}`

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className={`flex w-full  items-center h-[3.5rem] px-4 sm:px-5 lg:px-7
        border-b border-white/10 transition-all duration-300 backdrop-blur-xl
        ${isScrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.4)]' : ''}`}
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2 mr-4">
          <span className=" text-[1.4rem] font-extrabold tracking-wide text-white/92 sm:inline"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Jewellery Store
          </span>
        </Link>

        {/* Desktop search — sits between logo and nav, not flex-1 so it doesn't stretch */}
        <div className="hidden md:flex items-center flex-1 justify-center">
          <SearchForm {...searchProps} />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <NavLink to="/" className={navLinkClass}>
            <Home size={16} strokeWidth={2} /> Home
          </NavLink>
          <NavBtn onClick={scrollToCategories}>
            <LayoutGrid size={16} strokeWidth={2} /> Categories
          </NavBtn>
          <NavBtn onClick={() => navigate('/login')}>
            <LogIn size={16} strokeWidth={2} /> Login
          </NavBtn>

          {/* Signup dropdown */}
          <div ref={signupRef} className="relative ml-1">
            <NavBtn gold onClick={() => setSignupOpen(p => !p)}>
              <UserPlus size={16} strokeWidth={2} />
              Signup
              <ChevronDown size={11} strokeWidth={2.5}
                className={`transition-transform duration-200 ${signupOpen ? 'rotate-180' : ''}`} />
            </NavBtn>

            {signupOpen && (
              <div className="absolute right-0 top-[calc(100%+5px)] w-42 overflow-hidden rounded-xl
                border border-white/10 bg-[#1c1445]/96 shadow-[0_8px_28px_rgba(0,0,0,0.5)] backdrop-blur-xl
                animate-[fadeSlide_0.14s_ease-out]">
                {[['As Customer', '/signup/customer'], ['As Business', '/signup/business'], ['As Kaligard', '/signup/kaligard']].map(([label, path]) => (
                  <button key={path} type="button"
                    style={{ minHeight: 'unset', minWidth: 'unset' }}
                    onClick={() => { setSignupOpen(false); navigate(path) }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left
                      text-[0.75rem] font-medium text-white/72
                      transition hover:bg-white/8 hover:text-[#f5d97c]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]/55 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <div className={`flex items-center overflow-hidden transition-all duration-300
            ${mobileSearch ? 'w-[50vw] max-w-[12rem] opacity-100' : 'w-0 opacity-0'}`}>
            <SearchForm {...searchProps} compact />
          </div>
          <CircleBtn onClick={() => setMobileSearch(p => !p)} label="Toggle search">
            {mobileSearch ? <X size={17} /> : <Search size={17} />}
          </CircleBtn>
          <CircleBtn onClick={() => { setMenuOpen(true); setMobileSearch(false) }} label="Open menu">
            <Menu size={17} />
          </CircleBtn>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] md:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'rgba(15,10,40,0.6)', backdropFilter: 'blur(4px)' }} />

        <aside className={`absolute left-0 top-0 h-full w-[min(76vw,15rem)]
          border-r border-white/10 bg-[#211860]/97 px-3 py-4
          shadow-[4px_0_36px_rgba(0,0,0,0.55)] backdrop-blur-2xl
          transition-transform duration-300 ease-out
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

          {/* Drawer header */}
          <div className="mb-4 flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full"
                style={{ background: 'radial-gradient(circle at 35% 35%, #f4e08a, #b8872a)' }} />
              <span className="text-[0.82rem] font-semibold text-white/88"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Jewellery Store
              </span>
            </div>
            <CircleBtn onClick={() => setMenuOpen(false)} label="Close menu">
              <X size={14} />
            </CircleBtn>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-0.5">
            {[
              { label: 'Home',       icon: <Home size={16} strokeWidth={2} />,       action: () => navigate('/') },
              { label: 'Categories', icon: <LayoutGrid size={16} strokeWidth={2} />, action: scrollToCategories },
              { label: 'Login',      icon: <LogIn size={16} strokeWidth={2} />,      action: () => navigate('/login') },
            ].map(({ label, icon, action }) => (
              <button key={label} type="button"
                style={{ minHeight: 'unset', minWidth: 'unset' }}
                onClick={() => { setMenuOpen(false); action() }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[0.78rem] font-medium text-white/72 transition hover:bg-white/8 hover:text-white">
                <span className="text-white/45">{icon}</span>
                {label}
              </button>
            ))}

            <div className="my-2 h-px bg-white/8" />
            <p className="px-3 pb-1 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-white/32">Account</p>

            {[
              { label: 'Customer', path: '/signup/customer' },
              { label: 'Business', path: '/signup/business' },
              { label: 'Kaligard', path: '/signup/kaligard' },
            ].map(({ label, path }) => (
              <button key={path} type="button"
                style={{ minHeight: 'unset', minWidth: 'unset' }}
                onClick={() => { setMenuOpen(false); navigate(path) }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left
                  text-[0.78rem] font-medium text-[#f5d97c]/80
                  transition hover:bg-[#d4af37]/10 hover:text-[#f5d97c]">
                <UserPlus size={14} strokeWidth={2} className="text-[#d4af37]/55" />
                Signup as {label}
              </button>
            ))}
          </nav>
        </aside>
      </div>

      <style>{`
        @keyframes fadeSlide { from { opacity:0; transform:translateY(-5px) } to { opacity:1; transform:translateY(0) } }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&display=swap');
      `}</style>
    </header>
  )
}

export default Navbar