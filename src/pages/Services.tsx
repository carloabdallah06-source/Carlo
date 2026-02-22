import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useSearchParams, Link } from 'react-router-dom';
import { Camera, Sparkles, Users, Music, Star, Heart, ShieldCheck, Zap } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'photobooth', name: 'Photobooth', filter: 'Photo Experience' },
  { id: 'performers', name: 'Performers & Characters', filter: 'Performers' },
  { id: 'zaffe', name: 'Zaffe & Parade', filter: 'Entertainment' },
  { id: 'musicians', name: 'Live Musicians', filter: 'Entertainment' },
  { id: 'effects', name: 'Special Effects', filter: 'Special Effects' },
  { id: 'hostesses', name: 'Hostesses', filter: 'Hospitality' },
  { id: 'setups', name: 'Setups', filter: 'Setups' },
];

const services = [
  // PHOTO EXPERIENCE
  {
    id: '360-spinner',
    category: 'Photo Experience',
    title: '360 Spinner',
    description: 'Capture every angle of the excitement with our high-speed 360-degree video platform.',
    features: ['Slow Motion Video', 'Instant Sharing Station', 'Custom Overlays', 'Professional Lighting'],
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000',
    icon: Camera,
  },
  {
    id: 'mirror-booth',
    category: 'Photo Experience',
    title: 'Mirror Photo Booth',
    description: 'An elegant, full-length mirror that interacts with guests through animations and touch-screen features.',
    features: ['Touch Screen Interaction', 'Full Length Photos', 'On-Screen Signing', 'Elegant Design'],
    image: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?auto=format&fit=crop&q=80&w=1000',
    icon: Camera,
  },
  {
    id: 'audio-guestbook',
    category: 'Photo Experience',
    title: 'Audio Guest Book',
    description: 'A nostalgic way to capture voices. Guests leave heartfelt messages on a vintage rotary phone.',
    features: ['Vintage Phone Designs', 'Unlimited Recordings', 'Digital Delivery', 'Custom Greeting'],
    image: 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?auto=format&fit=crop&q=80&w=1000',
    icon: Music,
  },
  {
    id: 'telephone-cabinet',
    category: 'Photo Experience',
    title: 'Telephone Cabinet',
    description: 'A stylish, private space for guests to record their messages in a classic telephone booth setting.',
    features: ['Acoustic Privacy', 'Iconic Design', 'Integrated Audio System', 'Perfect Photo Op'],
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1000',
    icon: Music,
  },

  // SPECIAL EFFECTS
  {
    id: 'led-butterfly-drone',
    category: 'Special Effects',
    title: 'LED Butterfly Drone',
    description: 'A magical aerial display featuring glowing butterfly drones that dance through the air.',
    features: ['LED Lighting', 'Synchronized Flight', 'Indoor/Outdoor Capable', 'Magical Atmosphere'],
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'bubble-machine',
    category: 'Special Effects',
    title: 'Bubble Machine',
    description: 'Thousands of shimmering bubbles to create a whimsical and playful atmosphere.',
    features: ['High Output', 'Safe & Non-Toxic', 'Indoor/Outdoor Use', 'Professional Grade'],
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'balloons-show',
    category: 'Special Effects',
    title: 'Balloons Show',
    description: 'A spectacular display of coordinated balloon releases or drops for grand moments.',
    features: ['Custom Colors', 'Timed Release', 'Eco-Friendly Options', 'Massive Impact'],
    image: 'https://images.unsplash.com/photo-1530103862676-fa8c9d34bb34?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'fireworks',
    category: 'Special Effects',
    title: 'Full Fireworks Display',
    description: 'A breathtaking pyrotechnic show to light up the sky during your most significant moments.',
    features: ['Professional Pyrotechnics', 'Safety Certified', 'Custom Choreography', 'Grand Finale'],
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'dry-ice',
    category: 'Special Effects',
    title: 'Dry Ice Machine',
    description: 'The "Dancing on Clouds" effect—thick, low-lying fog that stays close to the ground.',
    features: ['Odorless & Safe', 'Low-Lying Fog', 'Perfect for First Dance', 'Cinematic Look'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'confetti-machines',
    category: 'Special Effects',
    title: 'Confetti Machines',
    description: 'Continuous streams of confetti to celebrate high-energy moments and grand entrances.',
    features: ['High Volume Output', 'Custom Confetti Colors', 'Remote Controlled', 'Safe Operation'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'smoke-machine',
    category: 'Special Effects',
    title: 'Smoke Machine',
    description: 'Professional atmospheric haze to enhance lighting effects and create depth.',
    features: ['Adjustable Density', 'Safe Fluid', 'Lighting Enhancement', 'Atmospheric Depth'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'confetti-guns',
    category: 'Special Effects',
    title: 'Confetti Guns',
    description: 'Handheld cannons for a sudden burst of celebration during key moments.',
    features: ['Instant Impact', 'Manual Operation', 'Various Fillings', 'High Energy'],
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'smoke-guns',
    category: 'Special Effects',
    title: 'Smoke Guns',
    description: 'Dynamic handheld smoke effects for dramatic entrances and photo sessions.',
    features: ['CO2 Style Bursts', 'Portable', 'Dramatic Visuals', 'Interactive'],
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'volcanoes-guns',
    category: 'Special Effects',
    title: 'Volcanoes Guns',
    description: 'High-intensity vertical bursts of smoke and light for a powerful visual statement.',
    features: ['Vertical Output', 'LED Integrated', 'High Pressure', 'Stage Ready'],
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'led-sticks',
    category: 'Special Effects',
    title: 'LED Sticks & Glasses',
    description: 'Glow-in-the-dark accessories to light up the dance floor and energize your guests.',
    features: ['Multi-Color Modes', 'Bulk Quantities', 'High Visibility', 'Party Essential'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },
  {
    id: 'cold-sparks',
    category: 'Special Effects',
    title: 'Cold Spark Fountains',
    description: 'Safe, indoor-approved spark fountains that create a stunning visual without the heat.',
    features: ['Touch-Safe Sparks', 'Indoor Approved', 'Adjustable Height', 'No Smoke/Odor'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
  },

  // PERFORMERS
  {
    id: 'shots-girl',
    category: 'Performers',
    title: 'Shots Girl',
    description: 'Elegant hostesses serving signature drinks in a stylish and interactive way.',
    features: ['Themed Costumes', 'Interactive Service', 'Premium Presentation', 'Professional Staff'],
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1000',
    icon: Users,
  },
  {
    id: 'glitter-girl',
    category: 'Performers',
    title: 'Glitter Girl',
    description: 'Add a touch of sparkle to your guests with professional glitter and face art.',
    features: ['Eco-Friendly Glitter', 'Custom Designs', 'Interactive Station', 'Sparkling Results'],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1000',
    icon: Users,
  },
  {
    id: 'cigar-girl',
    category: 'Performers',
    title: 'Cigar Girl',
    description: 'Vintage-style service offering premium cigars in a classic and sophisticated manner.',
    features: ['Vintage Attire', 'Premium Selection', 'Sophisticated Service', 'Mobile Tray'],
    image: 'https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?auto=format&fit=crop&q=80&w=1000',
    icon: Users,
  },
  {
    id: 'tall-dress-violinist',
    category: 'Performers',
    title: 'Tall Dress Violinist',
    description: 'A breathtaking musical performance featuring a violinist in an extraordinarily long, elegant dress.',
    features: ['Visual Spectacle', 'Playback Music', 'Elegant Aesthetic', 'Unique Performance'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000',
    icon: Music,
  },
  {
    id: 'tall-dress-harpist',
    category: 'Performers',
    title: 'Tall Dress Harpist',
    description: 'Ethereal harp music delivered by a performer in a stunning, floor-to-ceiling gown.',
    features: ['Ethereal Sound', 'Grand Visuals', 'Classical Elegance', 'Playback Music'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000',
    icon: Music,
  },
  {
    id: 'mirror-characters',
    category: 'Performers',
    title: 'Mirror Characters',
    description: 'Fascinating performers covered head-to-toe in mirrors, reflecting the light and energy of your event.',
    features: ['Reflective Costumes', 'Interactive Mime', 'Stunning Photos', 'Modern Aesthetic'],
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=1000',
    icon: Users,
  },
  {
    id: 'led-astronaut',
    category: 'Performers',
    title: 'LED Astronaut Character',
    description: 'A futuristic, glowing astronaut character that brings a sci-fi energy to the dance floor.',
    features: ['Full LED Suit', 'Interactive Dancing', 'Futuristic Theme', 'High Energy'],
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000',
    icon: Users,
  },
  {
    id: 'bears',
    category: 'Performers',
    title: 'Bears',
    description: 'Giant, friendly bear characters that provide fun interactions and great photo opportunities.',
    features: ['Life-Size Costumes', 'Playful Interaction', 'Kid-Friendly', 'Memorable Photos'],
    image: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=1000',
    icon: Users,
  },
  {
    id: 'disco-girls',
    category: 'Performers',
    title: 'Disco Girls',
    description: 'High-energy dancers in retro disco attire to get everyone moving on the dance floor.',
    features: ['Retro Costumes', 'Choreographed Routines', 'Dance Floor Starters', 'Vibrant Energy'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000',
    icon: Users,
  },
  {
    id: 'gender-reveal',
    category: 'Performers',
    title: 'Gender Reveal Characters',
    description: 'Specialized characters to make your gender reveal moment truly unique and theatrical.',
    features: ['Themed Costumes', 'Moment Reveal', 'Theatrical Performance', 'Emotional Impact'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
    icon: Users,
  },
  {
    id: 'valentine-characters',
    category: 'Performers',
    title: 'Valentine Characters',
    description: 'Romantic and themed characters perfect for Valentine-themed events or romantic surprises.',
    features: ['Romantic Attire', 'Themed Interaction', 'Sweet Surprises', 'Heartfelt Moments'],
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000',
    icon: Heart,
  },

  // OTHERS
  {
    id: 'musicians',
    category: 'Entertainment',
    title: 'Live Musicians',
    description: 'World-class musicians providing the perfect soundtrack for your celebration.',
    features: ['Solo Instrumentalists', 'Jazz Bands', 'String Quartets', 'Live Singers'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000',
    icon: Music,
  },
  {
    id: 'zaffeh',
    category: 'Entertainment',
    title: 'Zaffeh & Parade',
    description: 'Traditional and modern grand entrances that set the tone for an unforgettable celebration.',
    features: ['Traditional Zaffeh', 'Modern Parade', 'Drummers', 'Dancers'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
    icon: Heart,
  },
  {
    id: 'hostesses',
    category: 'Hospitality',
    title: 'Professional Hostesses',
    description: 'Our team of elegant hostesses ensures your guests are welcomed with the highest standard of hospitality.',
    features: ['Guest Registration', 'Seating Assistance', 'Information Concierge', 'Multilingual Staff'],
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1000',
    icon: Star,
  },
  // SETUPS
  {
    id: 'proposal-setup',
    category: 'Setups',
    title: 'Proposal Setup',
    description: 'Create the perfect romantic setting for your "Yes" moment with our bespoke proposal decorations.',
    features: ['Romantic Decor', 'Floral Arrangements', 'Lighting Design', 'Personalized Details'],
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000',
    icon: Heart,
  },
  {
    id: 'birthday-setup',
    category: 'Setups',
    title: 'Birthday Setup',
    description: 'From elegant dinners to vibrant parties, we design birthday setups that reflect your personality.',
    features: ['Themed Decorations', 'Balloon Art', 'Table Styling', 'Custom Signage'],
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=1000',
    icon: Star,
  },
];

export const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const filteredServices = services.filter(service => {
    if (currentCategory === 'all') return true;
    const cat = categories.find(c => c.id === currentCategory);
    if (!cat) return true;
    
    // Special handling for musicians vs zaffe if they share a category
    if (currentCategory === 'musicians') return service.id === 'musicians';
    if (currentCategory === 'zaffe') return service.id === 'zaffeh';
    
    return service.category === cat.filter;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
          >
            Our Offerings
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif text-white mb-8"
          >
            Exquisite <span className="italic text-gold-light">Services</span>
          </motion.h1>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ category: cat.id })}
              className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border ${
                currentCategory === cat.id 
                  ? 'bg-gold text-black border-gold' 
                  : 'text-white/60 border-white/10 hover:border-gold hover:text-gold'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="space-y-32">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-video overflow-hidden rounded-sm shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                      <service.icon size={24} />
                    </div>
                    <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">{service.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">{service.title}</h2>
                  <p className="text-white/60 text-lg mb-8 leading-relaxed font-light">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-white/40 text-sm uppercase tracking-widest">
                        <ShieldCheck size={16} className="text-gold" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-outline inline-block text-center">Inquire Now</Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-24">
              <p className="text-white/40 uppercase tracking-widest">No services found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
