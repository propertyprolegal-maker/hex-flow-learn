import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, ArrowRight, Leaf, Coffee, Citrus, FlaskConical, Palette, ShirtIcon, Calculator, Building2, HeartPulse } from 'lucide-react';
import { Button } from './ui/button';

interface Course {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  modules: number;
  image: string;
  highlights: string[];
  featured?: boolean;
  icon: React.ReactNode;
  category: string;
}

const CoursesSlide = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const courses: Course[] = [
    {
      id: 'saffron',
      title: 'Saffron: The Red Gold of Kashmir',
      subtitle: 'Kashmir Immersion Program',
      location: 'Pampore, Kashmir',
      duration: '3 Months + 2 Weeks',
      modules: 24,
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop',
      highlights: ['Meet Saffron Growers', 'GI Protection', 'Quality Standards'],
      featured: true,
      icon: <Leaf className="w-5 h-5" />,
      category: 'kashmir',
    },
    {
      id: 'heritage-business',
      title: 'Heritage Business Management',
      subtitle: 'Kashmir Immersion Program',
      location: 'Srinagar, Kashmir',
      duration: '3 Months + 2 Weeks',
      modules: 20,
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&auto=format&fit=crop',
      highlights: ['Heritage Conservation', 'Business Strategy', 'Cultural Tourism'],
      featured: true,
      icon: <Building2 className="w-5 h-5" />,
      category: 'kashmir',
    },
    {
      id: 'coorg-honey',
      title: 'Coorg Honey: Forest Gold',
      subtitle: 'Coorg Immersion Program',
      location: 'Kodagu, Karnataka',
      duration: '2 Months + 1 Week',
      modules: 16,
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop',
      highlights: ['Beekeeping Traditions', 'Forest Ecosystem', 'GI Certification'],
      icon: <FlaskConical className="w-5 h-5" />,
      category: 'coorg',
    },
    {
      id: 'coorg-orange',
      title: 'Coorg Orange: Citrus Heritage',
      subtitle: 'Coorg Immersion Program',
      location: 'Kodagu, Karnataka',
      duration: '2 Months + 1 Week',
      modules: 14,
      image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&auto=format&fit=crop',
      highlights: ['Orange Cultivation', 'Supply Chain', 'Brand Building'],
      icon: <Citrus className="w-5 h-5" />,
      category: 'coorg',
    },
    {
      id: 'coorg-coffee',
      title: 'Coorg Coffee: Bean to Cup',
      subtitle: 'Coorg Immersion Program',
      location: 'Kodagu, Karnataka',
      duration: '2 Months + 1 Week',
      modules: 18,
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop',
      highlights: ['Coffee Plantations', 'Processing Methods', 'Export Markets'],
      icon: <Coffee className="w-5 h-5" />,
      category: 'coorg',
    },
    {
      id: 'mysore-rosewood',
      title: 'Mysore Rosewood Inlay',
      subtitle: 'Mysore Immersion Program',
      location: 'Mysore, Karnataka',
      duration: '2 Months + 2 Weeks',
      modules: 16,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
      highlights: ['Inlay Artisans', 'Woodcraft Heritage', 'Design Innovation'],
      icon: <Palette className="w-5 h-5" />,
      category: 'mysore',
    },
    {
      id: 'mysore-silk',
      title: 'Mysore Silk Saree',
      subtitle: 'Mysore Immersion Program',
      location: 'Mysore, Karnataka',
      duration: '2 Months + 2 Weeks',
      modules: 20,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop',
      highlights: ['Silk Weaving', 'Zari Craft', 'Fashion Industry'],
      icon: <ShirtIcon className="w-5 h-5" />,
      category: 'mysore',
    },
    {
      id: 'jain-mathematics',
      title: 'Jain Mathematics & Philosophy',
      subtitle: 'Delhi Immersion Program',
      location: 'Delhi NCR',
      duration: '6 Weeks + Field Study',
      modules: 12,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
      highlights: ['Ancient Mathematics', 'Philosophical Texts', 'Modern Applications'],
      icon: <Calculator className="w-5 h-5" />,
      category: 'delhi',
    },
    {
      id: 'health-medical',
      title: 'Traditional Health & Medicine',
      subtitle: 'Multi-Location Program',
      location: 'Pan-India',
      duration: '3 Months + Practicum',
      modules: 22,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
      highlights: ['Ayurveda', 'Traditional Remedies', 'Wellness Tourism'],
      icon: <HeartPulse className="w-5 h-5" />,
      category: 'health',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'kashmir', label: 'Kashmir' },
    { id: 'coorg', label: 'Coorg' },
    { id: 'mysore', label: 'Mysore' },
    { id: 'delhi', label: 'Delhi' },
    { id: 'health', label: 'Health' },
  ];

  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  return (
    <>
      <section className="relative h-full flex items-center justify-center px-4 overflow-hidden py-8">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary/30 mb-4">
              <span className="text-sm font-medium text-secondary">9 Immersive Programs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
              Choose Your{' '}
              <span className="gradient-text">Adventure</span>
            </h2>
            <p className="text-base text-muted-foreground">
              Explore India's rich heritage through hands-on immersion programs.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {filteredCourses.map((course) => (
              <button
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className={`group relative glass-card rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 text-left ${
                  course.featured ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border/30 hover:border-primary/50'
                }`}
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-primary/90 text-primary-foreground">
                    {course.icon}
                  </div>
                  
                  {course.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full bg-secondary/90 text-secondary-foreground text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div>
                    <p className="text-xs text-secondary font-medium mb-1">{course.subtitle}</p>
                    <h3 className="text-sm font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[80px]">{course.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1">
                    {course.highlights.slice(0, 2).map((highlight) => (
                      <span 
                        key={highlight}
                        className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-2 text-primary font-medium text-xs group-hover:gap-3 transition-all">
                      View Details
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursesSlide;
