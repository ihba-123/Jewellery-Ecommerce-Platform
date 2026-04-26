const Footer = () => {
  return (
    <footer className="border-t border-[#4f3d1d]/50 bg-[#0b0b0b] py-lg text-[#bda77b]">
      <div className="container grid gap-md sm:grid-cols-2 md:grid-cols-3 text-center sm:text-left text-small">
        <div className="space-y-sm">
          <p className="font-['Playfair_Display'] text-h4 text-[#f8d77e]">Jewellery Store</p>
          <p className="max-w-[65ch] mx-auto sm:mx-0">Luxury jewellery for modern and traditional elegance.</p>
        </div>
        <div className="space-y-xs">
          <p className="text-h4 text-white">Categories</p>
          <ul className="space-y-xs">
            <li><a href="/categories/gold" className="hover:text-white transition">Gold</a></li>
            <li><a href="/categories/silver" className="hover:text-white transition">Silver</a></li>
            <li><a href="/categories/diamond" className="hover:text-white transition">Diamond</a></li>
          </ul>
        </div>
        <div className="space-y-sm flex flex-col items-center sm:items-start">
          <p className="mt-md sm:mt-0">© {new Date().getFullYear()} Jewellery Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
