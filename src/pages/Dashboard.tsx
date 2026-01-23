import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  Clock, 
  LogOut, 
  ChevronRight,
  Play,
  CheckCircle2,
  Loader2,
  User,
  Shield
} from 'lucide-react';
import HeroBackground from '@/components/HeroBackground';

interface Enrollment {
  id: string;
  course_id: string;
  status: string;
  package_type: string;
  enrolled_at: string;
  course: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail_url: string;
    duration_weeks: number;
    category: string;
  };
}

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profileData) {
          setProfile(profileData);
        }

        // Check if user is admin
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        setIsAdmin(!!roleData);

        // Fetch enrollments with course details
        const { data: enrollmentsData } = await supabase
          .from('enrollments')
          .select(`
            id,
            course_id,
            status,
            package_type,
            enrolled_at,
            course:courses (
              id,
              title,
              slug,
              description,
              thumbnail_url,
              duration_weeks,
              category
            )
          `)
          .eq('user_id', user.id)
          .order('enrolled_at', { ascending: false });

        if (enrollmentsData) {
          // Type assertion to handle the nested course object
          const typedEnrollments = enrollmentsData.map((e: any) => ({
            ...e,
            course: Array.isArray(e.course) ? e.course[0] : e.course
          })) as Enrollment[];
          setEnrollments(typedEnrollments.filter(e => e.course));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const activeEnrollments = enrollments.filter(e => e.status === 'active');
  const completedEnrollments = enrollments.filter(e => e.status === 'completed');

  return (
    <div className="min-h-screen relative">
      <HeroBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">HexFlow Learn</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {profile?.full_name || user?.email}
                </span>
              </div>
              {isAdmin && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Learner'}! 👋
            </h1>
            <p className="text-muted-foreground">
              Continue your learning journey where you left off.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeEnrollments.length}</p>
                    <p className="text-sm text-muted-foreground">Active Courses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedEnrollments.length}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0h</p>
                    <p className="text-sm text-muted-foreground">Time Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Certificates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Continue Learning */}
          {activeEnrollments.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Continue Learning</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/my-courses">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeEnrollments.slice(0, 3).map((enrollment) => (
                  <Link 
                    key={enrollment.id} 
                    to={`/my-course/${enrollment.course.slug}`}
                    className="block"
                  >
                    <Card className="glass-card border-0 overflow-hidden group hover:shadow-xl transition-shadow h-full">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                        {enrollment.course.thumbnail_url ? (
                          <img 
                            src={enrollment.course.thumbnail_url} 
                            alt={enrollment.course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-primary/40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="sm" className="gap-2">
                            <Play className="h-4 w-4" /> View Course
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {enrollment.course.category || 'Course'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {enrollment.package_type === 'immersion' ? 'Immersion' : 'Online'}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg line-clamp-1">
                          {enrollment.course.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {enrollment.course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">0%</span>
                          </div>
                          <Progress value={0} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {enrollments.length === 0 && (
            <Card className="glass-card border-0 p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Courses Yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't enrolled in any courses yet. Browse our catalog to find the perfect course for your learning journey.
              </p>
              <Button asChild className="bg-gradient-to-r from-primary to-secondary">
                <Link to="/#courses">
                  Browse Courses <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          )}

          {/* Browse More Courses CTA */}
          {enrollments.length > 0 && (
            <Card className="glass-card border-0 p-8 mt-8 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">Ready for More?</h3>
                  <p className="text-muted-foreground">
                    Explore our full catalog and discover new learning opportunities.
                  </p>
                </div>
                <Button asChild className="bg-gradient-to-r from-primary to-secondary shrink-0">
                  <Link to="/#courses">
                    Browse All Courses <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
