import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden py-xl lg:py-0">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,231,177,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)]" />

      <div className="container">
        {/* Responsive Grid */}
        <div className="grid items-center gap-xl lg:grid-cols-2 lg:gap-2xl">
          
          {/* LEFT CONTENT */}
          <div className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            
            {/* Fluid Display Heading */}
            <h1 className="mb-sm font-['Playfair_Display'] text-display font-semibold text-white">
              Elegance in Every
              <span className="mt-2 block bg-gradient-to-r from-[#f8d77e] via-[#fff2b3] to-[#c9982f] bg-clip-text text-transparent">
                Jewellery Piece
              </span>
            </h1>

            <p className="mb-md max-w-[65ch] text-body text-white/75">
              Discover premium Gold, Silver, Diamond & Panchadhatu
              collections crafted to celebrate timeless beauty and grace.
            </p>

            {/* Buttons */}
            <div className="flex w-full flex-col gap-xs sm:flex-row sm:w-auto lg:justify-start">
              <Link
                to="/categories/gold"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f8d77e] to-[#b88422] px-lg py-sm text-button font-bold uppercase tracking-wider text-[#201504] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(248,215,126,0.35)] w-full sm:w-auto"
              >
                Shop Now
              </Link>

              <a
                href="#categories"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-lg py-sm text-button font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
              >
                Explore More
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            
            {/* Glow */}
            <div className="absolute -inset-8 -z-10 rounded-full bg-[#f8d77e]/10 blur-[120px]" />

            <div className="relative w-full max-w-[600px] aspect-[4/5] sm:aspect-square lg:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury jewellery collection"
                className="w-full h-full rounded-[2rem] object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
              />

              {/* Elegant Border */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/10 ring-1 ring-white/5" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;