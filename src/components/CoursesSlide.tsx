import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, GraduationCap, Building2, Anchor, Wrench } from 'lucide-react';
import { schoolCourses } from '@/data/schoolCourses';
import { universityCourses } from '@/data/universityCourses';
import { anchorCourses } from '@/data/anchorCourses';
import { workshopCourses } from '@/data/workshopCourses';

const CoursesSlide = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('schools');

  const categories = [
    { id: 'schools', label: 'Schools', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'universities', label: 'Universities', icon: <Building2 className="w-4 h-4" /> },
    { id: 'anchor', label: 'Anchor Courses', icon: <Anchor className="w-4 h-4" /> },
    { id: 'workshops', label: 'Workshops', icon: <Wrench className="w-4 h-4" /> },
  ];

  const getCourses = () => {
    switch (activeCategory) {
      case 'schools':
        return schoolCourses.map(c => ({ ...c, type: 'school' }));
      case 'universities':
        return universityCourses.map(c => ({ ...c, type: 'university' }));
      case 'anchor':
        return anchorCourses.map(c => ({ ...c, type: 'anchor' }));
      case 'workshops':
        return workshopCourses.map(c => ({ ...c, type: 'workshop' }));
      default:
        return [];
    }
  };

  const courses = getCourses();

  return (
    <section id="courses" className="relative py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
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

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[65vh] overflow-y-auto pr-2">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="group relative glass-card rounded-xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 text-left"
            >
              {/* Content */}
              <div className="p-5 space-y-3">
                <div>
                  <p className="text-xs text-secondary font-medium mb-1">{course.subtitle}</p>
                  <h3 className="text-sm font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {'level' in course && (
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      {course.level}
                    </span>
                  )}
                  {'location' in course && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[100px]">{course.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Fee */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">{course.fee}</span>
                  <span className="inline-flex items-center gap-1 text-primary font-medium text-xs group-hover:gap-2 transition-all">
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
  );
};

export default CoursesSlide;
