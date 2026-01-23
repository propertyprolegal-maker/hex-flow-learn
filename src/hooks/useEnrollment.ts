import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface EnrollmentResult {
  success: boolean;
  error?: string;
}

export const useEnrollment = (courseSlug: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Check if user is already enrolled
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || !courseSlug) {
        setIsLoading(false);
        return;
      }

      try {
        // First find the course by slug
        const { data: course } = await supabase
          .from('courses')
          .select('id')
          .eq('slug', courseSlug)
          .maybeSingle();

        if (!course) {
          setIsLoading(false);
          return;
        }

        // Check enrollment
        const { data: enrollment } = await supabase
          .from('enrollments')
          .select('id, status')
          .eq('user_id', user.id)
          .eq('course_id', course.id)
          .maybeSingle();

        setIsEnrolled(!!enrollment && enrollment.status === 'active');
      } catch (error) {
        console.error('Error checking enrollment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkEnrollment();
  }, [user, courseSlug]);

  // Parse fee string to numeric value
  const parseFee = (feeString: string): number => {
    // Remove currency symbols and commas, e.g., "₹75,000" -> 75000
    const cleanedFee = feeString.replace(/[₹,\s]/g, '');
    const numericFee = parseFloat(cleanedFee);
    return isNaN(numericFee) ? 0 : numericFee;
  };

  // Enroll user in a course
  const enrollInCourse = async (
    courseId: string,
    packageType: 'online' | 'immersion' = 'online',
    fee: string
  ): Promise<EnrollmentResult> => {
    if (!user) {
      return { success: false, error: 'You must be logged in to enroll' };
    }

    setIsEnrolling(true);

    try {
      const amountPaid = parseFee(fee);

      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          package_type: packageType,
          status: 'active', // For now, immediately active. Change to 'pending' when payments are added
          payment_status: amountPaid === 0 ? 'completed' : 'pending',
          amount_paid: amountPaid,
        });

      if (error) {
        // Handle duplicate enrollment
        if (error.code === '23505') {
          return { success: false, error: 'You are already enrolled in this course' };
        }
        throw error;
      }

      setIsEnrolled(true);
      toast({
        title: 'Successfully enrolled!',
        description: 'Welcome to the course. You can now access your learning materials.',
      });

      return { success: true };
    } catch (error: any) {
      console.error('Enrollment error:', error);
      return { success: false, error: error.message || 'Failed to enroll' };
    } finally {
      setIsEnrolling(false);
    }
  };

  return {
    isEnrolled,
    isLoading,
    isEnrolling,
    enrollInCourse,
  };
};
