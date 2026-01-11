import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingBag, Menu, X, ChevronRight, Phone, Mail, Instagram, Facebook, MapPin, ArrowRight, Filter, Star, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Product {
  id: string;
  name: string;
  category: 'Dining' | 'Coffee' | 'Conference' | 'Console';
  price: number;
  dimensions: string; // e.g., "2400 x 1100 mm"
  wood: string;
  resin: string;
  image: string;
  leadTime: 'In Stock' | 'Custom Order (6-8 Weeks)';
  description: string;
  features: string[];
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Umgeni Dining Table',
    category: 'Dining',
    price: 42000,
    dimensions: '2200 x 1000 mm',
    wood: 'African Walnut',
    resin: 'Deep River Blue',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1000',
    leadTime: 'In Stock',
    description: 'A masterpiece of contrast, featuring locally sourced African Walnut with a translucent river running through its center. Finished with hard-wearing Rubio Monocoat.',
    features: ['Solid African Walnut', 'UV Resistant Resin', 'Matte Finish', 'Black Powder-coated Steel Legs']
  },
  {
    id: '2',
    name: 'Kalahari Burl Coffee Table',
    category: 'Coffee',
    price: 18500,
    dimensions: '1200 x 700 mm',
    wood: 'Mappa Burl',
    resin: 'Smokey Quartz',
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&q=80&w=1000',
    leadTime: 'In Stock',
    description: 'The chaotic beauty of burl wood preserved in smokey quartz epoxy. A striking centerpiece for the modern lounge.',
    features: ['Rare Mappa Burl', 'High Clarity Resin', 'Satin Sheen', 'Geometric Base']
  },
  {
    id: '3',
    name: 'Sentinel Conference Table',
    category: 'Conference',
    price: 95000,
    dimensions: '3500 x 1400 mm',
    wood: 'Kiaat',
    resin: 'Midnight Black',
    image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=1000',
    leadTime: 'Custom Order (6-8 Weeks)',
    description: 'Commanding and elegant. This expansive conference table combines the warmth of Kiaat timber with professional midnight black resin.',
    features: ['Integrated Cable Management', 'Durable Nano-coating', 'Seats 12-14', 'Heavy-duty Steel Frame']
  },
  {
    id: '4',
    name: 'Verde Console',
    category: 'Console',
    price: 24000,
    dimensions: '1500 x 400 mm',
    wood: 'French Oak',
    resin: 'Emerald Green',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=1000',
    leadTime: 'Custom Order (6-8 Weeks)',
    description: 'A slender statement piece for the hallway or entryway. The emerald resin captures light beautifully against the pale oak.',
    features: ['Live Edge Detail', 'Narrow Profile', 'Hairpin Legs', 'Protective Coating']
  },
  {
    id: '5',
    name: 'Outeniqua Dining Slab',
    category: 'Dining',
    price: 58000,
    dimensions: '2800 x 1100 mm',
    wood: 'Matumi',
    resin: 'Clear',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000',
    leadTime: 'Custom Order (6-8 Weeks)',
    description: 'Ancient Matumi wood, known for its density and rich history, paired with crystal clear resin to highlight the natural edge.',
    features: ['Heritage Timber', 'Glass-like Clarity', 'Family Sized', 'Custom Base Options']
  },
  {
    id: '6',
    name: 'Karoo Round',
    category: 'Coffee',
    price: 21000,
    dimensions: '900 mm Diameter',
    wood: 'Olive Wood',
    resin: 'Amber',
    image: 'https://images.unsplash.com/photo-1574627883279-450f61d2446a?auto=format&fit=crop&q=80&w=1000',
    leadTime: 'In Stock',
    description: 'A circular coffee table capturing the golden hues of the Karoo. Olive wood grain swirls compliment the amber resin.',
    features: ['Round Profile', 'Warm Tones', 'Tripod Base', 'Compact Footprint']
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah van der Merwe',
    location: 'Constantia, Cape Town',
    text: 'The craftsmanship is simply undeniable. It anchors our dining room perfectly. The team was communicative throughout the custom build process.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Adebayo',
    location: 'Sandton, Johannesburg',
    text: 'I was looking for something that spoke to African luxury without being cliché. Arden Way delivered a boardroom table that impresses every client.',
    rating: 5
  },
  {
    id: 3,
    name: 'Elena Rossi',
    location: 'Umhlanga',
    text: 'Beautiful finish and sturdy construction. Delivered to KZN without a scratch. Highly recommended for bespoke furniture.',
    rating: 5
  }
];

