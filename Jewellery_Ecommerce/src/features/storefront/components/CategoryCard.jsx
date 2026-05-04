import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const CategoryCard = ({ category }) => {
  const fallbackTaglineByCategory = {
    gold: 'Pure 22K Gold Jewellery',
    silver: 'Refined Sterling Silver Craft',
    diamond: 'Brilliance Set in Perfection',
    panchadhatu: 'Sacred Five-Metal Heritage',
  }

  const tagline = fallbackTaglineByCategory[category.slug] ?? category.description

  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group relative isolate overflow-hidden  rounded-2xl border border-white/12 bg-white/5 backdrop-blur-xl transition-all duration-500  ease-out hover:-translate-y-1.5 hover:border-[#d4af37]/45 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_20px_rgba(212,175,55,0.22)]"
      style={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
      }}
    >
      {/* Subtle top gradient sheen */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(160deg, rgba(212,175,55,0.06) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)' }}
      />

      {/* ── Image ─────────────────────────────────── */}
      <div className="relative overflow-hidden  " style={{ aspectRatio: '3/2' }}>
        <img
          src={category.image}
          alt={category.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
          className="group-hover:scale-105"
        />
        {/* Dark gradient for text legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(5,4,14,0.75) 0%, rgba(5,4,14,0.2) 55%, transparent 100%)' }}
        />
        {/* Category pill — top left */}
        <div
          style={{
            position: 'absolute', top: '0.65rem', left: '0.65rem',
            background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '9999px',
            padding: '0.2rem 0.6rem',
            backdropFilter: 'blur(8px)',
            
          }}
        >
          <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#f1e3b4' }}>
            Collection
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────── */}
      <div
        style={{
          padding: '0.875rem 1rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: 600,
            color: '#fff',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {category.name}
        </h3>

        <p
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {tagline}
        </p>

        {/* CTA row */}
        <div style={{ marginTop: '0.5rem' }}>
          <span
            className="group-hover:bg-[#d4af37] group-hover:text-[#211503] group-hover:border-[#d4af37]"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              borderRadius: '9999px',
              border: '1px solid rgba(212,175,55,0.45)',
              background: 'rgba(212,175,55,0.12)',
              padding: '0.3rem 0.85rem',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#f8e9bc',
              transition: 'all 0.4s ease',
            }}
          >
            Explore
            <ArrowRight style={{ width: '0.7rem', height: '0.7rem', transition: 'transform 0.4s ease' }} className="group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard

