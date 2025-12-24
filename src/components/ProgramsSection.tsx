import ProgramCard from './ProgramCard';

const ProgramsSection = () => {
  const programs = [
    {
      title: 'Geographical Indications of Kashmir',
      subtitle: '3-Month Advanced Certificate',
      location: 'Srinagar, Kashmir',
      duration: '3 Months + 2 Weeks Immersion',
      modules: 25,
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&auto=format&fit=crop',
      highlights: [
        'Meet Saffron Growers in Pampore',
        'Engage with Kani Shawl Weavers',
        'Visit Paper-Maché Artists',
        'Co-create IP Audit Reports',
      ],
    },
    {
      title: 'Sustainable Crafts & Heritage',
      subtitle: 'Professional Certificate',
      location: 'Multiple Locations',
      duration: '2 Months + 1 Week Immersion',
      modules: 18,
      image: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=800&auto=format&fit=crop',
      highlights: [
        'Traditional Craftsmanship Techniques',
        'Heritage Conservation Methods',
        'Sustainable Business Models',
        'Market Access Strategies',
      ],
    },
    {
      title: 'Rural Innovation & Development',
      subtitle: 'Executive Program',
      location: 'Pan-India',
      duration: '6 Weeks + Field Project',
      modules: 12,
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&auto=format&fit=crop',
      highlights: [
        'Grassroots Innovation Mapping',
        'Community-led Development',
        'Technology Transfer Models',
        'Impact Measurement Frameworks',
      ],
    },
  ];

  return (
    <section id="programs" className="relative py-24 px-4 particle-bg">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary/30 mb-6">
            <span className="text-sm font-medium text-secondary">Course Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Featured{' '}
            <span className="gradient-text">Programs</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover our curated selection of immersive learning experiences 
            that bridge theory with real-world practice.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.title} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