// --- Utilities ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 font-serif font-bold tracking-wider ${className}`}>
    <div className="relative w-8 h-8 border border-current flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full opacity-60">
        <path d="M-2 18c4-4 8 4 12 0s8 4 12 0" />
      </svg>
    </div>
    <span className="text-xl md:text-2xl">ARDEN WAY</span>
  </div>
);

const Header = ({ cartCount, onOpenCart, onNavigate }: { cartCount: number, onOpenCart: () => void, onNavigate: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4 text-stone-900' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => onNavigate('home')}>
          <Logo />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide uppercase">
          <button onClick={() => onNavigate('collection')} className="hover:text-amber-600 transition-colors">Collection</button>
          <button onClick={() => onNavigate('bespoke')} className="hover:text-amber-600 transition-colors">Bespoke Service</button>
          <button onClick={() => onNavigate('about')} className="hover:text-amber-600 transition-colors">Our Story</button>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <button className="relative hover:text-amber-600 transition-colors" onClick={onOpenCart}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white text-stone-900 border-t"
          >
            <div className="flex flex-col p-6 space-y-4 font-medium uppercase text-sm">
              <button onClick={() => { onNavigate('collection'); setMobileMenuOpen(false); }}>Collection</button>
              <button onClick={() => { onNavigate('bespoke'); setMobileMenuOpen(false); }}>Bespoke Service</button>
              <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}>Our Story</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ onShopNow }: { onShopNow: () => void }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=2000" 
          alt="Arden Way Artisan Table" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="block text-sm md:text-base tracking-[0.3em] uppercase mb-4"
        >
          Handcrafted in South Africa
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
        >
          Nature, Preserved <br/> in Resin.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-stone-200 mb-10 font-light"
        >
          Arden Way creates bespoke river tables that blend raw African timber with artisanal resin craftsmanship.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={onShopNow}
          className="bg-white text-stone-900 px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-stone-200 transition-colors"
        >
          Explore Collection
        </motion.button>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product; onAddToCart: (p: Product) => void }> = ({ product, onAddToCart }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.leadTime === 'In Stock' && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-wider font-medium">
            Ready to Ship
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-white text-stone-900 py-4 uppercase tracking-wider text-xs font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-stone-100"
        >
          Add to Enquiry
        </button>
      </div>
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-stone-900">{product.name}</h3>
        <p className="text-sm text-stone-500">{product.wood} & {product.resin}</p>
        <div className="flex justify-between items-baseline mt-2">
          <span className="text-stone-900 font-medium">{formatCurrency(product.price)}</span>
          <span className="text-xs text-stone-400">{product.dimensions}</span>
        </div>
      </div>
    </div>
  );
};

