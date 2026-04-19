import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-14 sm:py-20 lg:py-0">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,231,177,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)]" />

      <div className="relative mx-auto w-full max-w-7.5xl px-6 sm:px-8 lg:px-12">
        {/* Increased spacing between left and right */}
        <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-28 xl:gap-34">
          
          {/* LEFT CONTENT */}
          <div className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            
           

            {/* Improved H1 */}
            <h1 className="mb-8 font-['Playfair_Display'] text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Elegance in Every
              <span className="mt-2 block bg-gradient-to-r from-[#f8d77e] via-[#fff2b3] to-[#c9982f] bg-clip-text text-transparent">
                Jewellery Piece
              </span>
            </h1>

            <p className="mb-10 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Discover premium Gold, Silver, Diamond & Panchadhatu
              collections crafted to celebrate timeless beauty and grace.
            </p>

            {/* Buttons */}
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/categories/gold"
                className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#f8d77e] to-[#b88422] px-10 text-sm font-bold uppercase tracking-wider text-[#201504] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(248,215,126,0.35)]"
              >
                Shop Now
              </Link>

              <a
                href="#categories"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 bg-white/5 px-10 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
              >
                Explore More
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            
            {/* Glow */}
            <div className="absolute -inset-8 -z-10 rounded-full bg-[#f8d77e]/10 blur-[120px]" />

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury jewellery collection"
                className="h-[28rem] w-full max-w-sm rounded-[2rem] object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02] sm:h-[34rem] sm:max-w-md lg:h-[40rem] lg:max-w-xl"
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