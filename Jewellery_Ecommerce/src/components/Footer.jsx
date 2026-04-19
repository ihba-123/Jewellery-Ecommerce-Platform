const Footer = () => {
  return (
    <footer className="border-t border-[#4f3d1d]/50 bg-[#0b0b0b] px-4 py-8 text-center text-sm text-[#bda77b] sm:px-6 lg:px-8">
      <p className="font-['Playfair_Display'] text-base text-[#f8d77e]">Jewellery Store</p>
      <p className="mt-2">Luxury jewellery for modern and traditional elegance.</p>
      <p className="mt-2">© {new Date().getFullYear()} Jewellery Store. All rights reserved.</p>
    </footer>
  )
}

export default Footer
