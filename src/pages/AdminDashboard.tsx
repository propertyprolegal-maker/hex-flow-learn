import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  ArrowLeft, 
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  Shield,
  BarChart3,
  ListChecks
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import HeroBackground from '@/components/HeroBackground';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const {
    isAdmin,
    isLoading,
    enrollments,
    courseStats,
    dashboardStats,
    updateEnrollmentStatus,
    refreshData,
  } = useAdmin();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
    toast({
      title: 'Data refreshed',
      description: 'All dashboard data has been updated.',
    });
  };

  const handleStatusChange = async (enrollmentId: string, newStatus: string) => {
    const result = await updateEnrollmentStatus(enrollmentId, newStatus);
    if (result.success) {
      toast({
        title: 'Status updated',
        description: `Enrollment status changed to ${newStatus}.`,
      });
    } else {
      toast({
        title: 'Update failed',
        description: result.error || 'Could not update enrollment status.',
        variant: 'destructive',
      });
    }
  };

  const handlePaymentStatusChange = async (enrollmentId: string, paymentStatus: string) => {
    const enrollment = enrollments.find(e => e.id === enrollmentId);
    const result = await updateEnrollmentStatus(
      enrollmentId, 
      enrollment?.status || 'active',
      paymentStatus
    );
    if (result.success) {
      toast({
        title: 'Payment status updated',
        description: `Payment status changed to ${paymentStatus}.`,
      });
    } else {
      toast({
        title: 'Update failed',
        description: result.error || 'Could not update payment status.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <HeroBackground />
        <Card className="relative z-10 max-w-md glass-card">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access the admin dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate('/auth')}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <HeroBackground />
        <Card className="relative z-10 max-w-md glass-card">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-destructive mx-auto mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access the admin dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <HeroBackground />
      
      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage enrollments, courses, and view analytics</p>
          </div>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Enrollments</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{dashboardStats.totalEnrollments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {dashboardStats.activeEnrollments} active
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{dashboardStats.totalCourses}</div>
              <p className="text-xs text-muted-foreground mt-1">In database</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{dashboardStats.completedEnrollments}</div>
              <p className="text-xs text-muted-foreground mt-1">Courses finished</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{formatCurrency(dashboardStats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground mt-1">From paid enrollments</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList className="glass-card border border-border/30">
            <TabsTrigger value="enrollments" className="gap-2">
              <ListChecks className="w-4 h-4" />
              Enrollments
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Course Analytics
            </TabsTrigger>
          </TabsList>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle>All Enrollments</CardTitle>
                <CardDescription>View and manage student enrollments across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                {enrollments.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No enrollments yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Enrolled</TableHead>
                          <TableHead>Package</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {enrollments.map((enrollment) => (
                          <TableRow key={enrollment.id}>
                            <TableCell className="font-medium">
                              {enrollment.profile?.full_name || 'Unknown'}
                            </TableCell>
                            <TableCell>
                              <div className="max-w-[200px] truncate">
                                {enrollment.course?.title || 'Unknown Course'}
                              </div>
                              {enrollment.course?.category && (
                                <Badge variant="outline" className="text-xs mt-1">
                                  {enrollment.course.category}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{formatDate(enrollment.enrolled_at)}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {enrollment.package_type || 'online'}
                              </Badge>
                            </TableCell>
                            <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                            <TableCell>{getPaymentBadge(enrollment.payment_status)}</TableCell>
                            <TableCell>
                              {enrollment.amount_paid 
                                ? formatCurrency(enrollment.amount_paid) 
                                : '—'}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Select
                                  value={enrollment.status}
                                  onValueChange={(value) => handleStatusChange(enrollment.id, value)}
                                >
                                  <SelectTrigger className="w-[110px] h-8 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Select
                                  value={enrollment.payment_status}
                                  onValueChange={(value) => handlePaymentStatusChange(enrollment.id, value)}
                                >
                                  <SelectTrigger className="w-[100px] h-8 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Paid</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="glass-card border-border/30">
              <CardHeader>
                <CardTitle>Course Analytics</CardTitle>
                <CardDescription>Enrollment statistics and revenue per course</CardDescription>
              </CardHeader>
              <CardContent>
                {courseStats.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No course data available</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="text-center">Total</TableHead>
                          <TableHead className="text-center">Active</TableHead>
                          <TableHead className="text-center">Completed</TableHead>
                          <TableHead className="text-center">Paid</TableHead>
                          <TableHead className="text-right">Revenue</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courseStats.map((course) => (
                          <TableRow key={course.course_id}>
                            <TableCell className="font-medium max-w-[250px] truncate">
                              {course.course_title}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{course.category || 'N/A'}</Badge>
                            </TableCell>
                            <TableCell>{formatCurrency(course.price)}</TableCell>
                            <TableCell className="text-center">
                              <span className="font-semibold">{course.total_enrollments}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-green-400">{course.active_enrollments}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-blue-400">{course.completed_enrollments}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-yellow-400">{course.paid_enrollments}</span>
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {formatCurrency(course.total_revenue)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
