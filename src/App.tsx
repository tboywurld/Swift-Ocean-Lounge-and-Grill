import { motion } from 'motion/react';
import { Phone, MessageCircle, MapPin, Clock, Instagram, Facebook, Twitter, Menu, X, ChevronRight, Star, Quote, Utensils, GlassWater, Music, Users, ShieldCheck, Zap } from 'lucide-react';
import React, { useState, useEffect } from 'react';

// --- Shared Components ---

const scrollTo = (id: string) => {
  const element = document.getElementById(id.replace('#', ''));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.location.href = id;
  }
};

const Button = ({ children, variant = 'primary', className = '', onClick = () => {}, href }: { children: React.ReactNode, variant?: 'primary' | 'secondary' | 'outline' | 'glass', className?: string, onClick?: () => void, href?: string }) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group text-sm uppercase tracking-wider cursor-pointer";
  const variants = {
    primary: "bg-amber-500 text-black hover:bg-white shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
    secondary: "bg-white text-black hover:bg-amber-400",
    outline: "border border-white/20 text-white hover:bg-white hover:text-black font-bold",
    glass: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20"
  };
  
  const handleClick = (e: React.MouseEvent) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      scrollTo(href);
    } else if (href) {
      window.open(href, '_blank');
    } else {
      onClick();
    }
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  );
};

const SectionTitle = ({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-amber-400 uppercase tracking-[0.3em] text-xs font-bold mb-3 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '60px' }}
      viewport={{ once: true }}
      className="h-1 bg-amber-500 mt-4 mx-auto"
    />
  </div>
);

// --- Navbar ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-6 pointer-events-none">
      <nav className={`container mx-auto px-8 py-4 flex justify-between items-center transition-all duration-500 rounded-2xl glass pointer-events-auto ${isScrolled ? 'shadow-2xl' : ''}`}>
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-amber-200 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)] group-hover:scale-110 transition-transform">
            <span className="text-[#050508] font-bold text-xl">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-sans font-bold text-white tracking-tight uppercase leading-none">Swift Ocean</span>
            <span className="text-[9px] text-amber-400 tracking-[0.3em] uppercase font-bold">Lounge & Grill</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => scrollTo(link.href)}
              className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-amber-400 transition-colors font-bold cursor-pointer"
            >
              {link.name}
            </button>
          ))}
          <div className="flex items-center gap-4 ml-4">
             <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full animate-pulse font-bold">OPEN 24H</span>
             <Button variant="secondary" className="py-2 px-6 text-xs rounded-xl" href="#contact">Reserve</Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        </nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center lg:hidden"
        >
          <button 
            className="absolute top-6 right-6 text-white p-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl uppercase tracking-widest text-white font-medium hover:text-gold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
            >
              <Button variant="primary" className="mt-4">Reserve A Table</Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// --- Hero Section ---

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* Background with cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
          alt="Cinematic Lounge" 
          className="w-full h-full object-cover scale-110 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="container mx-auto px-6 relative z-30 pointer-events-auto">
        <div className="max-w-4xl">
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="pt-24 md:pt-0"
          >
            <h1 className="text-5xl md:text-8xl font-sans font-bold text-white mb-8 leading-[1] md:leading-[0.9] tracking-tighter">
              WHERE GREAT FOOD <br className="hidden md:block" />
              <span className="text-amber-400">MEETS PREMIUM</span> VIBES
            </h1>
            <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed font-medium drop-shadow-lg">
              Experience unforgettable nights, delicious grills, and nonstop energy in the heart of Onitsha.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-[70] pointer-events-auto">
              <Button variant="primary" className="w-full sm:w-auto rounded-2xl px-12 h-16 text-base shadow-[0_0_30px_rgba(245,158,11,0.4)] cursor-pointer" href="#menu">
                View Our Menu &rarr;
              </Button>
              <Button variant="glass" className="w-full sm:w-auto rounded-2xl px-12 h-16 text-base font-bold glass-light border-white/30 cursor-pointer" href="#experience">
                Explore Lounge
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};

