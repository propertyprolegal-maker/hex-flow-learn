import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, BookOpen, Calendar, CheckCircle, ArrowRight, ArrowLeft, GraduationCap, Target, Award, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroBackground from '@/components/HeroBackground';
import FloatingShapes from '@/components/FloatingShapes';
import { EnrollmentModal } from '@/components/EnrollmentModal';
import { useEnrollment } from '@/hooks/useEnrollment';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

// Import all course data
import { schoolCourses, iconMap as schoolIconMap } from '@/data/schoolCourses';
import { universityCourses, iconMap as universityIconMap } from '@/data/universityCourses';
import { anchorCourses, iconMap as anchorIconMap } from '@/data/anchorCourses';
import { workshopCourses, iconMap as workshopIconMap } from '@/data/workshopCourses';

// Combine all courses for lookup
const getAllCourses = () => {
  return [
    ...schoolCourses.map(c => ({ ...c, type: 'school' as const })),
    ...universityCourses.map(c => ({ ...c, type: 'university' as const })),
    ...anchorCourses.map(c => ({ ...c, type: 'anchor' as const })),
    ...workshopCourses.map(c => ({ ...c, type: 'workshop' as const })),
  ];
};

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dbCourseId, setDbCourseId] = useState<string | null>(null);

  const allCourses = getAllCourses();
  const course = allCourses.find(c => c.id === courseId);

  const { isEnrolled, isLoading: enrollmentLoading, isEnrolling, enrollInCourse } = useEnrollment(courseId || '');

  // Fetch course from database (courses are pre-seeded)
  useEffect(() => {
    const fetchCourseFromDb = async () => {
      if (!course) return;

      const { data: existingCourse } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', course.id)
        .maybeSingle();

      if (existingCourse) {
        setDbCourseId(existingCourse.id);
      }
    };

    fetchCourseFromDb();
  }, [course]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!course) {
    return (
      <div className="relative min-h-screen">
        <HeroBackground />
        <FloatingShapes />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Course Not Found</h1>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get icon component based on course type
  const getIconComponent = () => {
    const iconKey = course.icon;
    switch (course.type) {
      case 'school':
        return schoolIconMap[iconKey as keyof typeof schoolIconMap];
      case 'university':
        return universityIconMap[iconKey as keyof typeof universityIconMap];
      case 'anchor':
        return anchorIconMap[iconKey as keyof typeof anchorIconMap];
      case 'workshop':
        return workshopIconMap[iconKey as keyof typeof workshopIconMap];
      default:
        return BookOpen;
    }
  };

  const IconComponent = getIconComponent();

  // Handle enrollment click
  const handleEnrollClick = () => {
    if (!user) {
      // Redirect to auth with return URL
      navigate(`/auth?redirect=/course/${courseId}`);
      return;
    }

    if (isEnrolled) {
      // Already enrolled, go to dashboard
      navigate('/dashboard');
      return;
    }

    // Open enrollment modal
    setIsModalOpen(true);
  };

  // Handle enrollment
  const handleEnroll = async (packageType: 'online' | 'immersion', fee: string) => {
    if (!dbCourseId) {
      return { success: false, error: 'Course not found in database' };
    }
    return enrollInCourse(dbCourseId, packageType, fee);
  };

  // Render modules based on course type
  const renderModules = () => {
    if (course.type === 'school' || course.type === 'university') {
      const typedCourse = course as typeof schoolCourses[0] | typeof universityCourses[0];
      return typedCourse.modules.map((module, index) => (
        <div 
          key={index}
          className="p-6 rounded-xl glass-card border border-border/30 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">{module.week}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-3">{module.title}</h3>
              <ul className="space-y-2">
                {module.topics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ));
    }

    if (course.type === 'anchor') {
      const typedCourse = course as typeof anchorCourses[0];
      return typedCourse.modules.map((module, index) => (
        <div 
          key={index}
          className="p-6 rounded-xl glass-card border border-border/30 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">{index + 1}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-secondary font-medium px-2 py-1 rounded bg-secondary/10">{module.hours} Hours</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{module.title}</h3>
              <ul className="space-y-2">
                {module.topics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ));
    }

    if (course.type === 'workshop') {
      const typedCourse = course as typeof workshopCourses[0];
      return typedCourse.highlights.map((highlight, index) => (
        <div 
          key={index}
          className="p-4 rounded-lg glass-card border border-border/30 hover:border-primary/30 transition-colors flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-foreground">{highlight}</span>
        </div>
      ));
    }

    return null;
  };

  // Render outcomes
  const renderOutcomes = () => {
    if (course.type === 'school' || course.type === 'university' || course.type === 'anchor') {
      const typedCourse = course as typeof schoolCourses[0] | typeof universityCourses[0] | typeof anchorCourses[0];
      return (
        <div className="p-6 rounded-xl glass-card border border-border/30">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Learning Outcomes</h3>
          </div>
          <ul className="space-y-3">
            {typedCourse.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <Award className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  // Get course-specific details
  const getCourseDetails = () => {
    switch (course.type) {
      case 'school': {
        const c = course as typeof schoolCourses[0];
        return {
          duration: c.duration,
          hours: `${c.hours} Hours`,
          fee: c.fee,
          startDate: c.startDate,
          level: c.level,
          audience: `${c.idealAge} | ${c.classStandard}`,
          description: c.description,
          coreShift: c.coreShift,
        };
      }
      case 'university': {
        const c = course as typeof universityCourses[0];
        return {
          duration: c.duration,
          hours: `${c.hours} Hours`,
          fee: c.fee,
          startDate: c.startDate,
          level: c.level,
          audience: c.audience,
          description: c.description,
          disciplineLens: c.disciplineLens,
        };
      }
      case 'anchor': {
        const c = course as typeof anchorCourses[0];
        return {
          duration: c.duration,
          hours: `${c.hours} Hours`,
          fee: c.fee,
          startDate: c.startDate,
          level: c.level,
          audience: c.target,
          description: c.description,
          eligibility: c.eligibility,
          track: c.track,
          mentoring: c.mentoring,
        };
      }
      case 'workshop': {
        const c = course as typeof workshopCourses[0];
        return {
          duration: c.duration,
          hours: undefined,
          fee: c.fee,
          startDate: c.startDate,
          level: undefined,
          audience: undefined,
          description: c.description,
          location: c.location,
        };
      }
      default:
        return {};
    }
  };

  const details = getCourseDetails();

  return (
    <div className="relative min-h-screen">
      <HeroBackground />
      <FloatingShapes />
      
      <div className="relative z-10">
        {/* Back button */}
        <div className="container mx-auto max-w-6xl px-4 pt-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto max-w-6xl px-4 pb-8">
          <div className="p-8 rounded-2xl glass-card border border-border/30 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                {IconComponent && <IconComponent className="w-7 h-7 text-primary" />}
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-2">
                  {course.subtitle}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  {course.title}
                </h1>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
              {details.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mb-6">
              {details.duration && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{details.duration}</span>
                </div>
              )}
              {details.hours && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                  <BookOpen className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-foreground">{details.hours}</span>
                </div>
              )}
              {details.level && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground">{details.level}</span>
                </div>
              )}
              {details.startDate && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{details.startDate}</span>
                </div>
              )}
              {(details as any).location && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-foreground">{(details as any).location}</span>
                </div>
              )}
            </div>

            {/* Audience / Target */}
            {details.audience && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Users className="w-4 h-4" />
                <span>For: {details.audience}</span>
              </div>
            )}

            {/* Core Shift (for school courses) */}
            {(details as any).coreShift && (
              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 mb-6">
                <p className="text-sm font-medium text-secondary">Core Shift:</p>
                <p className="text-foreground">{(details as any).coreShift}</p>
              </div>
            )}

            {/* Eligibility (for anchor courses) */}
            {(details as any).eligibility && (
              <div className="p-4 rounded-lg bg-muted/50 border border-border/30 mb-6">
                <p className="text-sm font-medium text-foreground mb-1">Eligibility:</p>
                <p className="text-muted-foreground">{(details as any).eligibility}</p>
              </div>
            )}

            {/* Discipline Lens (for university courses) */}
            {(details as any).disciplineLens && (
              <div className="p-4 rounded-lg bg-muted/50 border border-border/30 mb-6">
                <p className="text-sm font-medium text-foreground mb-2">Discipline Focus:</p>
                <ul className="space-y-1">
                  {(details as any).disciplineLens.map((lens: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {lens}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto max-w-6xl px-4 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Curriculum */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                {course.type === 'workshop' ? 'Program Highlights' : 'Course Curriculum'}
              </h2>
              <div className="space-y-4">
                {renderModules()}
              </div>
              
              {/* Outcomes */}
              <div className="mt-8">
                {renderOutcomes()}
              </div>

              {/* Mentoring (for anchor courses) */}
              {(details as any).mentoring && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 mt-6">
                  <p className="text-sm font-medium text-primary">Live Mentoring Included:</p>
                  <p className="text-foreground">{(details as any).mentoring}</p>
                </div>
              )}
            </div>

            {/* Pricing Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl glass-card border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/5 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Registration</p>
                </div>

                {/* Fee */}
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground mb-1">Course Fee</p>
                  <div className="text-3xl font-bold text-foreground">
                    {details.fee}
                  </div>
                </div>

                {/* Start Date */}
                {details.startDate && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Starts: {details.startDate}</span>
                  </div>
                )}

                {/* Track (for anchor courses) */}
                {(details as any).track && (
                  <div className="p-3 rounded-lg bg-muted/50 mb-4">
                    <p className="text-xs text-muted-foreground">Track</p>
                    <p className="text-sm font-medium text-foreground">{(details as any).track}</p>
                  </div>
                )}

                {/* Enroll Button */}
                <Button 
                  className="w-full" 
                  size="lg"
                  variant="glow"
                  onClick={handleEnrollClick}
                  disabled={enrollmentLoading || authLoading}
                >
                  {enrollmentLoading || authLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : isEnrolled ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Continue Learning
                    </>
                  ) : (
                    <>
                      Enroll Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {isEnrolled && (
                  <p className="text-xs text-primary text-center mt-3">
                    You are enrolled in this course
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="p-6 rounded-xl glass-card border border-border/30">
                <h3 className="text-lg font-semibold text-foreground mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about this course? Contact our team for more information.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  asChild
                >
                  <a href="https://topmate.io/possibleeducation/1798552" target="_blank" rel="noopener noreferrer">Contact Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Modal */}
        <EnrollmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          course={{
            id: course.id,
            title: course.title,
            subtitle: course.subtitle,
            fee: details.fee || '₹0',
            duration: details.duration || '',
            startDate: details.startDate || '',
            hasImmersion: course.type === 'workshop',
            immersionFee: course.type === 'workshop' ? (course as any).fee : undefined,
          }}
          onEnroll={handleEnroll}
          isEnrolling={isEnrolling}
        />
      </div>
    </div>
  );
};

export default CourseDetail;
