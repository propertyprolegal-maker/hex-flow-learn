import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface Course {
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  modules: number;
  image: string;
  highlights: string[];
  featured?: boolean;
}

interface CoursesSlideProps {
  onEnroll: () => void;
}

const CoursesSlide = ({ onEnroll }: CoursesSlideProps) => {
  const courses: Course[] = [
    {
      title: 'Geographical Indications of Kashmir',
      subtitle: '3-Month Advanced Certificate',
      location: 'Srinagar, Kashmir',
      duration: '3 Months + 2 Weeks',
      modules: 25,
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&auto=format&fit=crop',
      highlights: ['Meet Saffron Growers', 'Kani Shawl Weavers', 'Paper-Maché Artists'],
      featured: true,
    },
    {
      title: 'Sustainable Crafts & Heritage',
      subtitle: 'Professional Certificate',
      location: 'Multiple Locations',
      duration: '2 Months + 1 Week',
      modules: 18,
      image: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=800&auto=format&fit=crop',
      highlights: ['Traditional Techniques', 'Heritage Conservation', 'Market Access'],
    },
    {
      title: 'Rural Innovation & Development',
      subtitle: 'Executive Program',
      location: 'Pan-India',
      duration: '6 Weeks + Field Project',
      modules: 12,
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&auto=format&fit=crop',
      highlights: ['Innovation Mapping', 'Community Development', 'Impact Measurement'],
    },
  ];

  return (
    <section className="relative h-full flex items-center justify-center px-4 overflow-hidden py-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary/30 mb-4">
            <span className="text-sm font-medium text-secondary">Available Courses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Choose Your{' '}
            <span className="gradient-text">Adventure</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Enroll in immersive programs that transform how you learn.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div 
              key={course.title}
              className={`group relative glass-card rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 ${
                course.featured ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border/30 hover:border-primary/50'
              }`}
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                
                {course.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-primary font-medium mb-1">{course.subtitle}</p>
                  <h3 className="text-base font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{course.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{course.modules} Modules</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1">
                  {course.highlights.map((highlight) => (
                    <span 
                      key={highlight}
                      className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button variant="glow" size="sm" className="w-full group/btn" onClick={onEnroll}>
                  Enroll Now
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-6">
          <button className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors group">
            <span className="font-medium">View All Courses</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSlide;