// --- About Section ---

const About = () => {
  return (
    <section id="about" className="py-24 mt-20 md:mt-0 bg-transparent relative z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 relative">
             <div className="grid grid-cols-2 gap-4">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="pt-12"
               >
                 <img 
                   src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1548&auto=format&fit=crop" 
                   alt="Lounge Vibe" 
                   className="rounded-3xl w-full h-[300px] object-cover shadow-2xl border border-white/10"
                   referrerPolicy="no-referrer"
                 />
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
               >
                 <img 
                   src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
                   alt="Cocktail" 
                   className="rounded-3xl w-full h-[300px] object-cover shadow-2xl border border-white/10"
                   referrerPolicy="no-referrer"
                 />
               </motion.div>
             </div>
             <div className="absolute -bottom-10 -right-10 bg-amber-500 p-8 rounded-3xl hidden md:block shadow-[0_4px_30px_rgba(245,158,11,0.4)]">
                <span className="text-4xl font-bold text-black block leading-none mb-1">24/7</span>
                <span className="text-[10px] text-black uppercase tracking-[0.2em] font-bold">Nonstop Vibes</span>
             </div>
          </div>

          <div className="flex-1">
            <SectionTitle title="The Ultimate Destination" subtitle="Our Story" centered={false} />
            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              Swift Ocean Lounge and Grill is more than just a restaurant; it's a premium lifestyle destination. Nestled in the heart of Onitsha, we've created a sanctuary where luxury meets local hospitality.
            </p>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Whether you're looking for a sophisticated spot for date nights, an energetic venue for group hangouts, or the perfect backdrop for your birthday celebration, our blend of international grill-style cuisine and curated music creates an atmosphere like no other in Anambra.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
                   <Zap size={20} />
                 </div>
                 <span className="text-white font-medium">Vibrant Nightlife</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
                   <Utensils size={20} />
                 </div>
                 <span className="text-white font-medium">Premium Grill</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
                   <Music size={20} />
                 </div>
                 <span className="text-white font-medium">Live Music</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
                   <Users size={20} />
                 </div>
                 <span className="text-white font-medium">VIP Lounging</span>
               </div>
            </div>
            <Button variant="outline" href="#experience">Learn More About Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Experience Grid ---

const Experience = () => {
    const experiences = [
        { icon: Utensils, title: "Grilled Specials", desc: "Expertly seasoned local and international grill flavors." },
        { icon: GlassWater, title: "Signature Cocktails", desc: "Crafted by master mixologists with premium spirits." },
        { icon: Music, title: "Live Entertainment", desc: "Unmatched vibes with top DJs and live bands." },
        { icon: Users, title: "VIP Experience", desc: "Exclusive areas for those who seek maximum privacy." },
        { icon: ShieldCheck, title: "Premium Safety", desc: "Secure environment for your peace of mind." },
        { icon: Clock, title: "Open 24/7", desc: "The party never stops at Swift Ocean Lounge." },
    ];

    return (
        <section id="experience" className="py-24 bg-transparent">
            <div className="container mx-auto px-6">
                <SectionTitle title="Unforgettable Moments" subtitle="The Experience" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl glass border-white/5 hover:border-amber-400/30 transition-all duration-500 group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-amber-400/5 border border-white/10 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-400 group-hover:text-black transition-all duration-500">
                                <exp.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{exp.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm font-medium">{exp.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Showcase (Grid Layout) ---

const Showcase = () => {
  const items = [
    { title: "Grilled Croaker Fish", category: "Grill", img: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Signature Ocean Punch", category: "Cocktails", img: "https://images.pexels.com/photos/1189257/pexels-photo-1189257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Spicy Suya Platter", category: "Local Favorites", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" },
    { title: "Premium Spirit Selection", category: "Drinks", img: "https://images.unsplash.com/photo-1569701881644-02deb883ef4e?q=80&w=1978&auto=format&fit=crop" },
    { title: "Giant Tiger Prawns", category: "Seafood", img: "https://images.unsplash.com/photo-1604135398935-6297052f1430?q=80&w=1964&auto=format&fit=crop" },
    { title: "Barbecue Pork Ribs", category: "Grill", img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop" },
  ];

  return (
    <section id="menu" className="py-24 bg-black">
        <div className="container mx-auto px-6">
            <SectionTitle title="Savor The Excellence" subtitle="Our Showcase" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, i) => (
                    <motion.div 
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group overflow-hidden rounded-3xl aspect-[4/5]"
                    >
                        <img 
                            src={item.img} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute bottom-0 left-0 p-8 w-full border-b-[8px] border-amber-400 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">{item.category}</span>
                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <Button variant="outline" className="py-2 px-4 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">Explore Item</Button>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="text-center mt-12">
               <Button variant="primary" href="#contact">Request Group Menu</Button>
            </div>
        </div>
    </section>
  );
};

// --- Testimonials ---

const Testimonials = () => {
    const reviews = [
        { name: "Chidi Okafor", text: "Good drinks and good service. I love it. The fish was perfectly grilled!", rating: 5, avatar: "https://i.pravatar.cc/150?u=chidi" },
        { name: "Blessing Adebayo", text: "A vibrant atmosphere with delicious grilled dishes. Best spot in Onitsha for a weekend hangout.", rating: 5, avatar: "https://i.pravatar.cc/150?u=blessing" },
        { name: "Emeka Nwosu", text: "Perfect spot to chill with friends and enjoy nightlife. The music is always on point.", rating: 4, avatar: "https://i.pravatar.cc/150?u=emeka" },
        { name: "Sarah Daniels", text: "Amazing ambience and premium vibes. I celebrated my birthday here and it was magical.", rating: 5, avatar: "https://i.pravatar.cc/150?u=sarah" },
    ];

    return (
        <section className="py-24 bg-zinc-950 overflow-hidden">
            <div className="container mx-auto px-6">
                <SectionTitle title="What Our Guests Say" subtitle="Testimonials" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {reviews.map((rev, i) => (
                        <motion.div 
                            key={rev.name}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 relative"
                        >
                            <Quote className="absolute top-8 right-8 text-gold/20" size={48} />
                            <div className="flex items-center gap-4 mb-6">
                                <img src={rev.avatar} alt={rev.name} className="w-14 h-14 rounded-full border-2 border-gold shadow-lg" referrerPolicy="no-referrer" />
                                <div>
                                    <h4 className="text-white font-bold">{rev.name}</h4>
                                    <div className="flex text-gold">
                                        {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-white/70 italic text-lg leading-relaxed">"{rev.text}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Gallery Section ---

const Gallery = () => {
    const images = [
        "https://images.unsplash.com/photo-1543007630-9710e40.jpeg?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1914&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1536935338788-df31100344d5?q=80&w=1935&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2029&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    ];

    return (
        <section id="gallery" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <SectionTitle title="Moments At Swift" subtitle="Gallery" />
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="break-inside-avoid"
                        >
                            <img 
                                src={img} 
                                alt="Gallery Moment" 
                                className="w-full h-auto rounded-3xl hover:scale-[1.02] transition-transform duration-500 cursor-pointer" 
                                referrerPolicy="no-referrer"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Reservation Banner ---

const Reservation = () => {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
                    alt="CTA Bg" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>
            
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] border border-white/10 glass-light text-center"
                >
                    <SectionTitle title="READY FOR AN UNFORGETTABLE NIGHT?" subtitle="Instant Booking" />
                    <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Ready for an unforgettable night? Instant VIP table reservations and bottle service bookings via WhatsApp.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button className="w-full sm:w-auto h-16 px-10 text-sm font-bold bg-white text-black hover:bg-amber-400" href="tel:+2348104492125">
                            <Phone size={20} /> CALL TO RESERVE
                        </Button>
                        <Button variant="glass" className="w-full sm:w-auto h-16 px-10 text-sm font-bold bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2" href="https://wa.me/2348104492125">
                             MESSAGE NOW <MessageCircle size={20} />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Footer ---

const Footer = () => {
    return (
        <footer className="pt-24 pb-10 bg-transparent border-t border-white/5 relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div>
                        <a href="#" className="flex items-center gap-3 mb-8 group">
                            <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-amber-200 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                                <span className="text-[#050508] font-bold text-xl">S</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-sans font-bold text-white tracking-tight uppercase leading-none">Swift Ocean</span>
                                <span className="text-[9px] text-amber-400 tracking-[0.3em] uppercase font-bold">Lounge & Grill</span>
                            </div>
                        </a>
                        <p className="text-gray-400 leading-relaxed mb-8 text-sm font-medium">
                            The heartbeat of Onitsha's nightlife. Experience luxury dining, premium drinks, and nonstop vibes in the most sophisticated lounge in Anambra.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-amber-400 hover:border-amber-400 transition-all group glass">
                                    <Icon size={20} className="group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-8 border-l-4 border-amber-500 pl-4">Contact Info</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4 text-white/60 hover:text-white transition-colors cursor-pointer group text-sm font-medium tracking-tight">
                                <MapPin className="text-amber-400 shrink-0" size={18} />
                                <span>A2/28 Obinwanne Line, Onitsha 431103, Anambra, Nigeria</span>
                            </li>
                            <li className="flex gap-4 text-white/60 hover:text-white transition-colors cursor-pointer group text-sm font-medium tracking-tight">
                                <Phone className="text-amber-400 shrink-0" size={18} />
                                <span>+234 810 449 2125</span>
                            </li>
                            <li className="flex gap-4 text-white/60 hover:text-white transition-colors cursor-pointer group text-sm font-medium tracking-tight">
                                <Clock className="text-amber-400 shrink-0" size={18} />
                                <span>Open 24 Hours Daily</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-8 border-l-4 border-amber-500 pl-4">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'About Us', href: '#about' },
                                { name: 'Experience', href: '#experience' },
                                { name: 'Menu', href: '#menu' },
                                { name: 'Gallery', href: '#gallery' },
                                { name: 'Reservations', href: '#contact' }
                            ].map(link => (
                                <li key={link.name}>
                                    <button 
                                        onClick={() => scrollTo(link.href)}
                                        className="text-white/50 hover:text-amber-400 transition-colors block py-1 cursor-pointer text-sm font-medium"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-8 border-l-4 border-gold pl-4">Find Us</h4>
                        <div className="h-48 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.2409747372!2d6.786!3d6.146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104393ce763579bf%3A0xc3c5b59740263f45!2sOnitsha%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1708800000000!5m2!1sen!2sus" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                             ></iframe>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-white/30 text-center">
                        &copy; {new Date().getFullYear()} Swift Ocean Lounge And Grill. All Rights Reserved.
                    </p>
                    <p className="text-xs text-white/20 flex gap-6">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Cookie Policy</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

// --- WhatsApp Floating Button ---

const WhatsAppButton = () => (
    <motion.a 
        href="https://wa.me/2348104492125"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:bg-green-600 transition-colors"
    >
        <MessageCircle size={32} />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
    </motion.a>
);

// --- Main App Component ---

export default function App() {
  return (
    <div className="bg-[#050508] text-white font-sans selection:bg-amber-400 selection:text-black min-h-screen relative overflow-x-hidden">
      {/* Theme Blurred Spots */}
      <div className="fixed top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-amber-900/15 rounded-full blur-[150px] pointer-events-none z-0" />

      <Navbar />
      <div className="relative z-10">
        <Hero />
        <main>
          <About />
          <Experience />
          <Showcase />
          <Testimonials />
          <Gallery />
          <Reservation />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}
