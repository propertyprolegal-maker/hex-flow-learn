import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format, differenceInDays, differenceInHours, parse, isValid, isBefore } from 'date-fns';
import { 
  Lock, 
  Unlock, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  GraduationCap,
  Trophy,
  Bell,
  Loader2,
  Play,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import HeroBackground from '@/components/HeroBackground';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

// Import all course data
import { schoolCourses } from '@/data/schoolCourses';
import { universityCourses } from '@/data/universityCourses';
import { anchorCourses } from '@/data/anchorCourses';
import { workshopCourses } from '@/data/workshopCourses';

interface EnrollmentData {
  id: string;
  course_id: string;
  status: string;
  package_type: string;
  enrolled_at: string;
  payment_status: string;
  course: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    duration_weeks: number;
  };
}

// Get all courses combined
const getAllCourses = () => [
  ...schoolCourses.map(c => ({ ...c, type: 'school' as const })),
  ...universityCourses.map(c => ({ ...c, type: 'university' as const })),
  ...anchorCourses.map(c => ({ ...c, type: 'anchor' as const })),
  ...workshopCourses.map(c => ({ ...c, type: 'workshop' as const })),
];

// Parse date string like "April 7, 2026" or "Open Enrollment"
const parseStartDate = (dateStr: string): Date | null => {
  if (!dateStr || dateStr.toLowerCase().includes('open')) {
    return null; // Open enrollment = no lock
  }
  
  // Try parsing "Month Day, Year" format
  try {
    const parsed = parse(dateStr, 'MMMM d, yyyy', new Date());
    if (isValid(parsed)) return parsed;
  } catch {}
  
  // Try parsing "Month Day, Year" with different patterns
  try {
    const parsed = parse(dateStr, 'MMMM dd, yyyy', new Date());
    if (isValid(parsed)) return parsed;
  } catch {}
  
  return null;
};

const MyCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [enrollment, setEnrollment] = useState<EnrollmentData | null>(null);
  const [loading, setLoading] = useState(true);

  const allCourses = getAllCourses();
  const staticCourse = allCourses.find(c => c.id === courseId);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Fetch enrollment data
  useEffect(() => {
    const fetchEnrollment = async () => {
      if (!user || !courseId) return;

      try {
        // First get the course by slug
        const { data: course } = await supabase
          .from('courses')
          .select('id')
          .eq('slug', courseId)
          .maybeSingle();

        if (!course) {
          setLoading(false);
          return;
        }

        // Then get enrollment
        const { data: enrollmentData } = await supabase
          .from('enrollments')
          .select(`
            id,
            course_id,
            status,
            package_type,
            enrolled_at,
            payment_status,
            course:courses (
              id,
              title,
              slug,
              description,
              category,
              duration_weeks
            )
          `)
          .eq('user_id', user.id)
          .eq('course_id', course.id)
          .maybeSingle();

        if (enrollmentData) {
          setEnrollment({
            ...enrollmentData,
            course: Array.isArray(enrollmentData.course) 
              ? enrollmentData.course[0] 
              : enrollmentData.course
          } as EnrollmentData);
        }
      } catch (error) {
        console.error('Error fetching enrollment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEnrollment();
    }
  }, [user, courseId]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!staticCourse) {
    return (
      <div className="min-h-screen relative">
        <HeroBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Course Not Found</h1>
            <Button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen relative">
        <HeroBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Card className="glass-card border-0 p-8 text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">Not Enrolled</h2>
            <p className="text-muted-foreground mb-6">
              You haven't enrolled in this course yet.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button onClick={() => navigate(`/course/${courseId}`)}>
                View Course
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Get start date from static course data
  const startDateStr = 'startDate' in staticCourse ? staticCourse.startDate : '';
  const startDate = parseStartDate(startDateStr);
  const now = new Date();
  const isLocked = startDate ? isBefore(now, startDate) : false;
  const isOpenEnrollment = !startDate;

  // Calculate countdown
  const daysRemaining = startDate ? differenceInDays(startDate, now) : 0;
  const hoursRemaining = startDate ? differenceInHours(startDate, now) % 24 : 0;

  // Get course modules for syllabus preview
  const getModules = () => {
    if (staticCourse.type === 'school' || staticCourse.type === 'university') {
      return (staticCourse as typeof schoolCourses[0]).modules;
    }
    if (staticCourse.type === 'anchor') {
      return (staticCourse as typeof anchorCourses[0]).modules;
    }
    return null;
  };

  const modules = getModules();

  return (
    <div className="min-h-screen relative">
      <HeroBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user?.email}</span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary">{enrollment.course.category}</Badge>
              <Badge variant="outline">
                {enrollment.package_type === 'immersion' ? 'Online + Immersion' : 'Online Only'}
              </Badge>
              <Badge 
                variant={enrollment.status === 'active' ? 'default' : 'secondary'}
                className="bg-green-500/10 text-green-600 border-green-500/20"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Enrolled
              </Badge>
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              {enrollment.course.title}
            </h1>
            <p className="text-muted-foreground">
              {enrollment.course.description}
            </p>
          </div>

          {/* Lock Status Card */}
          <Card className={`mb-8 overflow-hidden ${isLocked ? 'border-amber-500/30 bg-amber-500/5' : 'border-green-500/30 bg-green-500/5'}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  isLocked ? 'bg-amber-500/20' : 'bg-green-500/20'
                }`}>
                  {isLocked ? (
                    <Lock className="w-8 h-8 text-amber-500" />
                  ) : (
                    <Unlock className="w-8 h-8 text-green-500" />
                  )}
                </div>
                
                <div className="flex-1">
                  {isLocked ? (
                    <>
                      <h2 className="text-xl font-semibold text-foreground mb-1">
                        Course Content Locked
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        Content will be available from <span className="font-semibold text-foreground">{startDateStr}</span>
                      </p>
                      
                      {/* Countdown */}
                      <div className="flex items-center gap-4">
                        <div className="text-center px-4 py-2 rounded-lg bg-background/80">
                          <div className="text-2xl font-bold text-primary">{daysRemaining}</div>
                          <div className="text-xs text-muted-foreground">Days</div>
                        </div>
                        <div className="text-center px-4 py-2 rounded-lg bg-background/80">
                          <div className="text-2xl font-bold text-primary">{hoursRemaining}</div>
                          <div className="text-xs text-muted-foreground">Hours</div>
                        </div>
                        <div className="text-muted-foreground">until course begins</div>
                      </div>
                    </>
                  ) : isOpenEnrollment ? (
                    <>
                      <h2 className="text-xl font-semibold text-foreground mb-1">
                        Course Content Available
                      </h2>
                      <p className="text-muted-foreground">
                        This course is available immediately. Start learning at your own pace!
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold text-foreground mb-1">
                        Course Content Available
                      </h2>
                      <p className="text-muted-foreground">
                        The course has started! Begin your learning journey now.
                      </p>
                    </>
                  )}
                </div>

                {isLocked && (
                  <Button variant="outline" className="flex-shrink-0">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Syllabus */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Course Curriculum
                  </CardTitle>
                  <CardDescription>
                    {isLocked ? 'Preview the course structure. Full content unlocks on the start date.' : 'Your learning journey'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {modules ? (
                    <div className="space-y-4">
                      {modules.map((module, index) => (
                        <div 
                          key={index}
                          className={`p-4 rounded-lg border transition-colors ${
                            isLocked 
                              ? 'bg-muted/30 border-border/30 opacity-70' 
                              : 'bg-background border-border hover:border-primary/30'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isLocked ? 'bg-muted' : 'bg-primary/20'
                            }`}>
                              {isLocked ? (
                                <Lock className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <span className="text-sm font-bold text-primary">
                                  {'week' in module ? module.week : index + 1}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-semibold ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                                  {module.title}
                                </h3>
                                {'hours' in module && (
                                  <Badge variant="outline" className="text-xs">
                                    {module.hours}h
                                  </Badge>
                                )}
                              </div>
                              <ul className="space-y-1">
                                {'topics' in module && module.topics.map((topic: string, i: number) => (
                                  <li key={i} className={`text-sm flex items-center gap-2 ${
                                    isLocked ? 'text-muted-foreground/60' : 'text-muted-foreground'
                                  }`}>
                                    {isLocked ? (
                                      <Lock className="w-3 h-3 flex-shrink-0" />
                                    ) : (
                                      <Play className="w-3 h-3 flex-shrink-0 text-primary" />
                                    )}
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : staticCourse.type === 'workshop' ? (
                    <div className="space-y-3">
                      {(staticCourse as typeof workshopCourses[0]).highlights.map((highlight, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg flex items-center gap-3 ${
                            isLocked ? 'bg-muted/30 opacity-70' : 'bg-background border border-border'
                          }`}
                        >
                          {isLocked ? (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                          <span className={isLocked ? 'text-muted-foreground' : 'text-foreground'}>
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enrollment Details */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Enrollment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Enrolled On</p>
                      <p className="font-medium">
                        {format(new Date(enrollment.enrolled_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Course Starts</p>
                      <p className="font-medium">
                        {isOpenEnrollment ? 'Available Now' : startDateStr}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Package</p>
                      <p className="font-medium">
                        {enrollment.package_type === 'immersion' ? 'Online + Field Immersion' : 'Online Only'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Trophy className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium capitalize">{enrollment.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Card */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {isLocked 
                        ? 'Progress tracking will begin when the course starts.' 
                        : 'Start your first lesson to begin tracking progress.'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Button */}
              {!isLocked && (
                <Button className="w-full" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyCourse;
