import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface EnrollmentWithDetails {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at: string | null;
  status: string;
  payment_status: string;
  package_type: string | null;
  amount_paid: number | null;
  profile: {
    full_name: string | null;
  } | null;
  course: {
    title: string;
    category: string | null;
  } | null;
}

export interface CourseStats {
  course_id: string;
  course_title: string;
  category: string | null;
  price: number;
  total_enrollments: number;
  active_enrollments: number;
  completed_enrollments: number;
  paid_enrollments: number;
  total_revenue: number;
}

export interface DashboardStats {
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  totalRevenue: number;
  totalCourses: number;
}

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<EnrollmentWithDetails[]>([]);
  const [courseStats, setCourseStats] = useState<CourseStats[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalEnrollments: 0,
    activeEnrollments: 0,
    completedEnrollments: 0,
    totalRevenue: 0,
    totalCourses: 0,
  });

  // Check if user is admin
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        setIsAdmin(!!data && !error);
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminRole();
  }, [user]);

  // Fetch enrollments
  const fetchEnrollments = async () => {
    if (!isAdmin) return;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          user_id,
          course_id,
          enrolled_at,
          completed_at,
          status,
          payment_status,
          package_type,
          amount_paid,
          profiles:user_id (full_name),
          courses:course_id (title, category)
        `)
        .order('enrolled_at', { ascending: false });

      if (error) throw error;

      const formattedData = (data || []).map((item: any) => ({
        ...item,
        profile: item.profiles,
        course: item.courses,
      }));

      setEnrollments(formattedData);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  // Fetch course stats
  const fetchCourseStats = async () => {
    if (!isAdmin) return;

    try {
      const { data, error } = await supabase
        .from('enrollment_stats')
        .select('*');

      if (error) throw error;

      setCourseStats((data || []) as CourseStats[]);

      // Calculate dashboard stats
      const stats = (data || []).reduce(
        (acc, course: any) => ({
          totalEnrollments: acc.totalEnrollments + (course.total_enrollments || 0),
          activeEnrollments: acc.activeEnrollments + (course.active_enrollments || 0),
          completedEnrollments: acc.completedEnrollments + (course.completed_enrollments || 0),
          totalRevenue: acc.totalRevenue + (course.total_revenue || 0),
          totalCourses: acc.totalCourses + 1,
        }),
        {
          totalEnrollments: 0,
          activeEnrollments: 0,
          completedEnrollments: 0,
          totalRevenue: 0,
          totalCourses: 0,
        }
      );

      setDashboardStats(stats);
    } catch (error) {
      console.error('Error fetching course stats:', error);
    }
  };

  // Update enrollment status
  const updateEnrollmentStatus = async (
    enrollmentId: string,
    status: string,
    paymentStatus?: string
  ) => {
    try {
      const updateData: any = { status };
      if (paymentStatus) {
        updateData.payment_status = paymentStatus;
      }
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('enrollments')
        .update(updateData)
        .eq('id', enrollmentId);

      if (error) throw error;

      await fetchEnrollments();
      return { success: true };
    } catch (error: any) {
      console.error('Error updating enrollment:', error);
      return { success: false, error: error.message };
    }
  };

  // Refresh all data
  const refreshData = async () => {
    await Promise.all([fetchEnrollments(), fetchCourseStats()]);
  };

  // Load data when admin status is confirmed
  useEffect(() => {
    if (isAdmin) {
      refreshData();
    }
  }, [isAdmin]);

  return {
    isAdmin,
    isLoading,
    enrollments,
    courseStats,
    dashboardStats,
    fetchEnrollments,
    fetchCourseStats,
    updateEnrollmentStatus,
    refreshData,
  };
};
