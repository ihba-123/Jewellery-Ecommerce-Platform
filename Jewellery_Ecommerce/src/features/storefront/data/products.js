export const categories = [
  {
    id: 'gold',
    name: 'Gold',
    slug: 'gold',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
    description: 'Classic 22K and 18K pieces made for grand occasions.',
  },
  {
    id: 'silver',
    name: 'Silver',
    slug: 'silver',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80',
    description: 'Polished sterling silver jewellery for everyday elegance.',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    slug: 'diamond',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    description: 'Brilliant-cut diamond collections with premium finish.',
  },
  {
    id: 'panchadhatu',
    name: 'Panchadhatu',
    slug: 'panchadhatu',
    image:
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional five-metal spiritual and heritage jewellery.',
  },
]

export const products = [
  {
    id: 'g-101',
    category: 'gold',
    name: 'Royal Gold Temple Necklace',
    purity: '22K',
    weight: 38.5,
    price: 288500,
    materialDetails: '22K yellow gold, handcrafted filigree and meenakari accents.',
    description:
      'An heirloom-inspired temple necklace with intricate motifs, designed for bridal and festive wear.',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'g-102',
    category: 'gold',
    name: 'Minimal Gold Bangle Set',
    purity: '18K',
    weight: 21.3,
    price: 156200,
    materialDetails: '18K hallmarked gold with brushed matte and high-polish finish.',
    description:
      'A versatile stack of lightweight bangles balancing modern minimalism with timeless shine.',
    image:
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 's-201',
    category: 'silver',
    name: 'Sterling Silver Pearl Chain',
    purity: '925',
    weight: 16.8,
    price: 12499,
    materialDetails: '925 sterling silver with freshwater cultured pearls.',
    description:
      'Elegant silver chain set with soft-luster pearls for office, casual, and festive styling.',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 's-202',
    category: 'silver',
    name: 'Vintage Oxidized Silver Jhumka',
    purity: '925',
    weight: 24.1,
    price: 9499,
    materialDetails: '925 sterling silver with handcrafted oxidized detailing.',
    description:
      'Traditional bell-shaped earrings with carved motifs and a comfortable lightweight profile.',
    image:
      'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'd-301',
    category: 'diamond',
    name: 'Solitaire Diamond Ring',
    purity: '18K',
    weight: 4.8,
    price: 198000,
    materialDetails: '18K white gold with VS clarity solitaire and pavé side stones.',
    description:
      'A statement solitaire ring crafted to highlight brilliance, precision, and modern luxury.',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'd-302',
    category: 'diamond',
    name: 'Diamond Halo Pendant',
    purity: '18K',
    weight: 7.2,
    price: 165500,
    materialDetails: '18K white gold with round brilliant diamonds in halo setting.',
    description:
      'A delicate pendant featuring a center stone surrounded by a glowing halo for everyday glamour.',
    image:
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'p-401',
    category: 'panchadhatu',
    name: 'Panchadhatu Sacred Pendant',
    purity: 'Traditional Alloy',
    weight: 18.9,
    price: 18999,
    materialDetails: 'Traditional mix of gold, silver, copper, iron, and zinc.',
    description:
      'Spiritual pendant crafted using panchadhatu alloy, known for cultural and devotional value.',
    image:
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'p-402',
    category: 'panchadhatu',
    name: 'Heritage Panchadhatu Kada',
    purity: 'Traditional Alloy',
    weight: 29.4,
    price: 26200,
    materialDetails: 'Five-metal artisan alloy with antique hand-finished texture.',
    description:
      'A sturdy and elegant kada with traditional symbolism and modern wearing comfort.',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
  },
]

export const getProductsByCategory = (categorySlug) =>
  products.filter((product) => product.category === categorySlug)

export const getProductById = (productId) =>
  products.find((product) => product.id === productId)
