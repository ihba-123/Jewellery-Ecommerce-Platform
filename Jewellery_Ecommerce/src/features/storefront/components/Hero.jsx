import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative flex overflow-hidden"
      style={{ minHeight: '10dvh', paddingTop: 'calc(var(--dashboard-topbar-height) + 1rem)' }}
    >
      {/* ── Layered background glows ─────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '55%', height: '65%',
          background: 'radial-gradient(circle, rgba(255,215,100,0.13) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', left: '-10%',
          width: '50%', height: '55%',
          background: 'radial-gradient(circle, rgba(120,100,220,0.14) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        {/* Subtle diagonal light streak */}
        <div style={{
          position: 'absolute', top: '20%', left: '30%',
          width: '1px', height: '35%',
          background: 'linear-gradient(to bottom, transparent, rgba(255,220,120,0.25), transparent)',
          transform: 'rotate(25deg)',
        }} />
      </div>

      <div className="container flex items-center py-12 lg:py-0" style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.25rem', width: '100%' }}>
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ── LEFT: Content ──────────────────────────── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1">

            {/* Eyebrow tag */}
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1"
              style={{
                background: 'rgba(255,215,100,0.08)',
                border: '1px solid rgba(255,215,100,0.2)',
              }}
            >
              <span style={{
                display: 'inline-block', width: '0.35rem', height: '0.35rem',
                borderRadius: '50%', background: '#f8d77e',
              }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: '#f8d77e', textTransform: 'uppercase' }}>
                Premium Jewellery Collection
              </span>
            </div>

            {/* Heading */}
            <h1
              className="mb-4 font-extrabold text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                maxWidth: '14ch', 
              }}
            >
              Elegance in{' '}
              <br className="hidden sm:block" />
              Every{' '}
              <span
                style={{
                  display: 'inline',
                  background: 'linear-gradient(90deg, #f8d77e 0%, #fff2b3 50%, #c9982f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Jewellery
              </span>
              <br />
              <span style={{ opacity: 0.9 }}>Piece</span>
            </h1>

            {/* Body */}
            <p
              className="mb-7 text-white/70"
              style={{
                fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
                lineHeight: 1.75,
                maxWidth: '44ch',
              }}
            >
              Discover premium Gold, Silver, Diamond &amp; Panchadhatu
              collections — crafted to celebrate timeless beauty and grace.
            </p>

            {/* Stats row */}
            <div className="mb-8 flex gap-6 lg:gap-8">
              {[
                { value: '2000+', label: 'Designs' },
                { value: '15yr',  label: 'Experience' },
                { value: '98%',   label: 'Satisfaction' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center lg:items-start">
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    fontWeight: 700,
                    color: '#f8d77e',
                    lineHeight: 1,
                  }}>
                    {value}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem', letterSpacing: '0.05em' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:w-auto">
              <Link
                to="/categories/gold"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #f8d77e 0%, #c9982f 100%)',
                  padding: '0.6rem 1.75rem',
                  fontSize: '0.78rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#201504',
                  boxShadow: '0 4px 20px rgba(248,215,126,0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  whiteSpace: 'nowrap',
                  minWidth: '9rem',
                  minHeight: 'unset',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(248,215,126,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(248,215,126,0.3)' }}
              >
                Shop Now
              </Link>

              <a
                href="#categories"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255,255,255,0.22)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.6rem 1.75rem',
                  fontSize: '0.78rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.88)',
                  transition: 'background 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                  minWidth: '9rem',
                  minHeight: 'unset',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)' }}
              >
                Explore More
              </a>
            </div>
          </div>

          {/* ── RIGHT: Image ────────────────────────────── */}
          <div className="relative flex items-center justify-center order-1 lg:order-2">

            {/* Glow behind image */}
            <div style={{
              position: 'absolute', inset: '-2rem',
              background: 'radial-gradient(circle, rgba(248,215,126,0.12) 0%, transparent 65%)',
              filter: 'blur(40px)',
              zIndex: 0,
            }} />

            {/* Decorative ring */}
            <div style={{
              position: 'absolute',
              width: 'min(90%, 26rem)', aspectRatio: '1',
              border: '1px solid rgba(248,215,126,0.12)',
              borderRadius: '50%',
              zIndex: 0,
            }} />

            {/* Image card */}
            <div
              className="relative z-10"
              style={{
                width: '100%',
                maxWidth: 'min(85vw, 22rem)',
              }}
            >
              {/* Floating badge — top left */}
              <div style={{
                position: 'absolute', top: '1rem', left: '-1rem',
                background: 'rgba(15,12,30,0.85)',
                border: '1px solid rgba(255,215,100,0.2)',
                borderRadius: '0.75rem',
                padding: '0.5rem 0.75rem',
                backdropFilter: 'blur(12px)',
                zIndex: 20,
                display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <span style={{ fontSize: '1rem' }}>✦</span>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>Collection</div>
                  <div style={{ fontSize: '0.75rem', color: '#f8d77e', fontWeight: 700, lineHeight: 1.3 }}>2026 Edition</div>
                </div>
              </div>

              {/* Floating badge — bottom right */}
              <div style={{
                position: 'absolute', bottom: '1.25rem', right: '-1rem',
                background: 'rgba(15,12,30,0.85)',
                border: '1px solid rgba(255,215,100,0.2)',
                borderRadius: '0.75rem',
                padding: '0.5rem 0.75rem',
                backdropFilter: 'blur(12px)',
                zIndex: 20,
                display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <span style={{ fontSize: '0.9rem' }}>⭐</span>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>Rated</div>
                  <div style={{ fontSize: '0.75rem', color: '#f8d77e', fontWeight: 700, lineHeight: 1.3 }}>4.9 / 5.0</div>
                </div>
              </div>

              {/* Main image */}
              <div style={{ borderRadius: '1.75rem', overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury jewellery collection"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.7s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                />
                {/* Subtle inner border overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '1.75rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  pointerEvents: 'none',
                }} />
                {/* Bottom gradient for depth */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '35%',
                  background: 'linear-gradient(to top, rgba(30,20,60,0.5), transparent)',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;