const Collection = ({ products, onAddToCart }: { products: Product[], onAddToCart: (p: Product) => void }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Dining', 'Coffee', 'Conference', 'Console'];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <section className="py-20 bg-stone-50" id="collection">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl text-stone-900 mb-4">Curated Inventory</h2>
            <p className="text-stone-500 max-w-md">
              Select pieces available for immediate delivery across South Africa. 
              Each table is one-of-a-kind.
            </p>
          </div>
          
          <div className="flex space-x-6 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm uppercase tracking-wider whitespace-nowrap ${filter === cat ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-stone-400 hover:text-stone-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Bespoke = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=1000" 
              alt="Workshop craftsmanship" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-lg max-w-sm">
              <h4 className="font-serif text-xl mb-2">The Workshop</h4>
              <p className="text-sm text-stone-600">
                Located in the heart of the Cape Winelands, our artisans select each slab for its character and history.
              </p>
            </div>
          </div>
          
          <div className="lg:pl-10">
            <span className="text-amber-700 uppercase tracking-widest text-xs font-bold mb-4 block">Bespoke Service</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mb-6 leading-tight">
              Designed for <br/> Your Space
            </h2>
            <p className="text-stone-600 mb-8 leading-relaxed">
              While we maintain a selection of ready-to-ship pieces, the heart of Arden Way is our bespoke service. 
              We collaborate with interior designers, architects, and homeowners to create tables that fit specific dimensions and aesthetics.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="bg-stone-100 p-3 rounded-full mr-4 text-stone-900">
                  <Filter size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900 mb-1">Select Your Timber</h4>
                  <p className="text-sm text-stone-500">Choose from African Walnut, Kiaat, Matumi, or imported French Oak.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-stone-100 p-3 rounded-full mr-4 text-stone-900">
                  <Menu size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900 mb-1">Resin & Finish</h4>
                  <p className="text-sm text-stone-500">Customise opacity, colour, and sheen. From deep river blues to crystal clear.</p>
                </div>
              </div>
            </div>

            <button className="border border-stone-900 text-stone-900 px-8 py-3 uppercase tracking-widest text-sm hover:bg-stone-900 hover:text-white transition-colors">
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-stone-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl mb-16">Client Perspectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="bg-stone-800/50 p-8 border border-stone-700">
              <div className="flex justify-center space-x-1 text-amber-500 mb-6">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-stone-300 italic mb-6 font-light">"{t.text}"</p>
              <div>
                <h4 className="font-serif text-lg">{t.name}</h4>
                <span className="text-xs uppercase tracking-wider text-stone-500">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-stone-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Logo className="mb-6 text-stone-900" />
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              Handcrafted river tables and epoxy furniture. Born from African timber, refined for modern living.
            </p>
            <div className="flex space-x-4 text-stone-400">
              <Instagram size={20} className="hover:text-stone-900 cursor-pointer" />
              <Facebook size={20} className="hover:text-stone-900 cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="uppercase text-xs font-bold tracking-widest mb-6 text-stone-900">Studio</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5 shrink-0" />
                <span>The Palms Centre<br/>Woodstock, Cape Town<br/>South Africa</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+27 21 555 0199</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>hello@ardenway.co.za</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-xs font-bold tracking-widest mb-6 text-stone-900">Information</h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li><a href="#" className="hover:text-stone-900">Bespoke Process</a></li>
              <li><a href="#" className="hover:text-stone-900">Care & Maintenance</a></li>
              <li><a href="#" className="hover:text-stone-900">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-stone-900">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-xs font-bold tracking-widest mb-6 text-stone-900">Newsletter</h4>
            <p className="text-xs text-stone-500 mb-4">Subscribe for studio updates and new inventory alerts.</p>
            <div className="flex border-b border-stone-300 pb-2">
              <input type="email" placeholder="Email Address" className="w-full outline-none text-sm placeholder-stone-400" />
              <button className="text-stone-900 font-medium uppercase text-xs">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400">
          <p>&copy; {new Date().getFullYear()} Arden Way Furniture. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CartSidebar = ({ isOpen, onClose, cart }: { isOpen: boolean, onClose: () => void, cart: Product[] }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[60] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-serif text-xl">Enquiry List</h2>
              <button onClick={onClose}><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-stone-500 mt-20">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your list is empty.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex space-x-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-stone-100" />
                      <div>
                        <h4 className="font-serif text-sm">{item.name}</h4>
                        <p className="text-xs text-stone-500 mt-1">{item.dimensions}</p>
                        <p className="text-sm font-medium mt-2">{formatCurrency(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t bg-stone-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-stone-500">Estimated Total</span>
                <span className="text-xl font-serif">{formatCurrency(total)}</span>
              </div>
              <p className="text-xs text-stone-500 mb-6 text-center">
                Shipping calculated at checkout. Nationwide delivery available.
              </p>
              <button className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-stone-800">
                Proceed to Enquiry
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState('home');

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setCartOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-stone-900 antialiased selection:bg-amber-100 selection:text-amber-900">
      <Header 
        cartCount={cart.length} 
        onOpenCart={() => setCartOpen(true)} 
        onNavigate={handleNavigate}
      />
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onShopNow={() => scrollToSection('collection')} />
            <div className="py-16 bg-white text-center">
               <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-stone-600">
                  <div className="flex flex-col items-center">
                    <div className="mb-4 text-amber-700"><Star size={24} /></div>
                    <h3 className="font-serif text-lg text-stone-900 mb-2">Artisan Excellence</h3>
                    <p className="text-sm max-w-xs">Master craftsmanship meets premium African hardwoods.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-4 text-amber-700"><Info size={24} /></div>
                    <h3 className="font-serif text-lg text-stone-900 mb-2">Transparent Pricing</h3>
                    <p className="text-sm max-w-xs">Direct-from-studio pricing in ZAR. No hidden import duties.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-4 text-amber-700"><MapPin size={24} /></div>
                    <h3 className="font-serif text-lg text-stone-900 mb-2">Nationwide Delivery</h3>
                    <p className="text-sm max-w-xs">Professional furniture logistics to your door, anywhere in SA.</p>
                  </div>
               </div>
            </div>
            <Collection products={PRODUCTS} onAddToCart={addToCart} />
            <Bespoke />
            <Testimonials />
          </>
        )}
        
        {currentPage === 'collection' && (
           <div className="pt-24">
             <div className="bg-stone-100 py-12 mb-8">
               <div className="container mx-auto px-6 text-center">
                 <h1 className="font-serif text-4xl mb-4">Full Collection</h1>
                 <p className="text-stone-500">In-stock and made-to-order pieces.</p>
               </div>
             </div>
             <Collection products={PRODUCTS} onAddToCart={addToCart} />
           </div>
        )}

        {currentPage === 'bespoke' && (
           <div className="pt-24">
              <Bespoke />
              <div className="bg-stone-50 py-20 text-center">
                <div className="container mx-auto px-6">
                  <h3 className="font-serif text-3xl mb-6">Ready to create something unique?</h3>
                  <p className="max-w-xl mx-auto text-stone-600 mb-8">
                    Contact our design team to discuss your specific requirements, dimensions, and wood preferences.
                  </p>
                  <button className="bg-stone-900 text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-stone-800">
                    Contact Studio
                  </button>
                </div>
              </div>
           </div>
        )}

        {currentPage === 'about' && (
          <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
            <h1 className="font-serif text-5xl mb-8 text-center">Our Story</h1>
            <div className="prose prose-stone mx-auto text-stone-600 leading-relaxed space-y-6">
              <p className="text-lg font-light">
                Arden Way began with a simple appreciation for the untold stories within African timber. 
                What started in a small garage in Woodstock has grown into a premier design studio dedicated to preserving nature in functional art.
              </p>
              <p>
                Unlike mass-market furniture, every Arden Way table is a dialogue between the artisan and the material. 
                We source our wood sustainably from fallen trees or reputable mills in South Africa and further north. 
                The imperfections—the knots, the cracks, the live edges—are not defects to be removed, but features to be celebrated through the medium of crystal-clear epoxy resin.
              </p>
              <p>
                We believe in "understated luxury"—furniture that doesn't scream for attention but commands it through quality and presence. 
                Our team of local craftsmen pour, sand, and finish every piece by hand, ensuring that what enters your home is nothing short of a masterpiece.
              </p>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200" 
              alt="Workshop" 
              className="w-full h-80 object-cover mt-12 grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
        )}
      </main>

      <Footer />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}