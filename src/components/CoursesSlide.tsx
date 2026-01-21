import { useNavigate } from 'react-router-dom';
import { ArrowRight, Anchor, Wrench, Building2, GraduationCap } from 'lucide-react';

const categories = [
  {
    id: 'anchor-courses',
    label: 'Anchor Courses',
    icon: <Anchor className="w-8 h-8" />,
    description: 'Professional certifications with hands-on immersion experiences across India.',
    color: 'from-primary to-primary-glow',
  },
  {
    id: 'workshops',
    label: 'Workshops',
    icon: <Wrench className="w-8 h-8" />,
    description: 'Short-term immersive programs combining theory with real-world field work.',
    color: 'from-secondary to-secondary-glow',
  },
  {
    id: 'universities',
    label: 'Universities',
    icon: <Building2 className="w-8 h-8" />,
    description: 'Specialized courses for university students and faculty development.',
    color: 'from-accent to-primary',
  },
  {
    id: 'schools',
    label: 'Schools',
    icon: <GraduationCap className="w-8 h-8" />,
    description: 'Experiential learning programs designed for school students and educators.',
    color: 'from-primary to-secondary',
  },
];

const CoursesSlide = () => {
  const navigate = useNavigate();

  return (
    <section id="courses" className="relative py-12 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary/30 mb-4">
            <span className="text-sm font-medium text-secondary">Explore Courses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Choose Your{' '}
            <span className="gradient-text">Learning Path</span>
          </h2>
          <p className="text-base text-muted-foreground">
            From schools to universities, professional certifications to immersive workshops.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/courses/${category.id}`)}
              className="group relative glass-card rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 text-left p-6"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {category.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {category.description}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSlide;
