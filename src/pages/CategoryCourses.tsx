import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import { schoolCourses } from '@/data/schoolCourses';
import { universityCourses } from '@/data/universityCourses';
import { anchorCourses } from '@/data/anchorCourses';
import { workshopCourses } from '@/data/workshopCourses';

const categoryInfo: Record<string, { title: string; subtitle: string; description: string }> = {
  'anchor-courses': {
    title: 'Anchor Courses',
    subtitle: 'Professional Certifications',
    description: 'Deep-dive professional courses with hands-on immersion experiences across India.',
  },
  workshops: {
    title: 'Workshops',
    subtitle: 'Immersive Experiences',
    description: 'Short-term immersive programs combining theory with real-world field experiences.',
  },
  universities: {
    title: 'Universities',
    subtitle: 'Higher Education Programs',
    description: 'Specialized courses designed for university students and faculty development.',
  },
  schools: {
    title: 'Schools',
    subtitle: 'K-12 Education',
    description: 'Experiential learning programs designed for school students and educators.',
  },
};

const CategoryCourses = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const getCourses = () => {
    switch (category) {
      case 'anchor-courses':
        return anchorCourses;
      case 'workshops':
        return workshopCourses;
      case 'universities':
        return universityCourses;
      case 'schools':
        return schoolCourses;
      default:
        return [];
    }
  };

  const courses = getCourses();
  const info = categoryInfo[category || ''] || categoryInfo.schools;

  return (
    <div className="relative min-h-screen">
      <HeroBackground />
      <Header onNavigate={() => navigate('/')} />

      <main className="relative z-10 pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary/30 mb-4">
              <span className="text-sm font-medium text-secondary">{info.subtitle}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
              <span className="gradient-text">{info.title}</span>
            </h1>
            <p className="text-base text-muted-foreground">{info.description}</p>
          </div>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="group relative glass-card rounded-xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <div className="p-5 space-y-3">
                  <div>
                    <p className="text-xs text-secondary font-medium mb-1">{course.subtitle}</p>
                    <h3 className="text-sm font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {'level' in course && (
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {(course as any).level}
                      </span>
                    )}
                    {'location' in course && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[100px]">{(course as any).location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

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
      </main>

      <Footer />
    </div>
  );
};

export default CategoryCourses;
